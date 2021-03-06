# frozen_string_literal: true

# == Schema Information
#
# Table name: mixin_groups
#
#  id                :uuid             not null, primary key
#  category          :string
#  data              :json
#  name              :string
#  participant_uuids :uuid             is an Array
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  code_id           :uuid
#  conversation_id   :uuid
#  creator_id        :uuid
#
# Indexes
#
#  index_mixin_groups_on_conversation_id  (conversation_id) UNIQUE
#  index_mixin_groups_on_creator_id       (creator_id)
#
class MixinGroup < ApplicationRecord
  belongs_to :creator, class_name: 'User', primary_key: :mixin_uuid, inverse_of: false

  before_validation :set_attributes
  after_create :find_or_create_participants!

  validates :category, presence: true
  validates :conversation_id, presence: true, uniqueness: true

  def multisig_account
    @multisig_account =
      MultisigAccount
      .find_by(
        member_uuids: (participant_uuids - MixinBot.client_id).sort
      )
  end

  def refresh!
    r = MixinBot.api.read_conversation conversation_id
    return if r['data'].blank?

    update! data: r['data']
    find_or_create_participants!
  end

  def find_or_create_participants!
    participant_uuids.each do |uuid|
      next if uuid == MixinBot.client_id

      User.find_or_read_from_mixin uuid
    end
  end

  def find_or_create_participants_async
    MixinGroupFindOrCreateParticipantsWorker.perform_async id
  end

  def users
    User.where(mixin_uuid: participant_uuids - [MixinBot.client_id])
  end

  private

  def set_attributes
    read_conversation if data.blank?

    assign_attributes(
      creator_id: data['creator_id'],
      category: data['category'],
      code_id: data['code_id'],
      name: data['name'],
      participant_uuids: data['participants'].map(&->(participant) { participant['user_id'] })
    )
  end

  def read_conversation
    r = MixinBot.api.read_conversation conversation_id
    return if r['data'].blank?
    return unless r['data']['category'] == 'GROUP'

    self.data = r['data']
  end
end
