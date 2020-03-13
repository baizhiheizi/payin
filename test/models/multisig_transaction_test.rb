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
require 'test_helper'

class MultisigTransactionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
