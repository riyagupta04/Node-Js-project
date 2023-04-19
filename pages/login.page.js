const { findUserByEmail } = require('../services/users.service');
const { verifyPassword } = require("../helpers/password.helper");


const loginPage = async (req, res) => {
	const errors = await req.consumeFlash('error');
	res.render('login.njk', {
		title: 'Login',
		errors
	});
}

const doUserLogin = async (req, res) => {
	const body = req.body;
	const user = await findUserByEmail(body.email);
	if(user.length == 0){
		await req.flash("error", "Invalid username or password");
		res.redirect('/login');
	}
	// verify user password
	if( verifyPassword(body.password, user[0].password) ){
		// session register
		const session = req.session;
		session.user = body.email;
		if(user.role == 1){
		res.redirect('/renters')
		
		}else{
			res.redirect('/customers')
		}
	}
	 
	else {
		await req.flash("error", "Invalid username or password");
		res.redirect('/login');
	}
}

module.exports = {
	loginPage,
	doUserLogin
}