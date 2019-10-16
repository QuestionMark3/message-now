App.chatroom = App.cable.subscriptions.create("ChatroomChannel", {

  // Called when the subscription is ready for use on the server
  connected: function() {
    
  },

  // Called when the subscription has been terminated by the server
  disconnected: function() {
    
  },

  // Called when there's incoming data on the websocket for this channel
  received: function(data) { 
    let current_usr_id = Number($('#hidden-user-id').text());
  	if (data.user_ids.includes(current_usr_id)) {
	    // Append chatroom button to chatrooms list
	    $('#chatrooms>.ui.link.cards').append(data.render_chatroom);
	    // Append message container to main content
	    let clss = 'class="ui large feed message-container"';
	    let dta = `data-chatroom_id="${data.chatroom_id}"`;
	    $('#messages').append(`<div ${clss} ${dta}></div>`);

      // Create subscription
      chat_subscribe( $('.message-container').last() );

      // Make chatroom button clickable
      let chat_btn = $('.ui.link.cards').children().last();
      chatroom_btns(chat_btn);
      $('#view').click();

      // Click button  only if creator
      if (current_usr_id == data.creator_id) {
        chat_btn.children().last().children().click();
      };
      scroll_bottom(true, $('#chatrooms'));
	  };
  }
});
