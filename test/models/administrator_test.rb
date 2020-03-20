# frozen_string_literal: true

# == Schema Information
#
# Table name: administrators
#
#  id              :uuid             not null, primary key
#  name            :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_administrators_on_name  (name) UNIQUE
#
require 'test_helper'

class AdministratorTest < ActiveSupport::TestCase
  setup do
    @admin = Administrator.create!(name: 'admin_test', password: 'password')
  end

  test 'admin auth' do
    assert @admin.authenticate('password')
  end
end
