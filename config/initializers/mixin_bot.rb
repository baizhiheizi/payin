# frozen_string_literal: true

if Rails.application.credentials[:mixin].present?
  MixinBot.client_id = Rails.application.credentials.dig(:mixin, :client_id)
  MixinBot.client_secret = Rails.application.credentials.dig(:mixin, :client_secret)
  MixinBot.session_id = Rails.application.credentials.dig(:mixin, :session_id)
  MixinBot.pin_token = Rails.application.credentials.dig(:mixin, :pin_token)
  MixinBot.private_key = Rails.application.credentials.dig(:mixin, :private_key)
  MixinBot.scope = Rails.application.credentials.dig(:mixin, :scope)
  MixinBot.api_host = 'mixin-api.zeromesh.net'
  MixinBot.blaze_host = 'mixin-blaze.zeromesh.net'
end
