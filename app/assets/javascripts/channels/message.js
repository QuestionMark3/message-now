// Wait for DOM to load so elements can be queried
$(document).on('turbolinks:load', () => {

	//Iterate through chatrooms
	$('.message-container').each(function() {

		App[`chatroom${$(this).data('chatroom_id')}`] = App.cable.subscriptions.create({
			channel: "MessageChannel",
			room: String($(this).data('chatroom_id'))
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
				$(`.message-container[data-chatroom_id=${this.chatroomId}]`).append(data.render_message);
				// Style message partial further
				message_style();
				// Auto-scroll
				scroll_bottom(true);
			},

			// Called  in function chatroom_btns() in file: view_chatroom.js.erb
			setChatroomId: function(chatroomId) {
				this.chatroomId = chatroomId;
			}

		});

	});
})