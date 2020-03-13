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

ActiveRecord::Schema.define(version: 2020_03_13_073024) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  create_table "administrators", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_administrators_on_name", unique: true
  end

  create_table "assets", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "symbol"
    t.string "icon_url"
    t.string "mixin_id"
    t.uuid "asset_id"
    t.uuid "chain_id"
    t.string "price_btc"
    t.string "price_usd"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["asset_id"], name: "index_assets_on_asset_id", unique: true
  end

  create_table "mixin_groups", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "conversation_id"
    t.uuid "creator_id"
    t.uuid "code_id"
    t.string "name"
    t.string "category"
    t.uuid "participant_uuids", array: true
    t.json "data"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["conversation_id"], name: "index_mixin_groups_on_conversation_id"
    t.index ["creator_id"], name: "index_mixin_groups_on_creator_id"
  end

  create_table "mixin_messages", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "action"
    t.string "category"
    t.string "content"
    t.uuid "representative_id"
    t.uuid "quote_message_id"
    t.uuid "conversation_id"
    t.uuid "user_id"
    t.uuid "message_id"
    t.json "raw"
    t.datetime "processed_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["message_id"], name: "index_mixin_messages_on_message_id", unique: true
    t.index ["user_id"], name: "index_mixin_messages_on_user_id"
  end

  create_table "multisig_account_members", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id"
    t.uuid "multisig_account_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["multisig_account_id"], name: "index_multisig_account_members_on_multisig_account_id"
    t.index ["user_id"], name: "index_multisig_account_members_on_user_id"
  end

  create_table "multisig_accounts", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "creator_id"
    t.string "name"
    t.string "introduction"
    t.integer "threshold"
    t.uuid "member_uuids", array: true
    t.string "hash"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_multisig_accounts_on_creator_id"
    t.index ["hash"], name: "index_multisig_accounts_on_hash"
    t.index ["member_uuids"], name: "index_multisig_accounts_on_member_uuids"
  end

  create_table "multisig_payments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "multisig_accounts_id"
    t.uuid "creator_id"
    t.uuid "trace_id"
    t.uuid "asset_id"
    t.uuid "code_id"
    t.integer "threshold"
    t.decimal "amount"
    t.string "memo"
    t.string "status"
    t.uuid "receivers", array: true
    t.json "data"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_multisig_payments_on_creator_id"
    t.index ["multisig_accounts_id"], name: "index_multisig_payments_on_multisig_accounts_id"
    t.index ["receivers"], name: "index_multisig_payments_on_receivers"
  end

  create_table "multisig_requests", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "multisig_transactions_id"
    t.uuid "users_id"
    t.string "action"
    t.string "state"
    t.uuid "request_id"
    t.uuid "code_id"
    t.json "data"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["code_id"], name: "index_multisig_requests_on_code_id"
    t.index ["multisig_transactions_id"], name: "index_multisig_requests_on_multisig_transactions_id"
    t.index ["users_id"], name: "index_multisig_requests_on_users_id"
  end

  create_table "multisig_transactions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "users_id"
    t.uuid "multisig_accounts_id"
    t.uuid "asset_id"
    t.decimal "amount"
    t.string "memo"
    t.integer "threshold"
    t.uuid "senders", array: true
    t.uuid "receivers", array: true
    t.uuid "signers", default: [], array: true
    t.string "raw_transaction"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["multisig_accounts_id"], name: "index_multisig_transactions_on_multisig_accounts_id"
    t.index ["receivers"], name: "index_multisig_transactions_on_receivers"
    t.index ["senders"], name: "index_multisig_transactions_on_senders"
    t.index ["users_id"], name: "index_multisig_transactions_on_users_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name"
    t.string "avatar"
    t.string "mixin_id"
    t.uuid "mixin_uuid"
    t.string "access_token"
    t.json "data"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["mixin_id"], name: "index_users_on_mixin_id", unique: true
    t.index ["mixin_uuid"], name: "index_users_on_mixin_uuid", unique: true
  end

end
