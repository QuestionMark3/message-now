// Button for creating new chatroom
new_chatroom_btn = () => {
	var new_btn = $('#new');
	new_btn.click((event) => {
		
		new_btn.addClass('disabled');
		setTimeout(function() {new_btn.removeClass('disabled')}, 500);

		$('#view').removeClass('active');
		new_btn.addClass('active');

		$('.profile').hide();
		$('.view-action').hide();
		$('.new-action').fadeIn(500);

	});
}

// User checkbox functionality
user_checkbox = () => {
	$('.user.card>.content').click((event) => {

		// Find target element
		var target = $(event.target).parent()
		if ($(event.target).attr('class') != 'content') {
			target = $(event.target).parent().parent()
		};

		// Click hidden checkbox
		$(`#chatroom-form :input[value=${target.data('user-id')}]`).click();

		// Toggle color
		if (target.css('background-color') == 'rgb(153, 153, 153)') {
			target.css('background-color', '#2185d0')
		}
		else {
			target.css('background-color', '#999')
		};

	});
}

// Bind 'enter' key to 'submit' button and clear textfield
submit_chatroom = () => {
	$('#chatroom_title').on('keydown', (event) => {
		if (event.target == document.activeElement && event.which == 13) {
			$('#room-form').click();
			event.target.value = "";
			$('.user.card').css('background-color', '#999');
		};
	});
};