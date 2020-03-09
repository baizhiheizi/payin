# frozen_string_literal: true

class SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[new create]
  skip_before_action :verify_authenticity_token, only: :create

  def new
    redirect_to format(
      'https://mixin-www.zeromesh.net/oauth/authorize?client_id=%<client_id>s&scope=%<scope>s',
      client_id: MixinBot.api.client_id,
      scope: 'PROFILE:READ'
    )
  end

  def create
    code = params[:code]
    user = User.auth_from_mixin(code)
    user_sign_in(user) if user

    redirect_to root_path
  end

  def destroy
    user_sign_out
  end
end
