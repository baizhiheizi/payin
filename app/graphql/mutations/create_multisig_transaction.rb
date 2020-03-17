# frozen_string_literal: true

module Mutations
  class CreateMultisigTransaction < BaseMutation
    argument :conversation_id, String, required: false
    argument :account_id, ID, required: true
    argument :amount, Float, required: true
    argument :asset_id, String, required: true
    argument :memo, String, required: false
    argument :receiver_uuid, String, required: true

    field :multisig_transaction, Types::MultisigTransactionType, null: true
    field :errors, String, null: true

    def resolve(params)
      account = current_user.multisig_accounts.find(params[:account_id])
      transaction = account.multisig_transactions.new(
        user: current_user,
        receiver_uuids: [params[:receiver_uuid]],
        asset_id: params[:asset_id],
        amount: params[:amount],
        memo: params[:memo],
      )

      if transaction.save
        {
          multisig_transaction: transaction
        }
      else
        {
          errors: transaction.errors.full_messages.join('; ')
        }
      end
    end
  end
end
