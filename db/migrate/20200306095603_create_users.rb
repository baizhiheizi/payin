class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :avatar
      t.string :mixin_id
      t.string :mixin_uuid
      t.string :access_token, comment: 'access token authorized by mixin messenger user'
      t.json :raw, comment: 'mixin user raw profile'

      t.timestamps
    end

    add_index :users, :mixin_id, unique: true
    add_index :users, :mixin_uuid, unique: true
  end
end
