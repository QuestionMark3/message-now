showMenu = (mode) => {
	$('.profile').hide();
	$('.new-action').hide();
	$('.view-action').hide();
	$('.chatroom-options').hide();
	let el;
	switch (mode) {
		case 'profile':
			el = $('.profile');
			break;
		case 'new':
			el = $('.new-action');
			break;
		case 'view':
			el = $('.view-action');
			break;
		case 'options':
			el = $('.chatroom-options');
			break;
	};
	el.fadeIn(500);
};


idToUsername = (id) => {
	return $(`h2.chatroom-options[data-chatroom_id = ${id}]`).text();
};

subtractNotif = (chatroom_id) => {
	let chat_notif = $(`#chatroom_${chatroom_id}_badge`).text();
	let total_notif = $('#chatrooms_badge');
	total_notif.text(Number(total_notif.text()) - Number(chat_notif));
};