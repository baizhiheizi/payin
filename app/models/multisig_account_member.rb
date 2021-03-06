# frozen_string_literal: true

# == Schema Information
#
# Table name: multisig_account_members
#
#  id                  :uuid             not null, primary key
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  multisig_account_id :uuid
#  user_id             :uuid
#
# Indexes
#
#  index_multisig_account_members_on_multisig_account_id  (multisig_account_id)
#  index_multisig_account_members_on_user_id              (user_id)
#
class MultisigAccountMember < ApplicationRecord
  belongs_to :user
  belongs_to :multisig_account
end
