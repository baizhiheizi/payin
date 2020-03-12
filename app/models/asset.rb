# frozen_string_literal: true

# == Schema Information
#
# Table name: assets
#
#  id         :bigint           not null, primary key
#  icon_url   :string
#  name       :string
#  price_btc  :string
#  price_usd  :string
#  symbol     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  asset_id   :string
#  chain_id   :string
#  mixin_id   :string
#
# Indexes
#
#  index_assets_on_asset_id  (asset_id) UNIQUE
#
class Asset < ApplicationRecord
  validates :icon_url, presence: true
  validates :name, presence: true
  validates :symbol, presence: true
  validates :asset_id, presence: true
  validates :chain_id, presence: true
  validates :mixin_id, presence: true

  def self.create_from_mixin(asset_id)
    r = MixinBot.api.read_asset(asset_id)
    data = r['data']
    return if data.blank?

    create_with(
      icon_url: data['icon_url'],
      name: data['name'],
      price_usd: data['price_usd'],
      price_btc: data['price_btc'],
      symbol: data['symbol'],
      chain_id: data['chain_id'],
      mixin_id: data['mixin_id']
    ).find_or_create_by!(
      asset_id: data['asset_id']
    )
  end
end
