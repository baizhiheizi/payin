class CreateMultisigTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :multisig_transactions, id: :uuid do |t|
      t.references :users, type: :uuid
      t.references :multisig_accounts, type: :uuid
      t.uuid :asset_id
      t.decimal :amount
      t.string :memo
      t.integer :threshold
      t.uuid :sender_uuids, array: true, index: true, using: 'gin'
      t.uuid :receiver_uuids, array: true, index: true, using: 'gin'
      t.uuid :signer_uuids, array: true, default: []
      t.string :raw_transaction
      t.string :status

      t.timestamps
    end
  end
end
