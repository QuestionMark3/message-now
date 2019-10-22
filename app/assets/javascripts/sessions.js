// Workaround for Semantic-UI bug #6637
responsive = () => {
	$(window).resize(function(){
		if ($(window).width() <= 767) {
	 		$('#divider').hide();
	 		$('#horizontal-divider').show();
	 	}
	 	else {
	 		$('#divider').show();
	 		$('#horizontal-divider').hide();
	 	};
	});
 };