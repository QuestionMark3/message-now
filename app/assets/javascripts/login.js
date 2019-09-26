// Login/Signup equal column heights
equal_height = () => {
	var loginheight = $('#loginform').height();
	var button = $('#signupbtn').children();
	var btnheight = (loginheight - button.innerHeight())/2;
	button.css('margin-top',btnheight);
	$('#signupbtn').height(loginheight);
};

// Login/Signup page opacity changes
form_opacity = () => {
	var login = $('#loginform')
	var signup = $('#signupbtn')

	signup.on('mouseenter', (event) => {
		$(event.currentTarget).fadeTo(400, 1);
		login.fadeTo(400, 0.5);
	});
	signup.on('mouseleave', (event) => {
		$(event.currentTarget).fadeTo(400, 0.5);
		login.fadeTo(400, 1);
	});
}