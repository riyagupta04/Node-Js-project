module.exports = {
	db: {
		host: 'localhost', 
		user:'root', 
		password: 'root',
		connectionLimit: 15,
		database: 'student_reports'
	},
	roles: [ 'admin', 'teacher', 'student' ],
	passConfig: {
		bytes: 16,
		iteration: 1000,
		key_length: 64,
		algo: 'aes-256-cbc',
		digest : 'SHA512'
	}
}