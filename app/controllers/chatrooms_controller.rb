class ChatroomsController < ApplicationController
	before_action :require_user
	before_action :set_chatroom, except: [:index, :create]
	before_action :set_add_rem_users, only: [:add_users, :remove_users]

	def index
		@users = User.all
		@chatroom = Chatroom.new
		@chatrooms = current_user.chatrooms.includes(:users, [messages: :user])
		@message = Message.new
		@messages = Message.custom_display
		unread_arr = ChatroomUser.where(user_id: current_user.id).pluck(:unread)
		@user_chatrooms = @chatrooms.zip(unread_arr)
		@total_unread = unread_arr.sum
	end

	def create
		@chatroom = current_user.chatrooms.new(chatroom_params).include(:users)
		@chatroom.users << current_user
		if @chatroom.save
			chatrooms = current_user.chatrooms
			chatroom_users = @chatroom.users
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
		if @chatroom.users.length > 1
			if @chatroom.users.delete(current_user.id)
				ActionCable.server.broadcast 'option_channel', 	mode: 0,
																												chatroom_id: @chatroom.id,
																												user_id: current_user.id
			end
		else
			@chatroom.destroy
		end
	end

	def rename
		if @chatroom.update(chatroom_params)
			ActionCable.server.broadcast 'option_channel',  mode: 1,
																											chatroom_id: @chatroom.id,
																											new_title: @chatroom.title
		end
	end

	def add_users
		if @chatroom.users << @users
			chatrooms = current_user.chatrooms.length
			chatroom_users = @chatroom.users
			chatroom_ids = chatroom_users.pluck(:id)
			other_users = User.where('id NOT IN (?)', chatroom_ids)
			messages = @chatroom.messages.limit(50).order('id desc')
			ActionCable.server.broadcast 'option_channel',	mode: 2,
																											chatroom_id: @chatroom.id,
																											added_user_ids: @users.pluck(:id),
																											user_ids: chatroom_ids,
																											render_chatroom: render_chatroom(@chatroom, 1, chatrooms),
																											render_chatroom_options: render_chatroom_users(@chatroom, current_user, chatroom_users, other_users),
																											messages: render_messages(@chatroom)
		end
	end

	def remove_users
		if @chatroom.users.delete(@users)
			ActionCable.server.broadcast 'option_channel',	mode: 3,
																											chatroom_id: @chatroom.id,
																											user_ids: @users.pluck(:id);
		end
	end

	private
	def chatroom_params
		params.require(:chatroom).permit(:title, user_ids: [])
	end

	def set_add_rem_users
		@users = User.where('id IN (?)', chatroom_params[:user_ids])
	end

	def set_chatroom
		@chatroom = Chatroom.find(params[:format])
	end

	def render_chatroom(chatroom, unread, length)
		render_to_string(partial: 'chatroom_card', locals: {chatroom: chatroom, unread: unread, length: length})
	end

	def render_chatroom_users(chatroom, current_user, chatroom_users, other_users)
		render_to_string(partial: 'chatroom_options', locals: {chatroom: chatroom, current_user: current_user, chatroom_users: chatroom_users, other_users: other_users})
	end

	def render_messages(chatroom)
		render_to_string(partial: 'messages/message', collection: chatroom.messages, locals: {messages: chatroom.messages})
	end

end
