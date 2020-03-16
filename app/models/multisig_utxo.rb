# frozen_string_literal: true

class MultisigUtxo
  attr_accessor :type, :user_id, :id, :asset_id, :transaction_hash, :output_index, :amount, :threshold, :members, :memo, :state, :created_at, :signed_by, :signed_tx

  def initialize(record = {})
    @type = record['type']
    @id = record['utxo_id']
    @user_id = record['user_id']
    @asset_id = record['asset_id']
    @transaction_hash = record['transaction_hash']
    @output_index = record['output_index'].to_i
    @amount = record['amount'].to_f
    @threshold = record['threshold'].to_i
    @members = record['members']
    @memo = record['memo']
    @state = record['state']
    @created_at = record['created_at']
    @signed_by = record['signed_by']
    @signed_tx = record['signed_tx']
  end

  def asset
    @asset = Asset.find_by(asset_id: asset_id)
  end

  def user
    @user = User.find_by(mixin_uuid: user_id)
  end
end
