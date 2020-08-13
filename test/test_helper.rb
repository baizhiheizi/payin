# frozen_string_literal: true

require 'simplecov'
SimpleCov.start :rails do
  add_group 'Services', 'app/services'
  add_group 'Graphql', 'app/graphql'
end

ENV['RAILS_ENV'] ||= 'test'
require 'minitest/mock'
require_relative '../config/environment'
require 'rails/test_help'
require 'webmock/minitest'

class ActiveSupport::TestCase
  ADMIN_GQL_PATH = Rails.root.join('app/javascript/src/apps/admin/graphql')
  GQL_PATH = Rails.root.join('app/javascript/src/apps/application/graphql')

  # Run tests in parallel with specified workers
  # parallelize(workers: :number_of_processors)
  # parallelize(workers: 8)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  def read_query(query)
    File.read File.join(GQL_PATH, 'queries', "#{query}.gql")
  end

  def read_mutation(mutation)
    File.read File.join(GQL_PATH, 'mutations', "#{mutation}.gql")
  end

  def read_admin_query(query)
    File.read File.join(ADMIN_GQL_PATH, 'queries', "#{query}.gql")
  end

  def read_admin_mutation(mutation)
    File.read File.join(ADMIN_GQL_PATH, 'mutations', "#{mutation}.gql")
  end

  def mixin_bot_mocking_read_asset
    {
      'data' => {
        'type' => 'asset',
        'asset_id' => '965e5c6e-434c-3fa9-b780-c50f43cd955c',
        'chain_id' => '43d61dcd-e413-450d-80b8-101d5e903357',
        'symbol' => 'CNB',
        'name' => 'Chui Niu Bi',
        'icon_url' => 'https://mixin-images.zeromesh.net/0sQY63dDMkWTURkJVjowWY6Le4ICjAFuu3ANVyZA4uI3UdkbuOT5fjJUT82ArNYmZvVcxDXyNjxoOv0TAYbQTNKS=s128',
        'balance' => '809125.88500984',
        'destination' => '0x78ac7a8D6b5bd73C69C9BAB7feaaCD604F8d304A',
        'tag' => '',
        'price_btc' => '0',
        'price_usd' => '0',
        'change_btc' => '0',
        'change_usd' => '0',
        'asset_key' => '0xec2a0550a2e4da2a027b3fc06f70ba15a94a6dac',
        'mixin_id' => 'b9f49cf777dc4d03bc54cd1367eebca319f8603ea1ce18910d09e2c540c630d8',
        'confirmations' => 100,
        'capitalization' => 0
      }
    }
  end

  def mixin_bot_mocking_read_user
    {
      'data' => {
        'type' => 'user',
        'user_id' => '7ed9292d-7c95-4333-aa48-a8c640064186',
        'identity_number' => '1051445',
        'phone' => '',
        'full_name' => '李安',
        'biography' => "开发者，作品包括 我信,
        Flowin & PRSDigg",
        'avatar_url' => 'https://mixin-images.zeromesh.net/9tMscDkZuXyLKMRChmFi5IiFF2XuQHO8PQpED8zKOCBDGKGSVB9J2eqzyjhgJKPDVunXiT-DPiisImX_bhBDPi4=s256',
        'relationship' => 'STRANGER',
        'mute_until' => '2018-07-29T02:36:34.416679244Z',
        'created_at' => '2018-01-01T13:56:13.552445046Z',
        'is_verified' => false
      }
    }
  end

  def mixin_bot_mocking_read_me
    mixin_bot_mocking_read_user
  end

  def mixin_bot_mocking_oauth_token
    'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9'
  end
end
