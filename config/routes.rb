# frozen_string_literal: true

require 'sidekiq/web'
Sidekiq::Web.set :session_secret, Rails.application.secrets[:secret_key_base]

class AdminConstraint
  def matches?(request)
    return false if request.session[:current_admin_id].blank?

    admin = Administrator.find_by(id: request.session[:current_admin_id])
    admin.present?
  end
end

Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?
  post '/graphql', to: 'graphql#execute'
  root to: 'home#index'

  namespace :admin do
    get 'login', to: 'sessions#new', as: :login
    root to: 'home#index'

    # graphql
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/admin/graphql' if Rails.env.development?
    post '/graphql', to: 'graphql#execute'

    # sidekiq
    mount Sidekiq::Web, at: 'sidekiq', constraints: AdminConstraint.new

    match '*path' => redirect('/admin'), via: :get
  end
end
