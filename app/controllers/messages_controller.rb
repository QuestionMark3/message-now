class MessagesController < ApplicationController
	before_action :require_user

	def create
		message = current_user.messages.build(message_params)
		if message.save
			ActionCable.server.broadcast "chatroom#{message.chatroom.id}:chatroom_channel", render_message: render_message(message)
		else
			puts message.errors.full_messages
		end
	end

	private

	def message_params
		params.require(:message).permit(:body, :chatroom_id)
	end

	def render_message(msg)
		render(partial: 'messages/message', locals: {message: msg})
	end

end