# frozen_string_literal: true

module Types
  class Admin::MutationType < Types::BaseObject
    field :admin_login, mutation: Mutations::Admin::AdminLogin
    field :admin_logout, mutation: Mutations::Admin::AdminLogout
  end
end
