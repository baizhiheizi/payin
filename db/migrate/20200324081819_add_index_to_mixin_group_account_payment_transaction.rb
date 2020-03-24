class AddIndexToMixinGroupAccountPaymentTransaction < ActiveRecord::Migration[6.0]
  def change
    remove_index :mixin_groups, :conversation_id
    remove_index :multisig_accounts, :account_hash
    remove_index :multisig_transactions, :transaction_hash

    add_index :mixin_groups, :conversation_id, unique: true
    add_index :multisig_accounts, :account_hash, unique: true
    add_index :multisig_payments, :code_id, unique: true
    add_index :multisig_payments, :trace_id, unique: true
    add_index :multisig_transactions, :transaction_hash, unique: true
  end
end
