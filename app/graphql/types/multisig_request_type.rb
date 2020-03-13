# frozen_string_literal: true

module Types
  class MultisigRequestType < Types::BaseObject
    field :id, ID, null: false
    field :action, String, null: true
    field :state, String, null: false
    field :request_id, String, null: false
    field :code_id, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false

    field :user, Types::UserType, null: false
    field :multisig_transaction, Types::MultisigTransactionType, null: false
  end
end
