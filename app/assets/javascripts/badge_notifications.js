// Increase badge count
increase_unread = (badge) => {
	let count = Number(badge.text());
	count += 1;
	badge.text(String(count));
	badge.css('display', 'block');
};

// Reset 'unread' badge for specific chatroom
reset_unread = (badge) => {
	// Hide and reset badge
	let count = Number(badge.text());
	badge.text(String(0));
	badge.css('display', 'none');
	// Subtract count from main badge
	let main_badge = $('#chatrooms_badge');
	let main_count = Number(main_badge.text());
	main_count -= count;
	main_badge.text(String(main_count));
	if (main_count === 0) {
		main_badge.css('display', 'none');	
	};
};

// Update database
reset_db_unread = (user_id, chatroom_id) => {
  Rails.ajax({
	  url: '/unread',
	  type: 'post',
	  data: `user_id=${user_id}&chatroom_id=${chatroom_id}`
	});
};