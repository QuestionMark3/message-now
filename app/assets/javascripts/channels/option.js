App.option = App.cable.subscriptions.create("OptionChannel", {
  
  received: function(data) {
  	switch (data.mode) {
  		case 0:
  			leave(data.chatroom_id, data.chatroom_users, data.current_user);
  			break;
  		case 1:
  			rename(data.chatroom_id, data.new_title)
  			break;
  	};
  }
});
