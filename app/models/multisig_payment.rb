# frozen_string_literal: true

# == Schema Information
#
# Table name: multisig_payments
#
#  id                   :uuid             not null, primary key
#  amount               :decimal(, )
#  memo                 :string
#  receivers            :uuid             is an Array
#  status               :string
#  threshold            :integer
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#  asset_id             :uuid
#  code_id              :uuid
#  multisig_accounts_id :uuid
#  trace_id             :uuid
#
# Indexes
#
#  index_multisig_payments_on_multisig_accounts_id  (multisig_accounts_id)
#  index_multisig_payments_on_receivers             (receivers)
#
class MultisigPayment < ApplicationRecord
end
