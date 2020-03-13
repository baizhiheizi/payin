# frozen_string_literal: true

# == Schema Information
#
# Table name: multisig_payments
#
#  id                   :uuid             not null, primary key
#  amount               :decimal(, )
#  memo                 :string
#  receivers            :uuid             is an Array
#  status               :string
#  threshold            :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  asset_id             :uuid
#  code_id              :uuid
#  creator_id           :uuid
#  multisig_accounts_id :uuid
#  trace_id             :uuid
#
# Indexes
#
#  index_multisig_payments_on_creator_id            (creator_id)
#  index_multisig_payments_on_multisig_accounts_id  (multisig_accounts_id)
#  index_multisig_payments_on_receivers             (receivers)
#
class MultisigPayment < ApplicationRecord
  belongs_to :creator, class_name: 'User', foreign_key: :creator_id, inverse_of: :created_payments
  belongs_to :multisig_account
  belongs_to :asset, primary: :asset_id, foreign_key: :asset_id, inverse_of: false

  before_validation :set_attributes, on: :create

  validates :amount, presence: true, numericality: { equal_or_greater_than: 1e-8 }
  validates :threshold, numericality: { greater_than: 0 }
  validates :asset_id, presence: true
  validates :code_id, presence: true, uniqueness: true
  validates :trace_id, presence: true, uniqueness: true
  validates :raw, presence: true

  private

  def set_attributes
    return unless new_record?

    assign_attributes(
      amount: raw['amount'],
      asset_id: raw['asset_id'],
      code_id: raw['code_id'],
      memo: raw['memo'],
      receivers: raw['receivers'],
      status: raw['status'],
      threshold: raw['threshold'],
      trace_id: raw['trace_id']
    )
  end
end
