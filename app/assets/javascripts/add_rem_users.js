addOrRemListener = (mode) => {
	$(`.${mode}.button`).click((event) => {
		let chatroom_id = $(event.target).parents('[data-chatroom_id]').data('chatroom_id');
		toggleAddOrRemMenu(chatroom_id, mode);
	});
	$(`.${mode}.item`).click((event) => {
		let chatroom_id = $(event.target).closest('[data-chatroom_id]').data('chatroom_id');
		showMenu(chatroom_id);
		toggleAddOrRemMenu(chatroom_id, mode)
	});
};

toggleAddOrRemMenu = (chatroom_id, mode) => {
	let menu = $(`#${mode}-users-${chatroom_id}`);
	let alt_mode = (mode === 'add') ? 'remove' : 'add';
	if (isVisible(menu)) {
		hideAddOrRemMenu(chatroom_id, mode);
		$(`.chatroom-users[data-chatroom_id = ${chatroom_id}]`).fadeIn(500);
	}
	else {
		showAddOrRemMenu(chatroom_id, mode);
		hideAddOrRemMenu(chatroom_id, alt_mode);
		hideRenameForm(chatroom_id);
		$('.chatroom-users').hide();
	};
};

showAddOrRemMenu = (chatroom_id, mode) => {
	let [alt_mode, alt_color, color] = (mode === 'add') ? ['remove', 'red', 'blue'] : ['add', 'blue', 'red'];
	let menu = $(`#${mode}-users-${chatroom_id}`);
	let btn = $(`[data-chatroom_id = ${chatroom_id}]`).find(`.${mode}.button`);
	let alt_btn = $(`[data-chatroom_id = ${chatroom_id}]`).find(`.${mode}.button`);
	menu.fadeIn(500);
	btn.addClass(color);
	alt_btn.removeClass(alt_color);
};

hideAddOrRemMenu = (chatroom_id, mode) => {
	let menu = $(`#${mode}-users-${chatroom_id}`);
	let color = (mode === 'add') ? 'blue' : 'red';
	let btn = $(`[data-chatroom_id = ${chatroom_id}]`).find(`.${mode}.button`);
	menu.hide();
	btn.removeClass(color);
};