# frozen_string_literal: true

require 'test_helper'

class GraphqlControllerTest < ActionDispatch::IntegrationTest
  test 'should require login' do
    post graphql_url
    assert_redirected_to login_url
  end
end
