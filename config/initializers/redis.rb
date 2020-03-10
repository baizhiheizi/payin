# frozen_string_literal: true

module OhmyxinRedis
  class << self
    attr_accessor :redis
  end
end
redis = Redis::Namespace.new(Rails.application.credentials.dig(:redis, :namespace), redis: Redis.new)

OhmyxinRedis.redis = redis
Redis::Objects.redis = redis
