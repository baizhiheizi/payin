# frozen_string_literal: true

# == Schema Information
#
# Table name: mixin_groups
#
#  id                :uuid             not null, primary key
#  category          :string
#  name              :string
#  participant_uuids :uuid             is an Array
#  raw               :json
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  code_id           :uuid
#  conversation_id   :uuid
#  creator_id        :uuid
#
# Indexes
#
#  index_mixin_groups_on_conversation_id  (conversation_id)
#  index_mixin_groups_on_creator_id       (creator_id)
#
class MixinGroup < ApplicationRecord
  belongs_to :creator, class_name: 'User', foreign_key: :creator_id, inverse_of: false

  before_validation :set_attributes

  validates :category, presence: true
  validates :code_id, presence: true
  validates :conversation_id, presence: true, uniqueness: true

  def multisig_account
    @multisig_account =
      MultisigAccount
      .find_by(
        member_uuids: (participant_uuids - MixinBot.client_id).sort
      )
  end

  def self.create_from_mixin!
    r = MixinBot.api.read_conversation conversation_id
    return if r['data'].blank?
    return unless r['data']['category'] == 'GROUP'

    create! raw: r['data']
  end

  def refresh!
    r = MixinBot.api.read_conversation conversation_id
    return if r['data'].blank?

    update! raw: r['data']
  end

  private

  def set_attributes
    assign_attributes(
      conversation_id: raw['conversation_id'],
      creator_id: raw['creator_id'],
      category: raw['category'],
      code_id: raw['code_id'],
      name: raw['name'],
      participant_uuids: raw['participants'].map(&->(participant) { participant['user_id'] })
    )
  end
end
