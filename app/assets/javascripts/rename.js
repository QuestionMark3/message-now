submitRename = (chatroom) => {
	$('.edit_chatroom_title').on('keydown', (event) => {
		if (event.target == document.activeElement && event.which == 13) {
			$(event.target).siblings('.rename-form').click();
			console.log($(event.target).siblings('rename-form').html());
			event.target.value = "";
		};
	});
};

rename = () => {
	$('.edit.button').click((event) => {
		chatroom_id = $(event.target).closest('[data-chatroom_id]').data('chatroom_id');
		toggleRename(chatroom_id);
	});
	$('.edit.item').click((event) => {
		chatroom_id = $(event.target).closest('[data-chatroom_id]').data('chatroom_id');
		showMenu(chatroom_id);
		toggleRename(chatroom_id);
	});
};


toggleRename = (chatroom_id) => {
	let header = $(`.users-header[data-chatroom_id=${chatroom_id}]`);
	let form = $(`.chatroom-name[data-chatroom_id=${chatroom_id}]`);

	if (isVisible(header)) {
		showRenameForm(form, header);
	}
	else {
		hideRenameForm(form, header);
	};
};

showRenameForm = (form, header) => {
	header.hide();
	form.fadeIn(500);
};

hideRenameForm = (form, header) => {
	form.hide();
	header.fadeIn(500);
};