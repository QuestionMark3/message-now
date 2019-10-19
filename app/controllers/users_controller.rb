class UsersController < ApplicationController

	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)
		if @user.save
			flash[:success] = "Welcome to Message Now, #{@user.username}"
			cookies.signed.encrypted[:user_id] = @user.id
			ActionCable.server.broadcast 'user_channel', 	render_user: render_user(@user),
																										render_checkbox: render_checkbox(@user.id, @user.username)
			redirect_to root_path
		else
			flash[:error] = 'There was a problem with your sign up information'
			puts @user.errors.full_messages
			redirect_to signup_path
		end
	end

	private

	def user_params
		params.require(:user).permit(:username, :password)
	end

	def render_user(user)
		render_to_string(partial: 'user_card', locals: {user: user})
	end

	def render_checkbox(user_id, username)
		render_to_string(partial: 'hidden_checkbox', locals: {user_id: user_id, username: username})
	end

end