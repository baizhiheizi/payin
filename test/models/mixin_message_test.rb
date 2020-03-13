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
require 'test_helper'

class MixinMessageTest < ActiveSupport::TestCase
  setup do
    @raw = {
      id: 'dc9b20d1-807c-4778-9b66-02a04db08a13',
      action: 'CREATE_MESSAGE',
      data:
        {
          type: 'message',
          primitive_id: '',
          primitive_message_id: '',
          representative_id: '',
          quote_message_id: '',
          conversation_id: '204c0633-ef55-38c3-bbf7-4069cd6661bb',
          user_id: '7ed9292d-7c95-4333-aa48-a8c640064186',
          session_id: '',
          message_id: '71474673-b0d0-4f8b-ac33-fdf777c3f686',
          category: 'PLAIN_TEXT',
          data: 'aHR0cDovLzE5Mi4xNjguMC43NjozMDAw',
          status: 'SENT',
          source: 'LIST_PENDING_MESSAGES',
          created_at: '2019-10-09T01:52:51.386567Z',
          updated_at: '2019-10-09T01:52:51.386567Z'
        }
    }
  end

  test 'create mixin message' do
    msg = MixinMessage.create! raw: @raw
    assert msg.message_id == @raw[:data][:message_id]
  end

  test 'plain category' do
    assert mixin_messages(:plain_text).plain?
  end
end
