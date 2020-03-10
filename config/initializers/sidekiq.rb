# frozen_string_literal: true

Sidekiq.configure_server do |config|
  config.redis = { namespace: 'payin_sidekiq' }
end

Sidekiq.configure_client do |config|
  config.redis = { namespace: 'payin_sidekiq' }
end

Sidekiq.configure_server do |config|
end
