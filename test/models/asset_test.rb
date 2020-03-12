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
require 'test_helper'

class AssetTest < ActiveSupport::TestCase
  test 'create from mixin' do
    asset_id = '965e5c6e-434c-3fa9-b780-c50f43cd955c'
    mock = MiniTest::Mock.new
    mock.expect :read_asset, mixin_bot_mocking_read_asset, [asset_id]

    MixinBot.stub(:api, mock) do
      asset = Asset.create_from_mixin asset_id
      assert asset.asset_id == asset_id
    end
  end
end
