# frozen_string_literal: true

class Resolvers::CurrentGroup < Resolvers::BaseResolver
  description 'open page inside mixin group'

  type Types::MixinGroupType, null: true

  argument :conversation_id, String, required: true

  def resolve(conversation_id:)
    MixinGroup.find_or_create_by!(conversation_id: conversation_id)
  end
end
