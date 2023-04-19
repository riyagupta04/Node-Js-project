const connectionPool = require('../helpers/db.helper');


const savePayment = async (body) => {
	return new Promise(async (resolve, reject) => {
		let conn;
		try {
			conn = await connectionPool.getConnection();
			const query = `INSERT INTO payments(name, email,phone, amount) VALUES(?,?,?,?)`;
			const params = [body.name,body.email, body.phone, body.amount];
			conn.query( query , params).then((res) => {
				resolve(res);
			}).catch(error => {
				reject(error);
				
			});
		} catch (error) {
			reject(error);
		} finally {
			
			if(conn) {
				return conn.end();
			}
		}
	});
}

const getAllPayment = async () => {
	return new Promise(async (resolve, reject) => {
		let conn;
		try {
			conn = await connectionPool.getConnection();
			const query = `SELECT id,name,email, phone, amount  FROM payments`;
			const params = [];
			conn.query( query , params).then((res) => {
				resolve(res);
			});
		} catch (error) {
			reject(error);
		} finally {
			
			if(conn) {
				return conn.end();
			}
		}
	});
}

const getPaymentById = (id) => {
	return new Promise(async (resolve, reject) => {
		let conn;
		try {
			conn = await connectionPool.getConnection();
			const query = `SELECT id,name,email, phone, amount FROM payments WHERE id=?`;
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
	savePayment,
	getAllPayment,
	getPaymentById,
	
	
};