# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id                                                            :uuid             not null, primary key
#  access_token(access token authorized by mixin messenger user) :string
#  avatar                                                        :string
#  mixin_uuid                                                    :uuid
#  name                                                          :string
#  raw(mixin user raw profile)                                   :json
#  created_at                                                    :datetime         not null
#  updated_at                                                    :datetime         not null
#  mixin_id                                                      :string
#
# Indexes
#
#  index_users_on_mixin_id    (mixin_id) UNIQUE
#  index_users_on_mixin_uuid  (mixin_uuid) UNIQUE
#
class User < ApplicationRecord
  include Authenticatable

  has_many :multisign_account_members, dependent: :nullify
  has_many :multisign_accounts, through: :multisign_account_members

  before_validation :set_attributes, on: :create

  validates :mixin_id, presence: true, uniqueness: true
  validates :mixin_uuid, presence: true, uniqueness: true
  validates :name, presence: true
  validates :raw, presence: true

  private

  def set_attributes
    return unless new_record?

    assign_attributes(
      name: raw['full_name'],
      avatar: raw['avatar_url'],
      mixin_id: raw['identity_number'],
      mixin_uuid: raw['user_id']
    )
  end
end
