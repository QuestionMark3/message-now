// Button for viewing chatrooms
view_chatrooms_btn = () => {

	let view_btn = $('#view');
	view_btn.click((event) => {
		
		view_btn.addClass('disabled');
		setTimeout(function() {view_btn.removeClass('disabled')}, 500);

		$('#new').removeClass('active');
		view_btn.addClass('active');

		$('.profile').hide();
		$('.new-action').hide();
		$('.chatroom-user').hide();
		$('.view-action').fadeIn(500);

	});
}

// Buttons for selecting chatrooms
chatroom_btns = ( el=$('.chatroom.card>.content') ) => {
	el.click((event) => {

		// Remove dimmer
		if (!$('#dimmer').hasClass('hidden')) {
			$('#chatbox').dimmer('show').dimmer('hide');
		};

		// Find target element
		let target = $(event.target).parent()
		if ($(event.target).attr('class') != 'content') {
			target = $(event.target).parent().parent()
		};

		// Toggle color
		$('.chatroom.card').removeClass('disabled');
		target.addClass('disabled');

		// Reset badge for target
		let badge = target.find('.floating.ui.red.label');
		let user_id = Number($('#hidden-user-id').data('user_id'));
		let chatroom_id = target.data('chatroom_id');
		reset_unread(badge);
		reset_db_unread(user_id, chatroom_id);

		// Pass chatroom id to hidden field in main form
		$('#message_chatroom_id').val(chatroom_id);

		// Display appropriate message container
		$('.message-container').fadeOut(500);
		setTimeout(() => {
			let current_chatroom = $(`.message-container[data-chatroom_id = "${chatroom_id}"]`);
			current_chatroom.fadeIn(500);
			message_style(current_chatroom);
			scroll_bottom(false, $('#messages'));
		}, 500)

		// Display users
		$('.view-action').hide();
		let current_chatroom_users = $(`.chatroom-user[data-chatroom_id = "${chatroom_id}"]`);
		current_chatroom_users.fadeIn(500);

	});
}