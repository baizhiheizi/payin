# frozen_string_literal: true

module Types
  class MultisigAccountType < Types::BaseObject
    field :id, ID, null: false
    field :hash, String, null: false
    field :introduction, String, null: true
    field :member_uuids, [String], null: false
    field :name, String, null: false
    field :threshold, Int, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false

    field :creator, Types::UserType, null: false
    field :members, [Types::UserType], null: false
  end
end
