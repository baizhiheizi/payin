class CreateMixinMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :mixin_messages, id: :uuid do |t|
      t.string :action
      t.string :category
      t.string :content
      t.uuid :representative_id
      t.uuid :quote_message_id
      t.uuid :conversation_id
      t.uuid :user_id
      t.uuid :message_id
      t.json :raw
      t.datetime :processed_at
      t.timestamps
    end

    add_index :mixin_messages, :message_id, unique: true
    add_index :mixin_messages, :user_id
  end
end
