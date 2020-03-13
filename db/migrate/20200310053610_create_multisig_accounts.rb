class CreateMultisigAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :multisig_accounts, id: :uuid do |t|
      t.references :creator, type: :uuid
      t.string :name
      t.string :introduction
      t.integer :threshold
      t.uuid :member_uuids, array: true, index: true, using: 'gin'
      t.string :hash, index: true, unique: true

      t.timestamps
    end
  end
end
