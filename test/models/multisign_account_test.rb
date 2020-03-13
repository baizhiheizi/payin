# frozen_string_literal: true

# == Schema Information
#
# Table name: multisign_accounts
#
#  id                              :uuid             not null, primary key
#  introduction                    :string
#  member_uuids(sort before saved) :json
#  name                            :string
#  threshold                       :integer
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#  creator_id                      :uuid
#
# Indexes
#
#  index_multisign_accounts_on_creator_id  (creator_id)
#
require 'test_helper'

class MultisignAccountTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
