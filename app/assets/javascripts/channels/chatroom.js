App.chatroom = App.cable.subscriptions.create("ChatroomChannel", {
	// Called when the subscription is ready for use on the server
	connected: function() {
	
	},

	// Called when the subscription has been terminated by the server
	disconnected: function() {
	
	},

	// Called when there's incoming data on the websocket for this channel
	received: function(data) {
		// Append message partial to message container
		$('.message-container').append(data.render_message);
		// Style message partial further
		message_style();
		// Auto-scroll
		scroll_bottom(true);
	}
});