# frozen_string_literal: true

require 'test_helper'

class AdminLoginAndLogoutTest < ActionDispatch::IntegrationTest
  test 'admin login flow' do
    result = AdminSchema
             .execute(
               read_admin_mutation('login'),
               variables: {
                 input: {
                   name: 'admin',
                   password: 'admin'
                 }
               },
               context: {
                 session: {}
               }
             )
    assert_not_nil result.context[:session][:current_admin_id]
    assert result['data']['adminLogin']['msg'] == 'success'
  end

  test 'admin logout flow' do
    result = AdminSchema
             .execute(
               read_admin_mutation('logout'),
               variables: { input: {} },
               context: {
                 session: {
                   current_admin_id: 1
                 },
                 current_admin: administrators(:admin)
               }
             )
    assert_nil result.context[:session][:current_admin_id]
    assert result['data']['adminLogout']['msg'] == 'ok'
  end
end
