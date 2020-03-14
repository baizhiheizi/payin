# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_multisig_account, mutation: Mutations::CreateMultisigAccount
    field :create_multisig_payment, mutation: Mutations::CreateMultisigPayment
  end
end
