# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, unless: :from_graphql_introspection
  before_action :authenticate_user!
  helper_method :current_user
  helper_method :base_props

  private

  def authenticate_user!
    return if from_graphql_introspection

    redirect_to login_path unless current_user
  end

  def current_user
    @current_user ||= session[:current_user_uuid] && User.find_by(mixin_uuid: session[:current_user_uuid])

    return if @current_user.blank?

    user_sign_out if @current_user.access_token.blank?

    @current_user
  end

  def user_sign_in(user)
    session[:current_user_uuid] = user.mixin_uuid
  end

  def user_sign_out
    session[:current_user_uuid] = nil
    @current_user = nil
  end

  def from_graphql_introspection
    Rails.env.development? && request.headers['Authorization'] == Rails.application.credentials.dig(:graphql_introspection_token)
  end

  def base_props
    return {} if current_user.blank?

    {
      currentUser: {
        name: current_user&.name,
        mixinUuid: current_user&.mixin_uuid,
        mixinId: current_user&.mixin_id,
        avatar: current_user&.avatar
      }
    }
  end
end
