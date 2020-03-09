# frozen_string_literal: true

module Mutations
  class Admin::AdminLogin < Admin::BaseMutation
    def self.authorized?(_obj, _ctx)
      true
    end

    argument :name, String, required: true
    argument :password, String, required: true

    field :msg, String, null: true

    def resolve(name:, password:)
      admin = Administrator.find_by(name: name)

      if admin&.authenticate(password)
        context[:session][:current_admin_id] = admin.id
        {
          msg: 'success'
        }
      else
        {
          msg: 'fail'
        }
      end
    end
  end
end
