# frozen_string_literal: true

module Types
  class MultisigUtxoType < Types::BaseObject
    field :id, ID, null: false
    field :type, String, null: false
    field :user_id, String, null: false
    field :asset_id, String, null: false
    field :transaction_hash, String, null: false
    field :output_index, Int, null: false
    field :amount, Float, null: false
    field :threshold, Int, null: false
    field :members, [String], null: false
    field :state, String, null: false
    field :memo, String, null: true
    field :signed_by, String, null: true
    field :signed_tx, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false

    field :user, Types::UserType, null: false
    field :asset, Types::AssetType, null: false
  end
end
