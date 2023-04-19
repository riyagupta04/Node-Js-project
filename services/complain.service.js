const connectionPool = require('../helpers/db.helper');


const saveComplain = async (body) => {
	return new Promise(async (resolve, reject) => {
		let conn;
		try {
			conn = await connectionPool.getConnection();
			const query = `INSERT INTO complains(name, email,complain) VALUES(?,?,?)`;
			const params = [body.name,body.email, body.complain];
			conn.query( query , params).then((res) => {
				resolve(res);
			}).catch(error => {
				reject(error);
				
			});
		} catch (error) {
			reject(error);
		} finally {
			// If connection establised then close connection
			if(conn) {
				return conn.end();
			}
		}
	});
}

const getAllComplain = async () => {
	return new Promise(async (resolve, reject) => {
		let conn;
		try {
			conn = await connectionPool.getConnection();
			const query = `SELECT id,name,email, complain  FROM complains`;
			const params = [];
			conn.query( query , params).then((res) => {
				resolve(res);
			});
		} catch (error) {
			reject(error);
		} finally {
			// If connection establised then close connection
			if(conn) {
				return conn.end();
			}
		}
	});
}

const getComplainById = (id) => {
	return new Promise(async (resolve, reject) => {
		let conn;
		try {
			conn = await connectionPool.getConnection();
			const query = `SELECT id,name,email, complain FROM complains WHERE id=?`;
			const params = [id];
			conn.query( query , params).then((res) => {
				resolve(res);
			});
		} catch (error) {
			reject(error);
		} finally {
			// If connection establised then close connection
			if(conn) {
				return conn.end();
			}
		}
	});
}


module.exports = {
	saveComplain,
	getAllComplain,
	getComplainById,
	
	
};