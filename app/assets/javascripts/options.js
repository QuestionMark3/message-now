// Remove user from chatroom
leave = (chatroom_id, users) => {
	let current_user_id = $('#hidden-user-id').data('user_id');
	let user_list = $(`.chatroom-users[data-chatroom_id = ${chatroom_id}]`).children('.list');
	user_list.empty();
	users.forEach(function(zip){
		let user_id = zip[0];
		let username = zip[1];
		if (user_id !== current_user_id) {
			user_list.append(`<h2 class="item header">${username}</h2>`);
		};
	});
};

// Remove chatroom
remove = () => {
	$('.delete').click((event) =>{
		// Remove chatroom
		let chatroom_id = $(event.target).closest(`[data-chatroom_id]`).data('chatroom_id');
		let chatroom = $(`.message-container[data-chatroom_id = ${chatroom_id}]`);
		let chatroom_card = $(`.chatroom.card[data-chatroom_id = ${chatroom_id}]`);
		let chatroom_options = $(`.chatroom-options[data-chatroom_id = ${chatroom_id}]`);
		chatroom.remove();
		chatroom_card.remove();
		chatroom_options.remove();

		// Switch to profile
		$('.view-action').hide();
		$('.profile').fadeIn(500);

		// Decrease number chatrooms
		let chat_length = $('.profile .statistic .value').eq(0);
		chat_length.text(Number(chat_length.text()) - 1);

		// Re-evaluate reach
		let user_list = $(`.chatroom-users`).find('h2');
		let users = [];
		user_list.each(function(){
			users.push($(this).text());
		});
		let reach = [...new Set(users)].length; 
		$('.profile .statistic .value').eq(1).text(reach);

		// Show dimmer
		if (!$('.message-container').is(':visible')) {
			$('#chatbox').dimmer('show');
		};
	});
};