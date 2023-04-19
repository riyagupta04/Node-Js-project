const complainService = require("../services/complain.service");

const viewComplain = async(req, res) => {
	const qParams = req.query;
	const complains = await complainService.getAllComplain();
	const msgs = await req.consumeFlash('success');
	const errors = await req.consumeFlash('error');
	
	res.render("complain.njk", { success: msgs, complains, qParams, errors });
	
}



const saveComplain = async(req, res) => {
	
	const body = req.body;
	const file = req.file;
	console.log(file, body);

	body.is_active = body.is_active === "on" ? 1 : 0;
	try {
		
		await complainService.saveComplain(body);
		await req.flash("success", "complain added successfully!");
		res.redirect("/complain");
	} catch (error) {
		// next(error);
		console.log("Error", error);
		await req.flash("error", error.message);
		res.redirect("/complain");
	}
	
}





module.exports = {
	viewComplain,

	saveComplain
	
}