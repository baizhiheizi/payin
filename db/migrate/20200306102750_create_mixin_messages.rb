class CreateMixinMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :mixin_messages do |t|
      t.string :action
      t.string :category
      t.string :content
      t.string :representative_id
      t.string :quote_message_id
      t.string :conversation_id
      t.string :user_id
      t.string :message_id
      t.json :raw
      t.datetime :processed_at
      t.timestamps
    end

    add_index :mixin_messages, :message_id, unique: true
    add_index :mixin_messages, :user_id
  end
end
