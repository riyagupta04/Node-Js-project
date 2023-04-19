const express = require('express');
const session = require('express-session');
const { flash } = require('express-flash-message');

const app = express();
const PORT = 3003;

app.use(
	session({
	  secret: 'ct-reports',
	  resave: true,
	  saveUninitialized: false,
	  rolling: true,
	  cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
		secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
	  },
	})
);

// apply express-flash-message middleware
app.use(flash({ sessionKeyName: 'flashMessage' }));

// configure nunjucks here
const nunjucks = require('nunjucks');
nunjucks.configure("views", {
	autoescape: true,
    express: app
});

// static file configuration
app.use(express.static('assets'));

app.use(express.urlencoded({
	extended: false
}));

const loginPage = require('./pages/login.page');
const signupPage = require('./pages/signup.page');
const dashboardPage = require("./pages/dashboard.page");

const authMiddleware = require('./middlewares/auth.middleware');     
const renterPages = require('./pages/renter.page');
const complainPages = require('./pages/complain.page');
const paymentPages = require('./pages/payment.page');


app.get('/', authMiddleware, dashboardPage.dashbaord);

// routes
app.route('/login').get( loginPage.loginPage ).post( loginPage.doUserLogin );
app.route('/signup').get( signupPage.showSignup ).post( signupPage.saveSignup );
app.route('/complain').get(complainPages.viewComplain).post(complainPages.saveComplain);
app.route('/payment').get(paymentPages.viewPayment).post(paymentPages.savePayment);


// // renters
app.route('/renters'). get(renterPages.viewRenter ).post( renterPages.saveRenter );
app.post('/renters', renterPages.renterFileUpload, renterPages.saveRenter);
app.post("/edit-renter/:id", renterPages.editRenter);
app.get("/delete-renter/:id", renterPages.deleteRenter);




app.get('/logout', (req, res) => {
	req.session.destroy((error) => {
		console.log("Session error: ", error);
	});
	res.redirect('/login');
});

app.listen(PORT, () => {
	console.log(`Server is listening at port: ${PORT}`);
});