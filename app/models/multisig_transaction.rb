# frozen_string_literal: true

# == Schema Information
#
# Table name: multisig_transactions
#
#  id                   :uuid             not null, primary key
#  amount               :decimal(, )
#  memo                 :string
#  raw_transaction      :string
#  receiver_uuids       :uuid             is an Array
#  sender_uuids         :uuid             is an Array
#  signer_uuids         :uuid             default("{}"), is an Array
#  status               :string
#  threshold            :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  asset_id             :uuid
#  multisig_accounts_id :uuid
#  users_id             :uuid
#
# Indexes
#
#  index_multisig_transactions_on_multisig_accounts_id  (multisig_accounts_id)
#  index_multisig_transactions_on_receiver_uuids        (receiver_uuids)
#  index_multisig_transactions_on_sender_uuids          (sender_uuids)
#  index_multisig_transactions_on_users_id              (users_id)
#
class MultisigTransaction < ApplicationRecord
  belongs_to :user
  belongs_to :multisig_account
  belongs_to :asset, primary_key: :asset_id, foreign_key: :asset_id, inverse_of: false

  has_many :multisig_requests, dependent: :nullify

  before_validation :set_attributes, on: :create

  validates :amount, presence: true, numericality: { equal_or_greater_than: 1e-8 }
  validates :raw_transaction, presence: true
  validates :receiver_uuids, presence: true
  validates :sender_uuids, presence: true
  validates :threshold, presence: true, numericality: { greater_than: 0 }

  def receivers
    @receivers = User.where(mixin_uuid: receiver_uuids)
  end

  def senders
    @senders = User.where(mixin_uuid: sender_uuids)
  end

  def signers
    @signers = User.where(mixin_uuid: signer_uuids)
  end

  private

  def set_attributes
    self.senders = multisig_account.member_uuids
    self.raw_transaction = MixinBot.api.build_transaction_raw(
      payers: sender_uuids,
      receivers: receiver_uuids,
      asset_mixin_id: asset.mixin_id,
      asset_id: asset_id,
      amount: amount,
      memo: memo,
      access_token: user.access_token
    )
  end
end
