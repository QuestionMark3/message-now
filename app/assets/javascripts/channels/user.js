App.user = App.cable.subscriptions.create("UserChannel", {
  
  // Called when the subscription is ready for use on the server
  connected: function() {
  },

  // Called when the subscription has been terminated by the server
  disconnected: function() {
  },

  // Called when there's incoming data on the websocket for this channel
  received: function(data) {
  	// Append user button to list of users
    $('#users>.ui.link.cards').append(data.render_user);
    // Add checkbox
    $('#room-form').before(data.render_checkbox);
    // Make user button clickable
    let user_btn = $('#users>.ui.link.cards').children().last();
    checkbox(user_btn, '#2185d0');
  }
});
