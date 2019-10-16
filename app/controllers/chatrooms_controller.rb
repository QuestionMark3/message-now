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
			ActionCable.server.broadcast 'chatroom_channel', 	render_chatroom: render_chatroom(@chatroom),
																												chatroom_id: @chatroom.id,
																												user_ids: @chatroom.users.ids,
																												creator_id: current_user.id
		else
			puts @chatroom.errors.full_messages
		end
	end

	private
	def chatroom_params
		params.require(:chatroom).permit(:title, user_ids: [])
	end

	def render_chatroom(chatroom)
		render(partial: 'chatroom_card', locals: {chatroom: chatroom})
	end

end
