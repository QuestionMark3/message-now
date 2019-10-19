// Wait for DOM to load so elements can be queried
$(document).on('turbolinks:load', () => {

	//Iterate through chatrooms
	$('.message-container').each(function() {

		chat_subscribe($(this));

	});
});


chat_subscribe = (el) => {
	// Create subscription for chatroom
	App[`chatroom${el.data('chatroom_id')}`] = App.cable.subscriptions.create({
		channel: "MessageChannel",
		room: String(el.data('chatroom_id'))
	},{

		// Called when the subscription is ready for use on the server
		connected: function() {
		
		},

		// Called when the subscription has been terminated by the server
		disconnected: function() {
		
		},

		// Called when there's incoming data on the websocket for this channel
		received: function(data) {
			// Append message partial to message container
			let current_chatroom = $(`.message-container[data-chatroom_id=${data.chatroom_id}]`);
			current_chatroom.append(data.render_message);
			
			// Style message partial further
			message_style(current_chatroom);

			// Increment badge notifications if chatroom not open
			if (current_chatroom.css('display') == 'none') {

				// Chatroom
				let badge = $(`#chatroom_${data.chatroom_id}_badge`);
				let count = Number(badge.text());
				count += 1;
				badge.text(String(count));
				badge.css('display', 'block');

				// All chatrooms
				let main_badge = $('#chatrooms_badge');
				let main_count = Number(main_badge.text());
				main_count += 1;
				main_badge.text(String(main_count));
				main_badge.css('display', 'block');
			};

			// Auto-scroll
			scroll_bottom(true, $('#messages'));
		}

	});
};