# frozen_string_literal: true

class Resolvers::MultisigAccount < Resolvers::BaseResolver
  description 'list all multisig accounts'

  type Types::MultisigAccountType, null: true

  argument :id, ID, required: true

  def resolve(id:)
    current_user.multisig_accounts.find_by(id: id)
  end
end
