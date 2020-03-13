# frozen_string_literal: true

# == Schema Information
#
# Table name: multisig_accounts
#
#  id           :uuid             not null, primary key
#  hash         :string
#  introduction :string
#  member_uuids :uuid             is an Array
#  name         :string
#  threshold    :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  creator_id   :uuid
#
# Indexes
#
#  index_multisig_accounts_on_creator_id    (creator_id)
#  index_multisig_accounts_on_hash          (hash)
#  index_multisig_accounts_on_member_uuids  (member_uuids)
#
class MultisigAccount < ApplicationRecord
  belongs_to :creator, class_name: 'User', foreign_key: :creator_id, inverse_of: false

  has_many :multisig_account_members, dependent: :nullify
  has_many :members, through: :multisig_account_members, source: :user

  before_validation :set_hash

  validates :name, presence: true
  validates :threshold, numericality: { only_integer: true, greater_than: 0 }
  validates :member_uuids, presence: true
  validates :hash, presence: true, uniqueness: true
  validate :threshold_must_not_greater_than_members_size
  validate :members_must_be_valid_array

  def utxos
    records = MixinBot.api.get_all_multisigs access_token: creator.access_token
    records
      .select(&->(utxo) { utxo['members'].sort == member_uuids.sort })
      .map(&->(record) { MultisigUtxo.new(record) })
  end

  def assets
    Asset.where(asset_id: utxos.map(&:asset_id).uniq)
  end

  def balance(asset_id)
    utxos.select(&->(utxo) { utxo.asset_id == asset_id }).map(&:amount).sum
  end

  private

  def threshold_must_not_greater_than_members_size
    errors.add(:threshold, 'Must less or equal to members size') if threshold > members&.length
  end

  def members_must_be_valid_array
    erros.add(:members, 'Members must be an array') unless members.is_a? Array
    erros.add(:members, 'Members size must be greater than 0') if members.length <= 0
  end

  def set_hash
    self.member_uuids = member_uuids.sort
    self.hash = Digest::MD5.hexdigest threshold.to_s + member_uuids.join
  end
end
