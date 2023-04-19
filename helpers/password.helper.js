const { randomBytes, pbkdf2Sync } = require('crypto');
const { passConfig } = require('../config');

const hashPassword = (payload) => {
	// console.log("payload: ", payload);
	const salt = randomBytes(passConfig.bytes).toString('hex');
	const hash = pbkdf2Sync(payload, salt, passConfig.iteration, passConfig.key_length, passConfig.digest).toString('hex');
	// console.log(salt, hash);
	const data = `${salt}:${hash}`;
	return Buffer.from(data).toString('base64');
}

const verifyPassword = (password, hash) => {
	const data = Buffer.from(hash, 'base64').toString('ascii');
	const [salt, hashPassword] = data.split(':');
	const newHash = pbkdf2Sync(password, salt, passConfig.iteration, passConfig.key_length, passConfig.digest).toString('hex');
	return newHash === hashPassword;
}

module.exports = {
	hashPassword,
	verifyPassword
}