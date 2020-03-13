# frozen_string_literal: true

# == Schema Information
#
# Table name: multisig_requests
#
#  id                       :uuid             not null, primary key
#  action                   :string
#  raw                      :json
#  state                    :string
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  code_id                  :uuid
#  multisig_transactions_id :uuid
#  request_id               :uuid
#  users_id                 :uuid
#
# Indexes
#
#  index_multisig_requests_on_code_id                   (code_id)
#  index_multisig_requests_on_multisig_transactions_id  (multisig_transactions_id)
#  index_multisig_requests_on_users_id                  (users_id)
#
require 'test_helper'

class MultisigRequestTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
