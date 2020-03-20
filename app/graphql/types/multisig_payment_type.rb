# frozen_string_literal: true

module Types
  class MultisigPaymentType < Types::BaseObject
    field :id, ID, null: false
    field :amount, Float, null: false
    field :memo, String, null: true
    field :status, String, null: false
    field :receivers, [String], null: false
    field :threshold, Int, null: false
    field :asset_id, String, null: false
    field :code_id, String, null: false
    field :trace_id, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false

    field :asset, Types::AssetType, null: false
    field :creator, Types::UserType, null: false
    field :multisig_account, Types::MultisigAccountType, null: false
  end
end
