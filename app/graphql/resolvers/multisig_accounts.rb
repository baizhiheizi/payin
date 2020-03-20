# frozen_string_literal: true

class Resolvers::MultisigAccounts < Resolvers::BaseResolver
  description 'list all multisig accounts'

  type Types::MultisigAccountType.connection_type, null: false

  def resolve
    current_user.multisig_accounts
  end
end
