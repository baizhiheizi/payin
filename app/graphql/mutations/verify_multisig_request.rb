# frozen_string_literal: true

module Mutations
  class VerifyMultisigRequest < BaseMutation
    argument :conversation_id, String, required: false
    argument :code_id, String, required: true
    argument :transaction_id, ID, required: true

    field :state, String, null: true

    def resolve(transaction_id:, code_id:)
      res = MultisigTransaction.find(transaction_id).verify_request(code_id)

      {
        state: res&.[]('state')
      }
    end
  end
end
