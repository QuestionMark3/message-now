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

        break;
      case 3:
        removeUsers(data.chatroom_id, data.user_ids);
        break;
  	};
  }
});
