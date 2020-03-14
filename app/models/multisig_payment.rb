# frozen_string_literal: true

# == Schema Information
#
# Table name: multisig_payments
#
#  id                  :uuid             not null, primary key
#  amount              :decimal(, )
#  data                :json
#  memo                :string
#  receivers           :uuid             is an Array
#  status              :string
#  threshold           :integer
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  asset_id            :uuid
#  code_id             :uuid
#  creator_id          :uuid
#  multisig_account_id :uuid
#  trace_id            :uuid
#
# Indexes
#
#  index_multisig_payments_on_creator_id           (creator_id)
#  index_multisig_payments_on_multisig_account_id  (multisig_account_id)
#  index_multisig_payments_on_receivers            (receivers)
#
class MultisigPayment < ApplicationRecord
  belongs_to :creator, class_name: 'User', foreign_key: :creator_id, inverse_of: :created_payments
  belongs_to :multisig_account
  belongs_to :asset, primary_key: :asset_id, foreign_key: :asset_id, inverse_of: false

  before_validation :set_attributes, on: :create

  validates :amount, presence: true, numericality: { equal_or_greater_than: 1e-8 }
  validates :threshold, numericality: { greater_than: 0 }
  validates :asset_id, presence: true
  validates :code_id, presence: true, uniqueness: true
  validates :trace_id, presence: true, uniqueness: true
  validates :data, presence: true

  private

  def set_attributes
    return unless new_record?

    assign_attributes(
      amount: data['amount'],
      asset_id: data['asset_id'],
      code_id: data['code_id'],
      memo: data['memo'],
      receivers: data['receivers'],
      status: data['status'],
      threshold: data['threshold'],
      trace_id: data['trace_id']
    )
  end
end
