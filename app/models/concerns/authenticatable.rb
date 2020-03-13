# frozen_string_literal: true

module Authenticatable
  extend ActiveSupport::Concern

  class_methods do
    def auth_from_mixin(code)
      access_token = MixinBot.api.oauth_token(code)
      res = MixinBot.api.read_me(access_token)
      raise res.inspect if res['error'].present?

      create_by_data(res['data'], access_token)
    end

    def read_user_from_mixin(uid)
      res = MixinBot.api.read_user(uid)
      raise res.inspect if res['error'].present?

      create_by_data(res['data'])
    end

    def create_by_data(data, access_token = nil)
      user = create_with(data: data).find_or_create_by!(mixin_uuid: data['user_id'])
      user.data = data
      user.update! data: data if user.data_changed?
      user.update access_token: access_token if access_token.present?

      user
    end
  end
end
