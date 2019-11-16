// Remove user from chatroom
leave = (chatroom_id, user_id) => {
	let current_user_id = $('#hidden-user-id').data('user_id');
	if (current_user_id === user_id) {
		return;
	};
	let user_list = $(`.chatroom-users[data-chatroom_id = ${chatroom_id}]`).children('.list');
	let list_item = $(`.item.header[data-user_id = "${user_id}"]`);
	let add_cards = $(`#add-users-${chatroom_id}>.cards`);
	let rem_card = $(`#remove-users-${chatroom_id}>.cards>[data-user-id = ${user_id}]`).removeAttr('style');
	let card_HTML = rem_card[0].outerHTML;
	list_item.remove();
	rem_card.remove();
	add_cards.append(card_HTML);
	addCheckbox('add', chatroom_id, removeCheckbox('remove', chatroom_id, user_id));
	checkbox('add', add_cards.find(`[data-user-id = ${user_id}]>.content`));
	btnIfCheck('add', chatroom_id, user_id);
};

remove = (chatroom_id) => {
	subtractNotif(chatroom_id);
	showMenu('profile');
	reduceChatCount();
	$('.profile .statistic>.value').eq(1).text(reach());
	$('.profile .statistic>.value').eq(2).text(activeChat());
	removeChatroom(chatroom_id);
	if (!$('.message-container').is(':visible')) {
		$('#chatbox').dimmer('show');
	};
};

// Remove chatroom
removeListener = (el = $('.delete')) => {
	el.click((event) =>{
		chatroom_id = $(event.target).closest('[data-chatroom_id]').data('chatroom_id');
		remove(chatroom_id);
	});
};

removeChatroom = (chatroom_id) => {
	$(`.message-container[data-chatroom_id = ${chatroom_id}]`).remove();
	$(`.chatroom.card[data-chatroom_id = ${chatroom_id}]`).remove();
	$(`.chatroom-options[data-chatroom_id = ${chatroom_id}]`).remove();
	$(`#add-rem-users-${chatroom_id}`).remove();
};

reduceChatCount = () => {
	let chat_length = $('.profile .statistic>.value').eq(0);
	chat_length.text(Number(chat_length.text()) - 1);
};

reach = () => {
	let user_list = $(`.chatroom-users`).find('h2');
	let users = [];
	user_list.each(function(){
		users.push($(this).text());
	});
	return [...new Set(users)].length; 
};

activeChat = () => {
	let active_chat_el = $('.profile .statistic>.value').eq(2);
	let active_chat_id;
	let prev_count = 0;
	$('.message-container').each(function(){
		let msg_count = $(this).find('.segment').length;
		if (msg_count >= prev_count) {
			prev_count = msg_count;
			active_chat_id = $(this).data('chatroom_id');
		};
	});
	let active_chat = idToUsername(active_chat_id);
	return (active_chat === '') ? 'None' : active_chat;
};