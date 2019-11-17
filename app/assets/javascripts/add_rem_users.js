addUsers = (chatroom_id, added_user_ids, chatroom_user_ids, chatroom, chatroom_options, messages) => {
	let current_usr_id = Number($('#hidden-user-id').data('user_id'));
	showMenu(chatroom_id);
	if ($.inArray(current_usr_id, added_user_ids) >= 0) {
		newChatroom(chatroom_id, chatroom_user_ids, chatroom, chatroom_options);
		let message_container = $(`.message-container[data-chatroom_id=${chatroom_id}]`);
		message_container.append(messages);
		messageStyle(message_container);
		return;
	};
	added_user_ids.forEach(user_id => {
		appendUser(chatroom_id, user_id);
	});
};

removeUsers = (chatroom_id, user_ids) => {
	let current_usr_id = Number($('#hidden-user-id').data('user_id'));
	showMenu(chatroom_id);
	user_ids.forEach(user_id => {
		leave(chatroom_id, user_id);
	});
	if ($.inArray(current_usr_id, user_ids) >= 0) {
		remove(chatroom_id);
	};
};

appendUser = (chatroom_id, user_id) => {
	let user_list = $(`.chatroom-users[data-chatroom_id = ${chatroom_id}]`).children('.list');
	let list_item_HTML = `<h2 class="item header" data-user_id="${user_id}">${idToUsername(user_id)}</h2>`;
	let rem_cards = $(`#remove-users-${chatroom_id}>.cards`);
	let add_card = $(`#add-users-${chatroom_id}>.cards>[data-user-id = ${user_id}]`).removeAttr('style');
	let card_HTML = add_card[0].outerHTML;
	user_list.append(list_item_HTML);
	rem_cards.append(card_HTML);
	add_card.remove();
	addCheckbox('remove', chatroom_id, removeCheckbox('add', chatroom_id, user_id));
	checkbox('remove', rem_cards.find(`[data-user-id = ${user_id}]>.content`));
	btnIfCheck('remove', chatroom_id, user_id);
};

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

btnIfCheck = (mode, chatroom_id='', user_id='') => {
	let card = $(`.${mode}>.cards>.user.card`);
	card = (chatroom_id === '') ? card : $(`#${mode}-users-${chatroom_id}`).find(card);
	card = (user_id === '') ? card : card.filter(`[data-user-id = ${user_id}]`);
	$(card.children('.content')).click(event => {
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