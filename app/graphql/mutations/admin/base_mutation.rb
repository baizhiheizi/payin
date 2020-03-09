# frozen_string_literal: true

module Mutations
  class Admin::BaseMutation < GraphQL::Schema::RelayClassicMutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    def self.authorized?(obj, ctx)
      super && ctx[:current_admin].present?
    end

    def current_admin
      context[:current_admin]
    end
  end
end
