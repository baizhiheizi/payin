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

      case params[:action]
      when 'sign'
        res = MixinBot.api.create_sign_multisig_request(
          transaction.raw_transaction,
          access_token: current_user.access_token
        )
      when 'unlock'
        res = MixinBot.api.create_unlock_multisig_request(
          transaction.raw_transaction,
          access_token: current_user.access_token
        )
      else
        raise 'Unvalid action'
      end

      raise res['error'] if res['error'].present?

      {
        multisig_request: res['data']
      }
    end
  end
end
