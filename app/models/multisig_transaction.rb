# frozen_string_literal: true

# == Schema Information
#
# Table name: multisig_transactions
#
#  id                   :uuid             not null, primary key
#  amount               :decimal(, )
#  memo                 :string
#  raw_transaction      :string
#  receivers            :uuid             is an Array
#  senders              :uuid             is an Array
#  signers              :uuid             default("{}"), is an Array
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
#  index_multisig_transactions_on_receivers             (receivers)
#  index_multisig_transactions_on_senders               (senders)
#  index_multisig_transactions_on_users_id              (users_id)
#
class MultisigTransaction < ApplicationRecord
  belongs_to :user
  belongs_to :multisig_account
  belongs_to :asset, primary: :asset_id, foreign_key: :asset_id, inverse_of: false

  has_many :multisig_requests, dependent: :nullify

  before_validation :set_attributes, on: :create

  validates :amount, presence: true, numericality: { equal_or_greater_than: 1e-8 }
  validates :raw_transaction, presence: true
  validates :receivers, presence: true
  validates :senders, presence: true
  validates :threshold, presence: true, numericality: { greater_than: 0 }

  private

  def set_attributes
    self.senders = multisig_account.member_uuids
    self.raw_transaction = MixinBot.api.build_transaction_raw(
      payers: senders,
      receivers: receivers,
      asset_mixin_id: asset.mixin_id,
      asset_id: asset_id,
      amount: amount,
      memo: memo,
      access_token: user.access_token
    )
  end
end
