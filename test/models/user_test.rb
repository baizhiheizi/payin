# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id           :uuid             not null, primary key
#  access_token :string
#  avatar       :string
#  data         :json
#  mixin_uuid   :uuid
#  name         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  mixin_id     :string
#
# Indexes
#
#  index_users_on_mixin_id    (mixin_id) UNIQUE
#  index_users_on_mixin_uuid  (mixin_uuid) UNIQUE
#
require 'test_helper'

class UserTest < ActiveSupport::TestCase
  setup do
    @code = '4677732d-129a-480c-9e9e-d930ce1d32f7'
    @mock = MiniTest::Mock.new
    @mock.expect :oauth_token, mixin_bot_mocking_oauth_token, [@code]
    @mock.expect :read_me, mixin_bot_mocking_read_me, [mixin_bot_mocking_oauth_token]
    @mock.expect :read_user, mixin_bot_mocking_read_user, [mixin_bot_mocking_read_user['data']['user_id']]
  end

  test 'auth from mixin' do
    MixinBot.stub(:api, @mock) do
      user = User.auth_from_mixin(@code)
      assert user.mixin_uuid == mixin_bot_mocking_read_me['data']['user_id']
      assert user.access_token == mixin_bot_mocking_oauth_token
    end
  end

  test 'read from mixin' do
    MixinBot.stub(:api, @mock) do
      user = User.read_user_from_mixin(mixin_bot_mocking_read_user['data']['user_id'])
      assert user.mixin_uuid == mixin_bot_mocking_read_user['data']['user_id']
      assert_nil user.access_token
    end
  end
end
