# frozen_string_literal: true

# == Schema Information
#
# Table name: multisig_requests
#
#  id                      :uuid             not null, primary key
#  action                  :string
#  data                    :json
#  state                   :string
#  created_at              :datetime         not null
#  updated_at              :datetime         not null
#  code_id                 :uuid
#  multisig_transaction_id :uuid
#  request_id              :uuid
#  user_id                 :uuid
#
# Indexes
#
#  index_multisig_requests_on_code_id                  (code_id)
#  index_multisig_requests_on_multisig_transaction_id  (multisig_transaction_id)
#  index_multisig_requests_on_user_id                  (user_id)
#
class MultisigRequest < ApplicationRecord
  belongs_to :user
  belongs_to :multisig_transaction

  before_validation :set_attributes

  validates :action, presence: true
  validates :data, presence: true
  validates :code_id, presence: true, uniqueness: true
  validates :request_id, presence: true, uniqueness: true

  private

  def set_attributes
    assign_attributes(
      code_id: data['code_id'],
      request_id: data['request_id'],
      state: data['state']
    )
  end
end
