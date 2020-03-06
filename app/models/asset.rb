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
end
