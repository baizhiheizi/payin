# frozen_string_literal: true

class MixinGroupFindOrCreateParticipantsWorker
  include Sidekiq::Worker
  sidekiq_options retry: true

  def perform(id)
    MixinGroup.find_by(id: id)&.find_or_create_participants!
  end
end
