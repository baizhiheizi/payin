# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :current_user, Types::UserType, null: true
    def current_user
      context[:current_user]
    end

    field :current_group, resolver: Resolvers::CurrentGroup
    field :multisig_accounts, resolver: Resolvers::MultisigAccounts
    field :multisig_account, resolver: Resolvers::MultisigAccount
  end
end
