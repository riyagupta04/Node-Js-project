 const connectionPool = require('../helpers/db.helper');
const { hashPassword } = require('../helpers/password.helper');

const saveSignupSerivce = async (body) => {
	body.role = "student";
	let conn;
	try {
		conn = await connectionPool.getConnection();
		const query =` INSERT INTO users(first_name, last_name, username, password, role)
						VALUES(?,?,?,?,?)`;
		const hash = hashPassword(body.password);
		const params = [body.first_name, body.last_name, body.email, hash, body.role]
		const queryRows = await conn.query( query , params);
		return queryRows;
	} catch (error) {
		throw error
	} finally {
		// If connection establised thsen close connection
		if(conn) {
			return conn.end();
		}
	}

}

const findUserByEmail = async (email) => {
	return new Promise(async (resolve, reject) => {
		let conn;
		try {
			conn = await connectionPool.getConnection();
			const query = `SELECT id, username, password, role FROM users WHERE username=?`;
			const params = [email]
			conn.query( query , params).then((res) => {
				resolve(res);
			});
		} catch (error) {
			throw error
		} finally {
			// If connection establised then close connection
			if(conn) {
				return conn.end();
			}
		}
	});
}

module.exports = {
	saveSignupSerivce,
	findUserByEmail
}