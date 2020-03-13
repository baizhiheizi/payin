class CreateMultisignAccountMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :multisign_account_members, id: :uuid do |t|
      t.references :user, type: :uuid
      t.references :multisign_account, type: :uuid

      t.timestamps
    end
  end
end
