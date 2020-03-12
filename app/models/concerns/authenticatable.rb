# frozen_string_literal: true

module Authenticatable
  extend ActiveSupport::Concern

  class_methods do
    def auth_from_mixin(code)
      access_token = MixinBot.api.oauth_token(code)
      res = MixinBot.api.read_me(access_token)
      raise res.inspect if res['error'].present?

      create_by_profile(res['data'], access_token)
    end

    def read_user_from_mixin(uid)
      res = MixinBot.api.read_user(uid)
      raise res.inspect if res['error'].present?

      create_by_profile(res['data'])
    end

    def create_by_profile(profile, access_token = nil)
      user = create_with(raw: profile).find_or_create_by!(mixin_uuid: profile['user_id'])
      user.raw = profile
      user.update! raw: profile if user.raw_changed?
      user.update access_token: access_token if access_token.present?

      user
    end
  end
end
