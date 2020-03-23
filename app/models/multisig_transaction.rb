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
#  transaction_hash    :string
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
#  index_multisig_transactions_on_transaction_hash     (transaction_hash)
#  index_multisig_transactions_on_user_id              (user_id)
#
class MultisigTransaction < ApplicationRecord
  include AASM

  belongs_to :user
  belongs_to :multisig_account
  belongs_to :asset, primary_key: :asset_id, foreign_key: :asset_id, inverse_of: false

  before_validation :set_attributes, on: :create

  validates :amount, presence: true, numericality: { equal_or_greater_than: 1e-8 }
  validates :transaction_hash, presence: true, uniqueness: true, unless: -> { new_record? }
  validates :receiver_uuids, presence: true
  validates :sender_uuids, presence: true
  validates :threshold, presence: true, numericality: { greater_than: 0 }

  after_create :create_first_request

  aasm column: :status do
    state :pending, initial: true
    state :signed
    state :unlocked
    state :completed

    event :sign, guard: :ensure_signers_present, after_commit: :check_signers_and_threshold do
      transitions from: :pending, to: :signed
    end

    event :unlock, guard: :ensure_signers_empty do
      transitions from: :signed, to: :unlocked
    end

    event :complete, guard: :ensure_raw_transaction_sent do
      transitions from: :signed, to: :completed
    end
  end

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

  def create_request(action, signer)
    case action
    when 'sign'
      res = MixinBot.api.create_sign_multisig_request(
        build_raw_transaction,
        access_token: signer.access_token
      )
    when 'unlock'
      res = MixinBot.api.create_unlock_multisig_request(
        build_raw_transaction,
        access_token: signer.access_token
      )
    else
      raise 'Invalid action'
    end

    if res['data'].blank?
      Rails.logger.error res['error'].inspect
      return
    end

    update(
      transaction_hash: res['data']['transaction_hash'],
      raw_transaction: res['data']['raw_transaction'],
      signer_uuids: res['data']['signers']
    )

    Rails.logger.info res

    res['data']
  end

  def verify_request(code_id)
    res = MixinBot.api.verify_multisig code_id

    if res['data'].blank?
      Rails.logger.error res['error'].inspect
      return
    end

    Rails.logger.info res.inspect

    update(
      signer_uuids: res['data']&.[]('state') == 'unlocked' ? [] : res['data']['signers'],
      raw_transaction: res['data']['raw_transaction'],
      transaction_hash: res['data']['transaction_hash'],
    )

    case res['data']&.[]('state')
    when 'signed'
      if signed?
        check_signers_and_threshold
      else
        sign!
      end
    when 'unlocked'
      unlock!
    end

    Rails.logger.info res

    res['data']
  end

  def build_raw_transaction
    signed_utxos&.first&.signed_tx ||
      MixinBot.api.build_raw_transaction(
        senders: multisig_account.member_uuids,
        threshold: multisig_account.threshold,
        receivers: receiver_uuids,
        asset_mixin_id: asset.mixin_id,
        asset_id: asset_id,
        amount: amount,
        memo: memo,
        access_token: user.access_token
      )
  end

  def signed_utxos
    multisig_account
      .utxos
      .select(
        &lambda { |utxo|
          utxo.state == 'signed' &&
          utxo.signed_by == transaction_hash
        }
      )
  end

  private

  def set_attributes
    assign_attributes(
      sender_uuids: multisig_account.member_uuids,
      threshold: multisig_account.threshold
    )
  end

  def ensure_signers_empty
    signer_uuids.blank?
  end

  def ensure_signers_present
    signer_uuids.present?
  end

  def check_signers_and_threshold
    complete! if signer_uuids.size >= threshold
  end

  def ensure_raw_transaction_sent
    return unless signer_uuids.size >= threshold

    update! raw_transaction: build_raw_transaction
    r = MixinBot.api.send_raw_transaction raw_transaction, access_token: user.access_token
    raise r['error'].inspect if r['error'].present?

    update! transaction_hash: r['data']['hash']
  end
end
