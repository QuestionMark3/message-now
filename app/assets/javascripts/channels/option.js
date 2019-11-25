App.option = App.cable.subscriptions.create("OptionChannel", {
  
  received: function(data) {
  	switch (data.mode) {
  		case 0:
        leave(data.chatroom_id, data.user_id);
  			break;
  		case 1:
  			rename(data.chatroom_id, data.new_title);
  			break;
      case 2:
        addUsers( data.chatroom_id,     data.added_user_ids,          data.user_ids,
                  data.render_chatroom, data.render_chatroom_options, data.messages,
                  data.other_count);
        break;
      case 3:
        removeUsers(data.chatroom_id, data.user_ids,
                    data.chat_count,  data.total_count);
        break;
  	};
  }
});
