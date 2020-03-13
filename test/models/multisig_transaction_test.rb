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
#  transaction_hash     :string
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
require 'test_helper'

class MultisigTransactionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
