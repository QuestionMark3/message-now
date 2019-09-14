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
	scroll_bottom(false);
	$('.ui.dropdown').dropdown();
	equal_height();
	message_close();
	form_opacity();
  	submit_message();
})