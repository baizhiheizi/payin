# frozen_string_literal: true

class Admin::BaseController < ActionController::Base
  protect_from_forgery with: :exception, unless: :from_graphql_introspection

  layout 'admin'

  helper_method :current_admin

  private

  def authenticate_admin!
    return if from_graphql_introspection

    redirect_to admin_login_path unless current_admin
  end

  def current_admin
    return Administrator.first if from_graphql_introspection

    @current_admin ||= session[:current_admin_id] && Administrator.find_by(id: session[:current_admin_id])
  end

  def admin_sign_in(admin)
    session[:current_admin_id] = admin.id
  end

  def admin_sign_out
    session[:current_admin_id] = nil
    @current_admin = nil
  end

  def from_graphql_introspection
    Rails.env.development? && request.headers['Authorization'] == Rails.application.credentials.dig(:graphql, :introspection_token)
  end
end
