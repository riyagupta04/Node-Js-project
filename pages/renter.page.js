const renterService = require("../services/renter.service");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '../assets/uploads'));
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
		
		cb(null, uniqueSuffix + '_' + file.originalname)
	},
	
});

const multerConfig = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {

		

	}
});

const renterFileUpload = multerConfig.single('profile_image');

const viewRenter = async(req, res) => {
	const qParams = req.query;
	const renters = await renterService.getAllRenter();
	const msgs = await req.consumeFlash('success');
	const errors = await req.consumeFlash('error');
	// if edit id true
	let renter = {};
	if(qParams.is_edit == "true"){
		
		renter = await renterService.getRenterById(qParams.edit);
		renter = renter.length > 0 ? renter[0] : {};
	}
	res.render("renters.njk", { success: msgs, renters, qParams, renter, errors });
	
}



const saveRenter = async(req, res) => {
	
	const body = req.body;
	const file = req.file;
	console.log(file, body);

	body.is_active = body.is_active === "on" ? 1 : 0;
	try {
		
		await renterService.saveRenter(body);
		await req.flash("success", "machine added successfully!");
		res.redirect("/renters");
	} catch (error) {
		// next(error);
		console.log("Error", error);
		await req.flash("error", error.message);
		res.redirect("/renters");
	}
	
}

const editRenter = async(req, res) => {
	    const param = req.params;
		const body = req.body;
		body.is_active = body.is_active === "on" ? 1 : 0;
		renterService.editRenter(body, param.id);
		await req.flash("success", "machine edited successfully!")
	    res.render('/renters');


}



const deleteRenter = async(req, res) => {
	const id = req.params.id;
	
	await renterService.deleteRenter(id);
	await req.flash("success", "machine deleted successfully!");
	res.redirect('/renters');
}



module.exports = {
	viewRenter,
	editRenter,
	saveRenter,
	deleteRenter,
	renterFileUpload
}