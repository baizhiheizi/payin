# frozen_string_literal: true

module Mutations
  class CreateMultisigPayment < BaseMutation
    argument :conversation_id, String, required: false
    argument :account_id, ID, required: true
    argument :amount, Float, required: true
    argument :asset_id, String, required: true
    argument :memo, String, required: false

    field :multisig_payment, Types::MultisigPaymentType, null: true
    field :errors, String, null: true

    def resolve(params)
      account = current_user.multisig_accounts.find(params[:account_id])
      res = MixinBot.api.create_multisig_payment(
        asset_id: params[:asset_id],
        amount: params[:amount],
        memo: params[:memo],
        trace_id: SecureRandom.uuid,
        receivers: account.member_uuids,
        threshold: account.threshold
      )
      raise res['error'] if res['error'].present?

      payment = MultisigPayment.new(
        creator: current_user,
        multisig_account: account,
        data: res['data']
      )

      if payment.save
        {
          multisig_payment: payment
        }
      else
        {
          errors: payment.errors.full_messages.join('; ')
        }
      end
    end
  end
end
