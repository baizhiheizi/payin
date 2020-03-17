# frozen_string_literal: true

module Mutations
  class CreateMultisigRequest < BaseMutation
    argument :conversation_id, String, required: false
    argument :action, String, required: true
    argument :account_id, ID, required: true
    argument :transaction_id, ID, required: true

    field :multisig_request, Types::MultisigRequestType, null: true

    def resolve(params)
      account = current_user.multisig_accounts.find(params[:account_id])
      transaction = account.multisig_transactions.find(params[:transaction_id])

      request = transaction.create_request(params[:action], current_user)

      {
        multisig_request: request
      }
    end
  end
end
