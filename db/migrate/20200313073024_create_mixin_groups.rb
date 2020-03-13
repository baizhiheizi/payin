class CreateMixinGroups < ActiveRecord::Migration[6.0]
  def change
    create_table :mixin_groups, id: :uuid do |t|
      t.uuid :conversation_id, index: true, unique: true
      t.uuid :creator_id, index: true
      t.uuid :code_id
      t.string :name
      t.string :category
      t.uuid :participant_uuids, array: true
      t.json :raw

      t.timestamps
    end
  end
end
