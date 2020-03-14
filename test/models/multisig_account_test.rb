# frozen_string_literal: true

# == Schema Information
#
# Table name: multisig_accounts
#
#  id           :uuid             not null, primary key
#  account_hash :string
#  introduction :string
#  member_uuids :uuid             is an Array
#  name         :string
#  threshold    :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  creator_id   :uuid
#
# Indexes
#
#  index_multisig_accounts_on_account_hash  (account_hash)
#  index_multisig_accounts_on_creator_id    (creator_id)
#  index_multisig_accounts_on_member_uuids  (member_uuids)
#
require 'test_helper'

class MultisigAccountTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
