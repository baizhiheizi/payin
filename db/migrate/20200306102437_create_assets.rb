class CreateAssets < ActiveRecord::Migration[6.0]
  def change
    create_table :assets, id: :uuid do |t|
      t.string :name
      t.string :symbol
      t.string :icon_url
      t.string :mixin_id
      t.uuid :asset_id
      t.uuid :chain_id
      t.string :price_btc
      t.string :price_usd

      t.timestamps
    end

    add_index :assets, :asset_id, unique: true
  end
end
