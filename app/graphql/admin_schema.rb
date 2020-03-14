# frozen_string_literal: true

class AdminSchema < GraphQL::Schema
  mutation Types::Admin::MutationType
  query Types::Admin::QueryType

  # Opt in to the new runtime (default in future graphql-ruby versions)
  use GraphQL::Execution::Interpreter
  use GraphQL::Analysis::AST

  # Add built-in connections for pagination
  use GraphQL::Pagination::Connections

  # use batch loader to fix N+1
  use BatchLoader::GraphQL
end
