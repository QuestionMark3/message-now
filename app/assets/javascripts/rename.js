submitRename = (chatroom) => {
	$('.edit_chatroom_title').on('keydown', (event) => {
		if (event.target == document.activeElement && event.which == 13) {
			let chatroom_id = $(event.target).closest('[data-chatroom_id]').data('chatroom_id');
			let header = $(`.users-header[data-chatroom_id=${chatroom_id}]`);
			let form = $(`.chatroom-name[data-chatroom_id=${chatroom_id}]`);
			let edit = $(`[data-chatroom_id=${chatroom_id}]>.edit.button`);
			$(event.target).siblings('.rename-form').click();
			event.target.value = "";
			hideRenameForm(chatroom_id);
			$('.edit.button').removeClass('blue');
		};
	});
};

renameListener = () => {
	$('.edit.button').click((event) => {
		let chatroom_id = $(event.target).closest('[data-chatroom_id]').data('chatroom_id');
		let input = $(`.chatroom-name[data-chatroom_id=${chatroom_id}]`).find('input:text');
		toggleRename(chatroom_id);
		input.focus();
	});
	$('.edit.item').click((event) => {
		let chatroom_id = $(event.target).closest('[data-chatroom_id]').data('chatroom_id');
		let input = $(`.chatroom-name[data-chatroom_id=${chatroom_id}]`).find('input:text');
		showMenu(chatroom_id);
		toggleRename(chatroom_id);
		input.focus();
	});
};

rename = (chatroom_id, title) => {
	let chatroom_card = $(`.chatroom.card[data-chatroom_id = ${chatroom_id}]`);
	let chatroom_header = $(`.users-header[data-chatroom_id = ${chatroom_id}]`);
	chatroom_card.find('b').text(title);
	chatroom_header.text(title);
};

toggleRename = (chatroom_id) => {
	let header = $(`.users-header[data-chatroom_id=${chatroom_id}]`);
	$('.add.button').removeClass('blue');
	$('.remove.button').removeClass('red');
	if (isVisible(header)) {
		showRenameForm(chatroom_id);
		$(`.chatroom-users[data-chatroom_id = ${chatroom_id}]`).fadeIn(500);
	}
	else {
		hideRenameForm(chatroom_id);
	};
};

showRenameForm = (chatroom_id) => {
	let header = $(`.users-header[data-chatroom_id=${chatroom_id}]`);
	let form = $(`.chatroom-name[data-chatroom_id=${chatroom_id}]`);
	let edit = $(`[data-chatroom_id=${chatroom_id}]>.edit.button`);
	header.hide();
	form.fadeIn(500);
	edit.addClass('blue');
	hideAddOrRemMenu(chatroom_id, 'add');
	hideAddOrRemMenu(chatroom_id, 'remove');
};

hideRenameForm = (chatroom_id) => {
	let header = $(`.users-header[data-chatroom_id=${chatroom_id}]`);
	let form = $(`.chatroom-name[data-chatroom_id=${chatroom_id}]`);
	let edit = $(`[data-chatroom_id=${chatroom_id}]>.edit.button`);
	edit.removeClass('blue');
	form.hide();
	header.fadeIn(500);
};

emptyChatroomNames = () => {
	$('.edit_chatroom_title').val('');
};