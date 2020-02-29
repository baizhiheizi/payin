# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.0'

# Database
gem 'pg'

# AASM - State machines for Ruby classes (plain Ruby, ActiveRecord, Mongoid)
gem 'aasm'

# Use Puma as the app server
gem 'puma', '~> 4.3'

# Use SCSS for stylesheets
gem 'sass-rails', '~> 5'

# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 4.0'

# Integrate React.js with Rails views and controllers, the asset pipeline, or webpacker. https://github.com/reactjs/react-rails
gem 'react-rails'

# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'

# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 4.0'

# Map Redis types directly to Ruby objects
gem 'redis-objects'

# Redlock is a redis-based distributed lock implementation in Ruby
gem 'redlock'

# This gem adds a Redis::Namespace class which can be used to namespace Redis keys. http://redis.io
gem 'redis-namespace'

# Use Active Model has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.2', require: false

# Enumerated attributes with I18n and ActiveRecord/Mongoid support
gem 'enumerize'

# A simple API wrapper for Mixin Network in Ruby
gem 'mixin_bot', github: 'an-lee/mixin_bot', branch: 'master'

# Wraps the Aliyun OSS as an Active Storage service.
gem 'activestorage-aliyun'

# A Scope & Engine based, clean, powerful, customizable and sophisticated paginator for Ruby webapps
gem 'kaminari'

# Simple, efficient background processing for Ruby http://sidekiq.org
gem 'sidekiq', '~> 5.0'

# Background job scheduler
gem 'clockwork', require: false

# An attempt to tame Rails' default policy to log everything.
gem 'lograge'
gem 'logstash-event'

# Daemonization
gem 'daemons'

# Simple Rails app configuration
gem 'figaro'

# I18n and L10n
gem 'rails-i18n', '~> 6.0'

# Object-based searching. http://ransack-demo.herokuapp.com
gem 'ransack'

# Powerful tool for avoiding N+1 DB or HTTP queries
gem 'batch-loader'

# Add arbitrary ordering to ActiveRecord queries.
gem 'order_as_specified'

# A performance dashboard for Postgres
gem 'pg_query', '>= 0.9.0'
gem 'pghero'

# deploy
gem 'mina', '~> 1.2.2', require: false
gem 'mina-clockwork', require: false
gem 'mina-logs', '~> 1.1.0', require: false
gem 'mina-multistage', '~> 1.0.3', require: false
gem 'mina-ng-puma', '~> 1.2.0', require: false
gem 'mina-sidekiq', '~> 1.0.3', require: false

# Ruby implementation of GraphQL http://graphql-ruby.org
gem 'graphql'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
end

group :development do
  # Annotate Rails classes with schema and routes info
  gem 'annotate', require: false

  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'web-console', '>= 3.3.0'

  # A Ruby static code analyzer and formatter
  # gem 'rubocop', require: false
  gem 'rubocop-rails'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  # Mount the GraphiQL query editor in a Rails app
  gem 'graphiql-rails'

  # A code complexity metrics visualization and exploration tool for Ruby and JavaScript
  gem 'attractor'
  gem 'attractor-javascript'
  gem 'attractor-ruby'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
  # Code coverage for Ruby 1.9+ with a powerful configuration library and automatic merging of coverage across test suites
  gem 'simplecov', require: false
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
