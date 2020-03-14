# frozen_string_literal: true

# == Schema Information
#
# Table name: multisig_requests
#
#  id                      :uuid             not null, primary key
#  action                  :string
#  data                    :json
#  state                   :string
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  code_id                 :uuid
#  multisig_transaction_id :uuid
#  request_id              :uuid
#  user_id                 :uuid
#
# Indexes
#
#  index_multisig_requests_on_code_id                  (code_id)
#  index_multisig_requests_on_multisig_transaction_id  (multisig_transaction_id)
#  index_multisig_requests_on_user_id                  (user_id)
#
require 'test_helper'

class MultisigRequestTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
