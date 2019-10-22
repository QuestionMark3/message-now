class MessagesController < ApplicationController
	before_action :require_user

	def create
		message = current_user.messages.build(message_params)
		messages = message.chatroom.messages
		if message.save
			message.chatroom.chatroom_users.each do |chatroom_user|
				new_count = chatroom_user.unread + 1
				chatroom_user.update(unread: new_count)
			end
			ActionCable.server.broadcast "chatroom#{message.chatroom.id}", 	render_message: render_message(message, messages),
																																			chatroom_id: message.chatroom.id,
																																			user_id: message.user.id
		else
			puts message.errors.full_messages
		end
	end

	private

	def message_params
		params.require(:message).permit(:body, :chatroom_id)
	end

	def render_message(msg, msgs)
		render(partial: 'messages/message', locals: {message: msg, messages: msgs})
	end

end