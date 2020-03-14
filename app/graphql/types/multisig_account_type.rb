# frozen_string_literal: true

module Types
  class MultisigAccountType < Types::BaseObject
    field :id, ID, null: false
    field :account_hash, String, null: false
    field :introduction, String, null: true
    field :member_uuids, [String], null: false
    field :name, String, null: false
    field :threshold, Int, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false

    field :creator, Types::UserType, null: false
    field :members, [Types::UserType], null: false
    field :utxos, [Types::MultisigUtxoType], null: false
    field :assets, [Types::AssetType], null: false
    field :multisig_payments, [Types::MultisigPaymentType], null: false

    def creator
      BatchLoader::GraphQL.for(object.creator_id).batch do |creator_ids, loader|
        User.where(id: creator_ids).each { |creator| loader.call(creator.id, creator) }
      end
    end

    def members
      BatchLoader::GraphQL.for(object.id).batch(default_value: []) do |multisig_account_ids, loader|
        MultisigAccountMember.includes(:user).where(multisig_account_id: multisig_account_ids).each do |member|
          loader.call(member.multisig_account_id) { |arr| arr << member.user }
        end
      end
    end

    def multisig_payments
      BatchLoader::GraphQL.for(object.id).batch(default_value: []) do |multisig_account_ids, loader|
        MultisigPayment.where(multisig_account_id: multisig_account_ids).each do |payment|
          loader.call(payment.multisig_account_id) { |arr| arr << payment }
        end
      end
    end
  end
end
