App.chatroom = App.cable.subscriptions.create("ChatroomChannel", {

  // Called when the subscription is ready for use on the server
  connected: function() {
    
  },

  // Called when the subscription has been terminated by the server
  disconnected: function() {
    
  },

  // Called when there's incoming data on the websocket for this channel
  received: function(data) { 
    let current_usr_id = Number($('#hidden-user-id').data('user_id'));
  	if (data.user_ids.includes(current_usr_id)) {

	    // Append chatroom button to chatrooms list
      let chat_list = $('#chatrooms>.ui.cards');
	    chat_list.append(data.render_chatroom);

	    // Append message container to main content
	    let clss = 'class="ui large feed message-container"';
	    let dta = `data-chatroom_id="${data.chatroom_id}"`;
	    $('#messages').append(`<div ${clss} ${dta}></div>`);

      // Append chatroom options container to vertical menu
      let actions = $('#actions');
      actions.before(data.render_chatroom_users);
      let chat_options = $(`.chatroom-users[data-chatroom_id = ${data.chatroom_id}]`);
      let user_list_item = chat_options.find(`.list>.item[data-user_id = ${current_usr_id}]`);
      let user_card = $(`#remove-users-${data.chatroom_id}>.cards>[data-user-id = ${current_usr_id}]`);
      user_list_item.remove();
      user_card.remove();

      // Add event listeners
      removeListener($(`[data-chatroom_id = ${data.chatroom_id}]`).find('.delete'));
      renameListener();
      submitRename();
      addOrRemListener('add', data.chatroom_id);
      addOrRemListener('remove', data.chatroom_id);
      checkbox('add', $(`#add-users-${data.chatroom_id} .ui.cards>.card>.content`));
      checkbox('remove', $(`#remove-users-${data.chatroom_id} .ui.cards>.card>.content`));
      btnIfCheck('add', data.chatroom_id);
      btnIfCheck('remove', data.chatroom_id);
      addRemSubmit('add');
      addRemSubmit('remove');

      // Reset checkboxes and empty forms for renaming chatrooms
      emptyChatroomNames();
      uncheckAll();

      // Create subscription
      chat_subscribe( $('.message-container').last() );

      // Make chatroom button clickable
      let chat_btn = chat_list.children().last();
      chatroom_btns(chat_btn);
      $('#view').click();

      // Enable dropdown
      chat_list.find('.ui.dropdown').dropdown();

      // Click button  only if creator
      if (current_usr_id == data.creator_id) {
        chat_btn.children().last().children().click();
      };

      // Increase chatroom count
      let chat_length = $('.profile .statistic>.value').eq(0);
      chat_length.text(Number(chat_length.text()) + 1);

      // Auto-scroll
      scroll_bottom(true, $('#chatrooms'));
	  };
  }
});
