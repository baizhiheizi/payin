class CreateMultisigRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :multisig_requests, id: :uuid do |t|
      t.references :multisig_transactions, type: :uuid
      t.references :users, type: :uuid
      t.string :action
      t.string :state
      t.uuid :request_id
      t.uuid :code_id, index: true, unique: true
      t.json :data

      t.timestamps
    end
  end
end
