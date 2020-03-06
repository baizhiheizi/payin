# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_06_102750) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "administrators", force: :cascade do |t|
    t.string "name", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_administrators_on_name", unique: true
  end

  create_table "assets", force: :cascade do |t|
    t.string "name"
    t.string "symbol"
    t.string "icon_url"
    t.string "mixin_id"
    t.string "asset_id"
    t.string "chain_id"
    t.string "price_btc"
    t.string "price_usd"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["asset_id"], name: "index_assets_on_asset_id", unique: true
  end

  create_table "mixin_messages", force: :cascade do |t|
    t.string "action"
    t.string "category"
    t.string "content"
    t.string "representative_id"
    t.string "quote_message_id"
    t.string "conversation_id"
    t.string "user_id"
    t.string "message_id"
    t.json "raw"
    t.datetime "processed_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["message_id"], name: "index_mixin_messages_on_message_id", unique: true
    t.index ["user_id"], name: "index_mixin_messages_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "avatar"
    t.string "mixin_id"
    t.string "mixin_uuid"
    t.string "access_token", comment: "access token authorized by mixin messenger user"
    t.json "raw", comment: "mixin user raw profile"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["mixin_id"], name: "index_users_on_mixin_id", unique: true
    t.index ["mixin_uuid"], name: "index_users_on_mixin_uuid", unique: true
  end

end
