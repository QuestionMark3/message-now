App.chatroom = App.cable.subscriptions.create("ChatroomChannel", {

  received: function(data) { 
    newChatroom(data.chatroom_id, data.user_ids, data.render_chatroom, data.render_chatroom_users);
    let current_usr_id = Number($('#hidden-user-id').data('user_id'));
    if (current_usr_id == data.creator_id) {
    	let chat_btn = $('#chatrooms>.ui.cards').children().last();
      chat_btn.children().last().children().click();
    };
  }
});
