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
message_style = (current_chatroom) => {
	var current_usr_id = Number($('#hidden-user-id').text());
	var messages = current_chatroom.children();

	// Timestamp
	current_chatroom.find('.hidden-timestamp').each(function(i) {
		
		var timestamp = $(this).data('timestamp');
		var datetime = new Date(timestamp);
		strfdatetime = format_datetime(datetime);
		current_chatroom.find('.date').eq(i).text(strfdatetime[0]);
		current_chatroom.find('.time').eq(i).text(strfdatetime[1]);
	});

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
		  	message.attr('align', 'right');
		    user.remove();
		    body.removeClass('grey').addClass('blue').attr('align', 'left');
		  case prev_msg_usr_id:
		  	user.remove();
		  	prev_message_cont.height(prev_message.height());
		};
	};
};

// Auto-scroll to bottom of message feed
scroll_bottom = (animate, elements) => {
	if (elements.length > 0) {
		if (animate == true) {
			elements.animate({scrollTop: elements[0].scrollHeight}, 250);
		}
		else {
			elements.scrollTop(elements[0].scrollHeight);
		}
	}
};

// Format datetime on client side
format_datetime = (date_time) => {

	// Format time
	let datetime = new Date(date_time);
	let hours = datetime.getHours();
  let minutes = datetime.getMinutes();

  let ampm = hours >= 12 ? 'pm' : 'am';

  hours = hours % 12;
  hours = hours ? hours : 12;

  if(minutes < 10) {minutes = `0${minutes}`};

	// Format date
	// Variables for comparison
	datetime.setHours(0,0,0,0);
	let now = new Date();
	now.setHours(0,0,0,0);
	let yest = new Date();
	yest.setDate(yest.getDate() - 1);
	yest.setHours(0,0,0,0);
	let week_ago = new Date();
	week_ago.setDate(week_ago.getDate() - 7);

	// Output variables
	let month = datetime.toLocaleDateString('en', {month:'short'});
	let date = datetime.getDate();
	let year = datetime.getFullYear();
	let cal_date;

	// Control flow
	if (datetime.getTime() == now.getTime()) {
		cal_date = 'Today';
	}
	else if (datetime.getTime() == yest.getTime()) {
		cal_date = 'Yesterday';
	}
	else if (datetime > week_ago) {
		cal_date = datetime.toLocaleDateString('en', {weekday:'long'});
	}
	else if (datetime.getYear() == now.getYear) {
		let day = datetime.toLocaleDateString('en', {weekday:'short'});
		cal_date = `${day}, ${month} ${date},`;
	}
	else {
		cal_date = `${month} ${date}, ${year},`;
	};

  // Return datetime
  return [cal_date,`${hours}:${minutes} ${ampm}`];
};