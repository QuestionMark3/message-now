class ChatroomUsersController < ApplicationController

	def reset_unread
		user_id = params[:user_id].to_i
		chatroom_id = params[:chatroom_id].to_i
		chatroom_user = ChatroomUser.find_by(user_id: user_id, chatroom_id: chatroom_id)
		if chatroom_user
			chatroom_user.update(unread: 0)
		end
	end

end