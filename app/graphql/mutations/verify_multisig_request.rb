# frozen_string_literal: true

module Mutations
  class VerifyMultisigRequest < BaseMutation
    argument :conversation_id, String, required: false
    argument :code_id, String, required: true
    argument :transaction_id, ID, required: true

    field :multisig_request, Types::MultisigRequestType, null: true
    field :multisig_transaction, Types::MultisigTransactionType, null: true

    def resolve(transaction_id:, code_id:)
      transaction = MultisigTransaction.find(transaction_id)
      request = transaction.verify_request(code_id)

      {
        multisig_request: request,
        multisig_transaction: transaction
      }
    end
  end
end
