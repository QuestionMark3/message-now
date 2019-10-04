// Bind 'enter' key to 'submit' button and clear textfield
submit_message = () => {
	$('#message_body').on('keydown', (event) => {
		if (event.target == document.activeElement && event.which == 13) {
			$('#msg-form').click();
			event.target.value = "";
		};
	});
};


// Style messages
message_style = () => {
	var current_usr_id = Number($('#hidden-user-id').text());
	var messages = $('.message-container').children();

	// Iterate through messages
	var i;
	for (i = 0; i < messages.length; i++) {

		// Variable definitions
		var message = messages.eq(i).find('.summary');
		var prev_message_cont = messages.eq(i-1).find('.content');
		var prev_message = messages.eq(i-1).find('.summary');
		var user = message.find('.msg-user');
		var body = message.find('.segment');
		var msg_usr_id = Number(message.find('.hidden-msg-user-id').text());
		var prev_msg_usr_id = Number(message.find('.hidden-prev-msg-user-id').text());
		// Control flow
		switch(msg_usr_id) {

		  case current_usr_id:
		  	message.attr('align', 'right')
		    user.remove();
		    body.removeClass('grey').addClass('blue').attr('align', 'left');
		  case prev_msg_usr_id:
		  	user.remove();
		  	prev_message_cont.height(prev_message.height());
		};
	};
};

// Auto-scroll to bottom of message feed
scroll_bottom = (animate) => {
	if ($('#messages').length > 0) {
		if (animate == true) {
			$('#messages').animate({scrollTop: $('#messages')[0].scrollHeight}, 250);
		}
		else {
			$('#messages').scrollTop($('#messages')[0].scrollHeight);
		}
	}
}