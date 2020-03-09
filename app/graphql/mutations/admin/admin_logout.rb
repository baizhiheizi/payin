# frozen_string_literal: true

module Mutations
  class Admin::AdminLogout < Admin::BaseMutation
    null true

    field :msg, String, null: false

    def resolve
      context[:session][:current_admin_id] = nil
      {
        msg: 'ok'
      }
    end
  end
end
