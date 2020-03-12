# frozen_string_literal: true

require 'simplecov'
SimpleCov.start :rails do
  add_group 'Services', 'app/services'
  add_group 'Graphql', 'app/graphql'
end

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  ADMIN_GQL_PATH = Rails.root.join('app/javascript/apps/graphql/admin')
  GQL_PATH = Rails.root.join('app/javascript/apps/graphql/application')

  # Run tests in parallel with specified workers
  # parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  def read_query(query)
    File.read File.join(GQL_PATH, 'queries', query + '.gql')
  end

  def read_mutation(mutation)
    File.read File.join(GQL_PATH, 'mutations', mutation + '.gql')
  end

  def read_admin_query(query)
    File.read File.join(ADMIN_GQL_PATH, 'queries', query + '.gql')
  end

  def read_admin_mutation(mutation)
    File.read File.join(ADMIN_GQL_PATH, 'mutations', mutation + '.gql')
  end
end
