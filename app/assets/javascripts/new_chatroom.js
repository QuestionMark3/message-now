// Button for creating new chatroom
new_chatroom_btn = () => {
	let new_btn = $('#new');
	new_btn.click((event) => {
		
		new_btn.addClass('disabled');
		setTimeout(function() {new_btn.removeClass('disabled')}, 500);

		$('#view').removeClass('active');
		new_btn.addClass('active');

		showMenu('new');

	});
};

// Bind 'enter' key to 'submit' button
submit_chatroom = () => {
	$('#chatroom_title').on('keydown', (event) => {
		if (event.target == document.activeElement && event.which == 13) {
			$('#room-form-0').click();
			// Clear text field
			event.target.value = "";
			// Highlight appropriate chatroom button
			$('.user.card').css('background-color', '#999');
			//Uncheck all checkboxes
			uncheckAll();
		};
	});
};