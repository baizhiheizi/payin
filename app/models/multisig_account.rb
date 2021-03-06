# frozen_string_literal: true

# == Schema Information
#
# Table name: multisig_accounts
#
#  id           :uuid             not null, primary key
#  account_hash :string
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
#  index_multisig_accounts_on_account_hash  (account_hash) UNIQUE
#  index_multisig_accounts_on_creator_id    (creator_id)
#  index_multisig_accounts_on_member_uuids  (member_uuids)
#
class MultisigAccount < ApplicationRecord
  belongs_to :creator, class_name: 'User', inverse_of: false

  has_many :multisig_account_members, dependent: :nullify
  has_many :members, through: :multisig_account_members, source: :user
  has_many :multisig_payments, dependent: :nullify
  has_many :multisig_transactions, dependent: :nullify

  before_validation :set_hash

  validates :name, presence: true
  validates :threshold, numericality: { only_integer: true, greater_than: 0 }
  validates :member_uuids, presence: true
  validates :account_hash, presence: true, uniqueness: true
  validate :threshold_must_not_greater_than_members_size
  validate :members_must_be_valid_array

  after_create :create_mutisig_account_members!

  def utxos
    MixinBot.api.filter_utxos(
      members: member_uuids,
      threshold: threshold,
      access_token: creator.access_token
    ).map(
      &lambda { |record|
        MultisigUtxo.new(record)
      }
    )
  end

  def signed_utxos
    utxos.filter(&->(utxo) { utxo.state == 'signed' })
  end

  def assets
    Asset.where(asset_id: utxos.map(&:asset_id).uniq)
  end

  def balance(asset_id)
    utxos.select(&->(utxo) { utxo.asset_id == asset_id }).map(&:amount).sum
  end

  def recover_signed_transaction
    signed_utxo = signed_utxos.first
    return if signed_utxo.blank?

    res = MixinBot.api.create_unlock_multisig_request(
      signed_utxo.signed_tx,
      access_token: creator.access_token
    )
    multisig_transactions.create_with!(
      user: User.find_by(mixin_uuid: res['data']['user_id']),
      threshold: res['data']['threshold'],
      amount: res['data']['amount'],
      memo: res['data']['memo'],
      asset_id: res['data']['asset_id'],
      receiver_uuids: res['data']['receivers']
    ).find_or_create_by(
      transaction_hash: signed_utxo.signed_by
    )
  end

  private

  def threshold_must_not_greater_than_members_size
    errors.add(:threshold, 'Must less or equal to members size') if threshold > member_uuids&.length
  end

  def members_must_be_valid_array
    errors.add(:member_uuids, ' must be an array') unless member_uuids.is_a? Array
    errors.add(:member_uuids, ' size must be greater than 0') if member_uuids.length <= 0
  end

  def set_hash
    self.member_uuids = member_uuids.sort
    self.account_hash = Digest::MD5.hexdigest threshold.to_s + member_uuids.join
  end

  def create_mutisig_account_members!
    member_uuids.each do |uuid|
      user = User.find_or_read_from_mixin uuid
      multisig_account_members.create! user: user
    end
  end
end
