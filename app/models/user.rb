# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id           :uuid             not null, primary key
#  access_token :string
#  avatar       :string
#  data         :json
#  mixin_uuid   :uuid
#  name         :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  mixin_id     :string
#
# Indexes
#
#  index_users_on_mixin_id    (mixin_id) UNIQUE
#  index_users_on_mixin_uuid  (mixin_uuid) UNIQUE
#
class User < ApplicationRecord
  include Authenticatable

  has_many :multisig_account_members, dependent: :nullify
  has_many :multisig_accounts, through: :multisig_account_members
  has_many :created_payments, class_name: 'MultisigPayment', foreign_key: :creator_id, inverse_of: :creator, dependent: :nullify

  before_validation :set_attributes, on: :create

  validates :mixin_id, presence: true, uniqueness: true
  validates :mixin_uuid, presence: true, uniqueness: true
  validates :name, presence: true
  validates :data, presence: true

  private

  def set_attributes
    return unless new_record?

    assign_attributes(
      name: data['full_name'],
      avatar: data['avatar_url'],
      mixin_id: data['identity_number'],
      mixin_uuid: data['user_id']
    )
  end
end
