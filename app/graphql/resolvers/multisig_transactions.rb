# frozen_string_literal: true

class Resolvers::MultisigTransactions < Resolvers::BaseResolver
  description 'list all multisig accounts'

  argument :account_id, ID, required: true

  type Types::MultisigTransactionType.connection_type, null: false

  def resolve(account_id:)
    current_user.multisig_accounts.find(account_id).multisig_transactions.order(created_at: :desc)
  end
end
