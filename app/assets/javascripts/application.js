// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery
//= require turbolinks
//= require semantic-ui
//= require_tree .

// Global functions
format = () => {
	var format_block = $('#format');
	var visible = format_block.is(':visible')

	if (visible) {
		format_block.css('display', 'none');
	}
	else {
		setTimeout(() => {format_block.css('display', 'block')}, 500);
	}
}

// jQuery to be executed after DOM loads
$(document).on('turbolinks:load', () => {
	// Flash messages
	message_close();

	// Login page
	form_opacity();
	equal_height();

	// Chatroom
	submit_message();
	scroll_bottom(false);

	// View actions
	view_chatrooms_btn();
	chatroom_btns();

	// New actions
	new_chatroom_btn();
	user_checkbox();
	submit_chatroom();
})