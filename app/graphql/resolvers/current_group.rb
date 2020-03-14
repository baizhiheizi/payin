# frozen_string_literal: true

class Resolvers::CurrentGroup < Resolvers::BaseResolver
  description 'open page inside mixin group'

  type Types::MixinGroupType, null: true

  argument :conversation_id, String, required: false

  def resolve(conversation_id:)
    return if conversation_id.blank?
    return if conversation_id == MixinBot.api.unique_conversation_id(current_user.mixin_uuid)

    MixinGroup.find_or_create_by!(conversation_id: conversation_id)
  end
end
