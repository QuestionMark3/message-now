class ChatroomsController < ApplicationController
	before_action :require_user

	def index
		@users = User.all

		@chatroom = Chatroom.new
		@chatrooms = Chatroom.all
		
		@message = Message.new
		@messages = Message.custom_display
	end

	def create
		@chatroom = current_user.chatrooms.new(chatroom_params)
		@chatroom.users << current_user
		if @chatroom.save
			flash[:success] = 'Chatroom was successfully created'
			redirect_to root_path
		else
			flash[:error] = 'There was a problem with the chatroom\'s information'
		end
	end

	private
	def chatroom_params
		params.require(:chatroom).permit(:title, user_ids: [])
	end

end
