# frozen_string_literal: true

module Types
  class MultisigTransactionType < Types::BaseObject
    field :id, ID, null: false
    field :amount, Float, null: false
    field :memo, String, null: true
    field :status, String, null: true
    field :raw_transaction, String, null: false
    field :receiver_uuids, [String], null: false
    field :sender_uuids, [String], null: false
    field :signer_uuids, [String], null: false
    field :threshold, Int, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false

    field :user, Types::UserType, null: false
    field :receivers, [Types::UserType], null: false
    field :senders, [Types::UserType], null: false
    field :signers, [Types::UserType], null: false
    field :multisig_account, Types::MultisigAccountType, null: false
  end
end
