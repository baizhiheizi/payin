# frozen_string_literal: true

module Mutations
  class VerifyMultisigRequest < BaseMutation
    argument :conversation_id, String, required: false
    argument :code_id, String, required: true

    field :multisig_request, Types::MultisigRequestType, null: true

    def resolve(code_id:)
      r = MixinBot.api.verify_multisig(code_id)
      raise r['error'].inspect if r['error'].present?

      request = r['data']
      transaction = MultisigTransaction.find_by(transaction_hash: request['transaction_hash'])
      transaction&.update(
        transaction_hash: request['transaction_hash'],
        signer_uuids: request['signers']
      )

      {
        multisig_request: request
      }
    end
  end
end
