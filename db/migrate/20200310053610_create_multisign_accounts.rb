class CreateMultisignAccounts < ActiveRecord::Migration[6.0]
  def change
    create_table :multisign_accounts do |t|
      t.references :creator, to_table: :users
      t.string :name
      t.string :introduction
      t.integer :threshold
      t.json :member_uuids, comment: 'sort before saved'

      t.timestamps
    end
  end
end
