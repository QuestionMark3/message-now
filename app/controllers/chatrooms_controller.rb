class ChatroomsController < ApplicationController
	before_action :require_user

	def index
		@users = User.all
		@chatroom = Chatroom.new
		@chatrooms = current_user.chatrooms
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
			chatrooms = current_user.chatrooms
			chatroom_users = @chatroom.users.where('user_id != (?)', current_user.id)
			other_users = User.where('id NOT IN (?)', @chatroom.users.pluck(:id))
			flash[:success] = 'Chatroom was successfully created'
			ActionCable.server.broadcast 'chatroom_channel', 	render_chatroom: render_chatroom(@chatroom, 0, chatrooms.length),
																												render_chatroom_users: render_chatroom_users(@chatroom, current_user, chatroom_users, other_users),
																												chatroom_id: @chatroom.id,
																												user_ids: @chatroom.users.ids,
																												creator_id: current_user.id
		else
			puts @chatroom.errors.full_messages
		end
	end

	def leave
		chatroom = Chatroom.find(params[:format])
		if chatroom.users.length > 1
			if chatroom.users.delete(current_user.id)
				ActionCable.server.broadcast 'option_channel', 	mode: 0,
																												chatroom_id: chatroom.id,
																												chatroom_users: chatroom.users.pluck(:id).zip(chatroom.users.pluck(:username))
			end
		else
			chatroom.destroy
		end
	end

	def rename
		chatroom = Chatroom.find(params[:format])
		if chatroom.update(chatroom_params)
			ActionCable.server.broadcast 'option_channel',  mode: 1,
																											chatroom_id: chatroom.id,
																											new_title: chatroom.title
		end
	end

	private
	def chatroom_params
		params.require(:chatroom).permit(:title, user_ids: [])
	end

	def render_chatroom(chatroom, unread, length)
		render_to_string(partial: 'chatroom_card', locals: {chatroom: chatroom, unread: unread, length: length})
	end

	def render_chatroom_users(chatroom, current_user, chatroom_users, other_users)
		render_to_string(partial: 'chatroom_options', locals: {chatroom: chatroom, current_user: current_user, chatroom_users: chatroom_users, other_users: other_users})
	end

end
