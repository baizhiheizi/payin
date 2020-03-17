# frozen_string_literal: true

module Types
  class MultisigRequestType < Types::BaseObject
    field :action, String, null: true
    field :state, String, null: false
    field :request_id, String, null: false
    field :code_id, String, null: false
    field :asset_id, String, null: false
    field :user_id, String, null: false
    field :memo, String, null: true
    field :amount, Float, null: false
    field :threshold, Int, null: false
    field :senders, [String], null: false
    field :receivers, [String], null: false
    field :signers, [String], null: false
    field :transaction_hash, String, null: false
    field :raw_transaction, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
