# frozen_string_literal: true

class Resolvers::Assets < Resolvers::BaseResolver
  description 'list all assets'

  type Types::AssetType.connection_type, null: false

  def resolve
    Asset.all
  end
end
