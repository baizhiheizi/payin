# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_multisig_account, mutation: Mutations::CreateMultisigAccount
    field :create_multisig_payment, mutation: Mutations::CreateMultisigPayment
    field :create_multisig_transaction, mutation: Mutations::CreateMultisigTransaction
    field :create_multisig_request, mutation: Mutations::CreateMultisigRequest
    field :verify_multisig_payment, mutation: Mutations::VerifyMultisigPayment
  end
end
