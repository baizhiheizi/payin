# frozen_string_literal: true

class SendMixinMessageWorker
  include Sidekiq::Worker
  sidekiq_options retry: true

  def perform(message)
    res = MixinBot.api.send_message message

    raise res['error'].inspect if res['error'].present?
  end
end
