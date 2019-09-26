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

// Bind 'enter' key to 'submit' button and clear textfield
submit_message = () => {
	$('#message_body').on('keydown', (event) => {
		if (event.which == 13) {
			$('button').click();
			event.target.value = "";
		};
	});
};

// Close flash messages when 'x' button is clicked or after 4 seconds
message_close = () => {
	$('.message .close').on('click', (event) => {
    	$(event.currentTarget).closest('.message').transition('fade');
  	});

	setTimeout(f => {
  		$('.message').fadeOut(1000);
	}, 5000)
}

// Login/Signup page opacity changes
form_opacity = () => {
	var login = $('#loginform')
	var signup = $('#signupbtn')

	signup.on('mouseenter', (event) => {
		$(event.currentTarget).fadeTo(400, 1);
		login.fadeTo(400, 0.5);
	});
	signup.on('mouseleave', (event) => {
		$(event.currentTarget).fadeTo(400, 0.5);
		login.fadeTo(400, 1);
	});
}

// Style messages
message_style = () => {
	var current_usr_id = Number($('#hidden-user-id').text());
	var messages = $('#message-container').children();

	// Iterate through messages
	var i;
	for (i = 0; i < messages.length; i++) {

		// Variable definitions
		var message = messages.eq(i).find('.summary');
		var prev_message_cont = messages.eq(i-1).find('.content');
		var prev_message = messages.eq(i-1).find('.summary');
		var user = message.find('.user');
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

// Login/Signup equal column heights
equal_height = () => {
	var loginheight = $('#loginform').height();
	var button = $('#signupbtn').children();
	var btnheight = (loginheight - button.innerHeight())/2;
	button.css('margin-top',btnheight);
	$('#signupbtn').height(loginheight);
};

// jQuery to be executed after DOM loads
$(document).on('turbolinks:load', () => {
	message_style();
	scroll_bottom(false);
	$('.ui.dropdown').dropdown();
	equal_height();
	message_close();
	form_opacity();
  submit_message();
})