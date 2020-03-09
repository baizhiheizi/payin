# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    field :id, Int, null: false
    field :access_token, String, null: false
    field :avatar, String, null: true
    field :name, String, null: false
    field :mixin_uuid, String, null: false
    field :mixin_id, ID, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
