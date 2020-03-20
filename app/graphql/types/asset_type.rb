# frozen_string_literal: true

module Types
  class AssetType < Types::BaseObject
    field :id, ID, null: false
    field :icon_url, String, null: true
    field :name, String, null: false
    field :symbol, String, null: false
    field :price_btc, Float, null: true
    field :price_usd, Float, null: true
    field :asset_id, String, null: false
    field :mixin_id, String, null: false
    field :chain_id, String, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
