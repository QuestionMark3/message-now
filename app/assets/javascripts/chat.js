// Bind 'enter' key to 'submit' button and clear textfield
submit_message = () => {
	$('#message_body').on('keydown', (event) => {
		if (event.target == document.activeElement && event.which == 13) {
			$('#msg-form').click();
			event.target.value = "";
		};
	});
};

// Auto-scroll to bottom of message feed
scroll_bottom = (animate, elements) => {
	if (elements.length > 0) {
		if (animate) {
			elements.animate({scrollTop: elements[0].scrollHeight}, 250);
		}
		else {
			elements.scrollTop(elements[0].scrollHeight);
		}
	}
};

// Style messages
messageStyle = (current_chatroom) => {

	let current_usr_id = Number($('#hidden-user-id').data('user_id'));
	let messages = current_chatroom.children();

	// Timestamp
	current_chatroom.find('.ui.horizontal.divider').each(function(i) {
		
		let timestamp = $(this).data('timestamp');
		let datetime = new Date(timestamp);
		strfdatetime = format_datetime(datetime);
		$(this).children('.date').text(strfdatetime[0]);
		$(this).children('.time').text(strfdatetime[1]);
	});

	// Iterate through messages
	let i;
	for (i = 0; i < messages.length; i++) {

		// Variable definitions
		let message = messages.eq(i).find('.summary');
		let prev_message_cont = messages.eq(i-1).find('.content');
		let prev_message = messages.eq(i-1).find('.summary');
		let user = message.find('.msg-user');
		let body = message.find('.segment');
		let msg_usr_id = Number(message.find('.hidden-data').data('msg_user_id'));
		let prev_msg_usr_id = Number(message.find('.hidden-data').data('prev_msg_user_id'));
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