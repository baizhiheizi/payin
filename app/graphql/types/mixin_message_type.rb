# frozen_string_literal: true

module Types
  class MixinMessageType < Types::BaseObject
    field :id, ID, null: false
    field :action, String, null: false
    field :category, String, null: false
    field :content, String, null: false
    field :message_id, String, null: false
    field :conversation_id, String, null: false
    field :processed_at, GraphQL::Types::ISO8601DateTime, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false

    field :user, Types::UserType, null: false
  end
end
