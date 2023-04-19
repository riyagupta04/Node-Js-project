const connectionPool = require('../helpers/db.helper');


const saveRenter = async (body) => {
	return new Promise(async (resolve, reject) => {
		let conn;
		try {
			conn = await connectionPool.getConnection();
			const query = `INSERT INTO renters(Fname, Lname, phonenumber,city,state, is_active) VALUES(?,?,?,?,?,?)`;
			const params = [body.Fname,body.Lname, body.phonenumber,  body.city, body.state,body.is_active];
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

const getAllRenter = async () => {
	return new Promise(async (resolve, reject) => {
		let conn;
		try {
			conn = await connectionPool.getConnection();
			const query = `SELECT id,Fname,Lname, phonenumber, city, state,is_active  FROM renters`;
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

const getRenterById = (id) => {
	return new Promise(async (resolve, reject) => {
		let conn;
		try {
			conn = await connectionPool.getConnection();
			const query = `SELECT id,Fname,Lname, phonenumber,city,state, is_active FROM renters WHERE id=?`;
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

const editRenter = (body, id) => {
	return new Promise(async (resolve, reject) => {
		let conn;
		try {
			conn = await connectionPool.getConnection();
			const query = `UPDATE renters SET Fname=?,Lname=?, phonenumber=?,city=?, state=?,is_active=? WHERE id=?`;
			const params = [body.Fname,body.Lname, body.phonenumber, body.city, body.state, body.is_active, id];
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
const deleteRenter = (id) => {
	return new Promise(async (resolve, reject) => {
		let conn;
		try {
			conn = await connectionPool.getConnection();
			const query = `DELETE FROM renters WHERE id=?`;
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
	saveRenter,
	getAllRenter,
	getRenterById,
	editRenter,
	deleteRenter
	
};