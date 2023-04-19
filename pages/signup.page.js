const usersService = require('../services/users.service');

const showSignup = async (req, res) => {
	const errors = await req.consumeFlash('error');
	res.render("signup.njk", { title : "Signup" });
};

const saveSignup = async (req, res) => {
	try {
		const user = await usersService.findUserByEmail(req.body.email);
		if (user.length > 0) {
			await req.flash("error", "Username already taken");
		} else {
			await usersService.saveSignupSerivce(req.body);
		}
		return res.redirect('/signup');
	} catch (error) {
		res.end(error);
	}
}

module.exports = {
	showSignup,
	saveSignup
}