# frozen_string_literal: true

# == Schema Information
#
# Table name: mixin_messages
#
#  id                :uuid             not null, primary key
#  action            :string
#  category          :string
#  content           :string
#  processed_at      :datetime
#  raw               :json
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  conversation_id   :uuid
#  message_id        :uuid
#  quote_message_id  :uuid
#  representative_id :uuid
#  user_id           :uuid
#
# Indexes
#
#  index_mixin_messages_on_message_id  (message_id) UNIQUE
#  index_mixin_messages_on_user_id     (user_id)
#
class MixinMessage < ApplicationRecord
  before_validation :set_attributes, on: :create

  validates :message_id, presence: true
  validates :raw, presence: true

  def plain?
    /^PLAIN_/.match? category
  end

  private

  def set_attributes
    return unless new_record?

    data = raw['data']

    self.action            = raw['action']
    self.message_id        = data['message_id']
    self.category          = data['category']
    self.conversation_id   = data['conversation_id']
    self.quote_message_id  = data['quote_message_id']
    self.representative_id = data['representative_id']
    self.user_id           = data['user_id']
    self.content           = Base64.decode64 data['data']
  end
end
