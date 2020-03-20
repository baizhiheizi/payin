# frozen_string_literal: true

module Mutations
  class VerifyMultisigPayment < BaseMutation
    argument :conversation_id, String, required: false
    argument :code_id, String, required: true

    field :multisig_payment, Types::MultisigPaymentType, null: true

    def resolve(code_id:)
      payment = MultisigPayment.find_by(code_id: code_id)
      payment&.verify

      {
        multisig_payment: payment
      }
    end
  end
end
