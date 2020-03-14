# frozen_string_literal: true

module MixinMessageProcessable
  def process!
    return if processed?

    if category == 'SYSTEM_CONVERSATION'
      process_system_conversation
    elsif category == 'SYSTEM_ACCOUNT_SNAPSHOT'
      process_snapshot
    elsif conversation == MixinBot.api.unique_conversation_id(user_id)
      process_private_conversation
    else
      process_group_conversation
    end

    update! processed_at: Time.current
  end

  def process_async
    MixinMessageProcessWorker.perform_async id
  end

  def processed?
    processed_at?
  end

  def process_snapshot
    # TODO
  end

  def process_system_conversation
    msg =
      begin
        JSON.parse content
      rescue JSON::ParserError
        {}
      end

    return unless msg['action'].in? %w[ADD REMOVE ROLE]

    MixinGroup.find_or_create_by!(conversation_id: conversation_id)
  end

  def process_group_conversation
    # TODO
    # group helper
  end

  def process_private_conversation
    # TODO
  end
end
