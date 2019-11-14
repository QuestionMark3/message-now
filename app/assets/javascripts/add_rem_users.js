addOrRemListener = (mode, chatroom_id='') => {
	parent = (chatroom_id === '') ? '' : `[data-chatroom_id = ${chatroom_id}]`;
	$(`${parent} .${mode}.button`).click((event) => {
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

addRemSubmit = mode => {
	btn = (mode == 'add') ? $('.positive.confirm') : $('.negative.confirm');
	btn.click(event => {
		let chatroom_id = $(event.target).attr('id').split('-')[2];
		let hidden_btn = $(`.${mode}-action #room-form-${chatroom_id}`);
		$(hidden_btn).click();
	});
};

btnIfCheck = (mode, chatroom_id='') => {
	let card = $(`.${mode}>.cards>.user.card>.content`);
	card = (chatroom_id === '') ? card : $(`#${mode}-users-${chatroom_id}`).find(card);
	$(card).click(event => {
		let ancestor = $(event.target).closest(`.${mode}.chatroom-options`)
		let chatroom_id = ancestor.attr('id').split('-')[2];
		let form = $(`#${mode}-form-${chatroom_id}`);
		let confirm = $(`#${mode}-confirm-${chatroom_id}`);
		confirm.toggle(anyChecks(form));
	});
};

anyChecks = (form) => {
	let checks = (form.find('.checkbox:checked').length === 0) ? false : true;
	return checks;
};

showAddOrRemMenu = (chatroom_id, mode) => {
	let [alt_mode, alt_color, color] = (mode === 'add') ? ['remove', 'red', 'blue'] : ['add', 'blue', 'red'];
	let menu = $(`#${mode}-users-${chatroom_id}`);
	let btn = $(`[data-chatroom_id = ${chatroom_id}]`).find(`.${mode}.button`);
	let alt_btn = $(`[data-chatroom_id = ${chatroom_id}]`).find(`.${mode}.button`);
	let form = $(`#${mode}-form-${chatroom_id}`);
	let confirm = $(`#${mode}-confirm-${chatroom_id}`);
	menu.fadeIn(500);
	btn.addClass(color);
	alt_btn.removeClass(alt_color);
	confirm.toggle(anyChecks(form));
};

hideAddOrRemMenu = (chatroom_id, mode) => {
	let menu = $(`#${mode}-users-${chatroom_id}`);
	let color = (mode === 'add') ? 'blue' : 'red';
	let btn = $(`[data-chatroom_id = ${chatroom_id}]`).find(`.${mode}.button`);
	let confirm = $(`#${mode}-confirm-${chatroom_id}`);
	menu.hide();
	confirm.hide();
	btn.removeClass(color);
};