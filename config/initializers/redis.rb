# frozen_string_literal: true

module PayinRedis
  class << self
    attr_accessor :redis
  end
end
redis = Redis::Namespace.new(Rails.application.credentials.dig(:redis, :namespace), redis: Redis.new)

PayinRedis.redis = redis
Redis::Objects.redis = redis
