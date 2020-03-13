class CreateMultisigAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :multisig_accounts, id: :uuid do |t|
      t.references :creator, type: :uuid, to_table: :users
      t.string :name
      t.string :introduction
      t.integer :threshold
      t.json :member_uuids, comment: 'sort before saved'

      t.timestamps
    end
  end
end
