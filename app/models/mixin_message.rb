# frozen_string_literal: true

# == Schema Information
#
# Table name: mixin_messages
#
#  id                :bigint           not null, primary key
#  action            :string
#  category          :string
#  content           :string
#  processed_at      :datetime
#  raw               :json
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  conversation_id   :string
#  message_id        :string
#  quote_message_id  :string
#  representative_id :string
#  user_id           :string
#
# Indexes
#
#  index_mixin_messages_on_message_id  (message_id) UNIQUE
#  index_mixin_messages_on_user_id     (user_id)
#
class MixinMessage < ApplicationRecord
end
