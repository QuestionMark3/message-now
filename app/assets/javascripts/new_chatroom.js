// Create new chatroom
newChatroom = (chatroom_id, user_ids, chatroom, chatroom_options) => {
	let current_usr_id = Number($('#hidden-user-id').data('user_id'));
	if (user_ids.includes(current_usr_id)) {

    // Append chatroom button to chatrooms list
    let chat_list = $('#chatrooms>.ui.cards');
    chat_list.append(chatroom);

    // Append message container to main content
    let clss = 'class="ui large feed message-container"';
    let dta = `data-chatroom_id="${chatroom_id}"`;
    $('#messages').append(`<div ${clss} ${dta}></div>`);

    // Append chatroom options container to vertical menu
    let actions = $('#actions');
    actions.before(chatroom_options);
    let chat_options = $(`.chatroom-users[data-chatroom_id = ${chatroom_id}]`);
    let user_list_item = chat_options.find(`.list>.item[data-user_id = ${current_usr_id}]`);
    let user_card = $(`#remove-users-${chatroom_id}>.cards>[data-user-id = ${current_usr_id}]`);
    user_list_item.remove();
    user_card.remove();

    // Add event listeners
    removeListener($(`[data-chatroom_id = ${chatroom_id}]`).find('.delete'));
    renameListener();
    submitRename();
    addOrRemListener('add', chatroom_id);
    addOrRemListener('remove', chatroom_id);
    checkbox('add', $(`#add-users-${chatroom_id} .ui.cards>.card>.content`));
    checkbox('remove', $(`#remove-users-${chatroom_id} .ui.cards>.card>.content`));
    btnIfCheck('add', chatroom_id);
    btnIfCheck('remove', chatroom_id);
    addRemSubmit('add');
    addRemSubmit('remove');

    // Reset checkboxes and empty forms for renaming chatrooms
    emptyChatroomNames();
    uncheckAll();

    // Create subscription
    chat_subscribe( $('.message-container').last() );

    // Make chatroom button clickable
    let chat_btn = chat_list.children().last();
    chatroom_btns(chat_btn);
    $('#view').click();

    // Enable dropdown
    chat_list.find('.ui.dropdown').dropdown();

    // Increase chatroom count
    let chat_length = $('.profile .statistic>.value').eq(0);
    chat_length.text(Number(chat_length.text()) + 1);

    // Auto-scroll
    scroll_bottom(true, $('#chatrooms'));
  };
};

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
			//Uncheck all checkboxes
			uncheckAll();
		};
	});
};