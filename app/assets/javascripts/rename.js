submitRename = (chatroom) => {
	$('.edit_chatroom_title').on('keydown', (event) => {
		if (event.target == document.activeElement && event.which == 13) {
			let chatroom_id = $(event.target).closest('[data-chatroom_id]').data('chatroom_id');
			let header = $(`.users-header[data-chatroom_id=${chatroom_id}]`);
			let form = $(`.chatroom-name[data-chatroom_id=${chatroom_id}]`);
			let edit = $(`[data-chatroom_id=${chatroom_id}]>.edit.button`);
			$(event.target).siblings('.rename-form').click();
			event.target.value = "";
			hideRenameForm(form, header, edit);
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
	let form = $(`.chatroom-name[data-chatroom_id=${chatroom_id}]`);
	let edit = $(`[data-chatroom_id=${chatroom_id}]>.edit.button`);

	if (isVisible(header)) {
		showRenameForm(form, header);
		edit.addClass('blue');
	}
	else {
		hideRenameForm(form, header);
		edit.removeClass('blue');
	};
};

showRenameForm = (form, header, edit) => {
	header.hide();
	form.fadeIn(500);
};

hideRenameForm = (form, header, edit) => {
	form.hide();
	header.fadeIn(500);
};

emptyChatroomNames = () => {
	$('.edit_chatroom_title').val('');
};