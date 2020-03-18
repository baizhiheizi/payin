# frozen_string_literal: true

# == Schema Information
#
# Table name: multisig_transactions
#
#  id                  :uuid             not null, primary key
#  amount              :decimal(, )
#  memo                :string
#  raw_transaction     :string
#  receiver_uuids      :uuid             is an Array
#  sender_uuids        :uuid             is an Array
#  signer_uuids        :uuid             default("{}"), is an Array
#  status              :string
#  threshold           :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  asset_id            :uuid
#  multisig_account_id :uuid
#  user_id             :uuid
#
# Indexes
#
#  index_multisig_transactions_on_multisig_account_id  (multisig_account_id)
#  index_multisig_transactions_on_receiver_uuids       (receiver_uuids)
#  index_multisig_transactions_on_sender_uuids         (sender_uuids)
#  index_multisig_transactions_on_user_id              (user_id)
#
class MultisigTransaction < ApplicationRecord
  belongs_to :user
  belongs_to :multisig_account
  belongs_to :asset, primary_key: :asset_id, foreign_key: :asset_id, inverse_of: false

  has_many :multisig_requests, dependent: :nullify

  before_validation :set_attributes, on: :create

  validates :amount, presence: true, numericality: { equal_or_greater_than: 1e-8 }
  validates :transaction_hash, presence: true, uniqueness: true
  validates :raw_transaction, presence: true
  validates :receiver_uuids, presence: true
  validates :sender_uuids, presence: true
  validates :threshold, presence: true, numericality: { greater_than: 0 }

  after_create :create_first_request

  def receivers
    @receivers = User.where(mixin_uuid: receiver_uuids)
  end

  def senders
    @senders = User.where(mixin_uuid: sender_uuids)
  end

  def signers
    @signers = User.where(mixin_uuid: signer_uuids)
  end

  def create_first_request
    create_request 'sign', user
  end

  def create_request(action, user)
    case action
    when 'sign'
      res = MixinBot.api.create_sign_multisig_request(
        raw_transaction,
        access_token: user.access_token
      )
    when 'unlock'
      res = MixinBot.api.create_unlock_multisig_request(
        raw_transaction,
        access_token: user.access_token
      )
    else
      raise 'Invalid action'
    end

    multisig_account.recover_signed_transaction if res['error']&.[]('extra')&.[]('reason') == 'UTXO signed by another transaction'

    update(
      transaction_hash: res['data']['transaction_hash'],
      signer_uuids: res['data']['signers']
    )

    res['data']
  end

  private

  def set_attributes
    self.sender_uuids = multisig_account.member_uuids
    self.threshold = multisig_account.threshold
    if raw_transaction.blank?
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
end
