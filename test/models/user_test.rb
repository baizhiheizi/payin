# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                                                            :bigint           not null, primary key
#  access_token(access token authorized by mixin messenger user) :string
#  avatar                                                        :string
#  mixin_uuid                                                    :string
#  name                                                          :string
#  raw(mixin user raw profile)                                   :json
#  created_at                                                    :datetime         not null
#  updated_at                                                    :datetime         not null
#  mixin_id                                                      :string
#
# Indexes
#
#  index_users_on_mixin_id    (mixin_id) UNIQUE
#  index_users_on_mixin_uuid  (mixin_uuid) UNIQUE
#
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
