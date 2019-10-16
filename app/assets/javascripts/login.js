// Login/Signup equal column heights
equal_height = () => {
	let loginheight = $('#loginform').height();
	let button = $('#signupbtn').children();
	let btnheight = (loginheight - button.innerHeight())/2;
	button.css('margin-top',btnheight);
	$('#signupbtn').height(loginheight);
};

// Login/Signup page opacity changes
form_opacity = () => {
	let login = $('#loginform')
	let signup = $('#signupbtn')

	signup.on('mouseenter', (event) => {
		$(event.currentTarget).fadeTo(400, 1);
		login.fadeTo(400, 0.5);
	});
	signup.on('mouseleave', (event) => {
		$(event.currentTarget).fadeTo(400, 0.5);
		login.fadeTo(400, 1);
	});
}