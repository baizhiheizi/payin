# frozen_string_literal: true

module Mutations
  class CreateMultisigAccount < BaseMutation
    argument :conversation_id, String, required: false
    argument :name, String, required: true
    argument :introduction, String, required: false
    argument :threshold, Int, required: true
    argument :member_uuids, [String], required: true

    field :multisig_account, Types::MultisigAccountType, null: true
    field :errors, String, null: true

    def resolve(params)
      account = MultisigAccount.new(
        creator: current_user,
        name: params[:name],
        introduction: params[:introduction],
        threshold: params[:threshold],
        member_uuids: params[:member_uuids]
      )

      if account.save
        {
          multisig_account: account
        }
      else
        {
          errors: account.errors.full_messages.join('; ')
        }
      end
    end
  end
end
