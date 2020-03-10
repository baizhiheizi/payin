class CreateMultisignAccountMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :multisign_account_members do |t|
      t.references :user
      t.references :multisign_account

      t.timestamps
    end
  end
end
