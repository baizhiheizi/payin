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
require 'test_helper'

class MixinGroupTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
