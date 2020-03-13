# frozen_string_literal: true

# == Schema Information
#
# Table name: multisig_accounts
#
#  id                              :uuid             not null, primary key
#  introduction                    :string
#  member_uuids(sort before saved) :json
#  name                            :string
#  threshold                       :integer
#  created_at                      :datetime         not null
#  updated_at                      :datetime         not null
#  creator_id                      :uuid
#
# Indexes
#
#  index_multisig_accounts_on_creator_id  (creator_id)
#
class MultisigAccount < ApplicationRecord
  belongs_to :creator, class_name: 'User', foreign_key: :creator_id, inverse_of: false

  has_many :multisig_account_members, dependent: :nullify
  has_many :members, through: :multisig_account_members, source: :user

  validates :name, presence: true
  validates :threshold, numericality: { only_integer: true, greater_than: 0 }
  validates :members, presence: true
  validate :threshold_must_not_greater_than_members_size
  validate :members_must_be_valid_array

  private

  def threshold_must_not_greater_than_members_size
    errors.add(:threshold, 'Must less or equal to members size') if threshold > members&.length
  end

  def members_must_be_valid_array
    erros.add(:members, 'Members must be an array') unless members.is_a? Array
    erros.add(:members, 'Members size must be greater than 0') if members.length <= 0
  end
end
