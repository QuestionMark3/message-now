class ApplicationController < ActionController::Base
	helper_method :current_user, :logged_in?

	def current_user
		@current_user ||= User.find(cookies.signed.encrypted[:user_id]) if cookies.signed.encrypted[:user_id]
	end

	def logged_in?
		!!current_user
	end

	def require_user
		if !logged_in?
			redirect_to login_path
		end
	end


end
