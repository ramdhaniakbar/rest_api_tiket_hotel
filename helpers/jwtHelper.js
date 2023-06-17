const jwt = require("jsonwebtoken")
const { JWT_SECRET, JWT_TOKEN_EXPIRED } = process.env

const generateToken = (user) => {
	const payload = {
		id: user.id,
		nama: user.nama,
		email: user.email,
		sales_code: user.sales_code,
	}

	const options = {
		expiresIn: JWT_TOKEN_EXPIRED,
	}

	const token = jwt.sign(payload, JWT_SECRET, options)
	return token
}

const decodeToken = (token) => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET)
		return decoded
	} catch (error) {
		throw new Error("Invalid token")
	}
}

module.exports = {
	generateToken,
	decodeToken,
}
