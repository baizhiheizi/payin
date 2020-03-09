# frozen_string_literal: true

class HandleMixinMessageService
  def call(raw)
    # check if raw valid
    return if raw&.[]('data')&.[]('data').blank?

    # hanlde create_message only
    return unless raw['action'] == 'CREATE_MESSAGE'

    # ignore group message
    return unless MixinBot.api.unique_conversation_id(raw['data']['user_id']) == raw['data']['conversation_id']

    message = MixinMessage
              .create_with(raw: raw)
              .find_or_create_by!(
                message_id: raw['data']['message_id']
              )

    # process plain message only
    return unless message.plain?

    case message.content
    when 'Hi'
      {
        params: MixinBot.api.plain_text(
          conversation_id: message.conversation_id,
          data: 'Hi there!'
        )
      }
    else
      {
        params: MixinBot.api.plain_text(
          conversation_id: message.conversation_id,
          data: 'Say Hi to me.'
        )
      }
    end
  rescue Encoding::UndefinedConversionError => e
    Rails.logger.error e.inspect
  end
end
