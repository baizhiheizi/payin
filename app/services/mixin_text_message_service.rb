# frozen_string_literal: true

class MixinTextMessageService
  def call(text, conversation_id:, recipient_id: nil)
    msg = MixinBot.api.plain_text(
      conversation_id: conversation_id,
      recipient_id: recipient_id,
      data: text
    )
    SendMixinMessageWorker.perform_async msg
  end
end
