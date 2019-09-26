// Close flash messages when 'x' button is clicked or after 4 seconds
message_close = () => {
	$('.message .close').on('click', (event) => {
    	$(event.currentTarget).closest('.message').transition('fade');
  	});

	setTimeout(f => {
  		$('.message').fadeOut(1000);
	}, 5000)
}