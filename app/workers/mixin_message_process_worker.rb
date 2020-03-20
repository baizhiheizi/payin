# frozen_string_literal: true

class MixinMessageProcessWorker
  include Sidekiq::Worker
  sidekiq_options retry: true

  def perform(id)
    message = MixinMessage.find_by(id: id)
    return if message.blank?
    return if message.processed?

    message.process!

    raise 'failed to process!' unless message.processed?
  end
end
