# frozen_string_literal: true

module Types
  class MixinGroupType < Types::BaseObject
    field :id, ID, null: false
    field :category, String, null: false
    field :name, String, null: false
    field :participant_uuids, [String], null: false
    field :code_id, String, null: false
    field :conversation_id, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false

    field :creator, Types::UserType, null: false
    field :users, [Types::UserType], null: false

    def creator
      BatchLoader::GraphQL.for(object.creator_id).batch do |creator_ids, loader|
        User.where(mixin_uuid: creator_ids).each { |creator| loader.call(creator.mixin_uuid, creator) }
      end
    end
  end
end
