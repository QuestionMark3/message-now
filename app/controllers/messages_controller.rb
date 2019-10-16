class MessagesController < ApplicationController
	before_action :require_user

	def create
		message = current_user.messages.build(message_params)
		messages = message.chatroom.messages
		if message.save
			ActionCable.server.broadcast "chatroom#{message.chatroom.id}", 	render_message: render_message(message, messages),
																																			chatroom_id: message.chatroom.id
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