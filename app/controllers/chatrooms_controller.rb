class ChatroomsController < ApplicationController
	before_action :require_user

	def index
		@users = User.all
		@chatroom = Chatroom.new
		@chatrooms = Chatroom.all
		@message = Message.new
		@messages = Message.custom_display
		unread_arr = ChatroomUser.where(user_id: current_user.id).pluck(:unread)
		@total_unread = unread_arr.sum
		@user_chatrooms = current_user.chatrooms.zip(unread_arr)

	end

	def create
		@chatroom = current_user.chatrooms.new(chatroom_params)
		@chatroom.users << current_user
		if @chatroom.save
			flash[:success] = 'Chatroom was successfully created'
			ActionCable.server.broadcast 'chatroom_channel', 	render_chatroom: render_chatroom(@chatroom, 0),
																												render_chatroom_users: render_chatroom_users(@chatroom, current_user),
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

	def render_chatroom(chatroom, unread)
		render_to_string(partial: 'chatroom_card', locals: {chatroom: chatroom, unread: unread})
	end

	def render_chatroom_users(chatroom, current_user)
		render_to_string(partial: 'chatroom_users', locals: {chatroom: chatroom, current_user: current_user})
	end

end
