# frozen_string_literal: true

# https://github.com/rmosolgo/graphiql-rails/blob/master/readme.md
Rails.env.development? &&
  GraphiQL::Rails.config.headers['Authorization'] = ->(_context) { ENV['GRAPHQL_INTROSPECTION_TOKEN'] }
