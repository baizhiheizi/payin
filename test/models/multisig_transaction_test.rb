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
#  signer_uuids        :uuid             default([]), is an Array
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
#  index_multisig_transactions_on_transaction_hash     (transaction_hash) UNIQUE
#  index_multisig_transactions_on_user_id              (user_id)
#
require 'test_helper'

class MultisigTransactionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
