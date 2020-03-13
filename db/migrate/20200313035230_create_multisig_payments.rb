class CreateMultisigPayments < ActiveRecord::Migration[6.0]
  def change
    create_table :multisig_payments, id: :uuid do |t|
      t.references :multisig_accounts, type: :uuid
      t.references :creator, type: :uuid
      t.uuid :trace_id
      t.uuid :asset_id
      t.uuid :code_id
      t.integer :threshold
      t.decimal :amount
      t.string :memo
      t.string :status
      t.uuid :receivers, array: true, index: true, using: 'gin'
      t.json :raw

      t.timestamps
    end
  end
end
