class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users, id: :uuid do |t|
      t.string :name
      t.string :avatar
      t.string :mixin_id
      t.uuid :mixin_uuid
      t.string :access_token
      t.json :data

      t.timestamps
    end

    add_index :users, :mixin_id, unique: true
    add_index :users, :mixin_uuid, unique: true
  end
end
