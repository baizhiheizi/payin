class CreateMultisigAccountMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :multisig_account_members, id: :uuid do |t|
      t.references :user, type: :uuid
      t.references :multisig_account, type: :uuid

      t.timestamps
    end
  end
end
