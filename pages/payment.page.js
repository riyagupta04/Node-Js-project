const paymentService = require("../services/payment.service");


const viewPayment = async(req, res) => {
	const qParams = req.query;
	const payments = await paymentService.getAllPayment();
	const msgs = await req.consumeFlash('success');
	const errors = await req.consumeFlash('error');
	
	res.render("payment.njk", { success: msgs, payments, qParams, errors });
	
}

const savePayment = async(req, res) => {
	
	const body = req.body;
	const file = req.file;
	console.log(file, body);

	body.is_active = body.is_active === "on" ? 1 : 0;
	try {
		
		await paymentService.savePayment(body);
		await req.flash("success", "payment  successfully!");
		res.redirect("/payment");
	} catch (error) {
		// next(error);
		console.log("Error", error);
		await req.flash("error", error.message);
		res.redirect("/payment");
	}
	
}





module.exports = {
	viewPayment,
	
	savePayment
	
}