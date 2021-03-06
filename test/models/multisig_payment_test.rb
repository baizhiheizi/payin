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
#  index_multisig_payments_on_code_id              (code_id) UNIQUE
#  index_multisig_payments_on_creator_id           (creator_id)
#  index_multisig_payments_on_multisig_account_id  (multisig_account_id)
#  index_multisig_payments_on_receivers            (receivers)
#  index_multisig_payments_on_trace_id             (trace_id) UNIQUE
#
require 'test_helper'

class MultisigPaymentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
