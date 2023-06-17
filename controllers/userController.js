const bcrypt = require("bcryptjs")
const shortId = require("shortid")
const { validationResult } = require("express-validator")
const { User, Booking } = require("../models")
const { generateToken, decodeToken } = require("../helpers/jwtHelper")

exports.registerUser = async (req, res) => {
	try {
		const { nama, email, password, saldo, no_hp, alamat } = req.body

		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				status: "error",
				errors: errors.array(),
			})
		}

		const checkUser = await User.findOne({ where: { email: email } })

		if (checkUser) {
			return res.status(409).json({
				status: "error",
				message: "Email already exist",
			})
		}

		const passwordHash = await bcrypt.hash(password, 10)
		const uniqueId = shortId.generate().substring(0, 6).toUpperCase()

		const data = {
			nama,
			email,
			password: passwordHash,
			alamat: alamat,
			no_hp: no_hp,
			sales_code: uniqueId,
			saldo: saldo,
		}
		const user = await User.create(data)

		return res.status(201).json({
			status: "success",
			data: {
				id: user.id,
			},
		})
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		})
	}
}

exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body

		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				status: "error",
				errors: errors.array(),
			})
		}

		const user = await User.findOne({ where: { email: email } })
		if (!user) {
			return res.status(404).json({
				status: "error",
				message: "Account not found",
			})
		}

		const matchPassword = await bcrypt.compare(password, user.password)
		if (!matchPassword) {
			return res.status(404).json({
				status: "error",
				message: "User not found",
			})
		}

		const token = generateToken(user)

		return res.status(200).json({
			status: "success",
			data: {
				token,
			},
		})
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		})
	}
}

exports.getPenghasilan = async (req, res) => {
	try {
		const token = req.headers.authorization
		const decoded = decodeToken(token)

		const user = await User.findByPk(decoded.id)
		if (!user) {
			return res.status(404).json({
				status: "error",
				message: "User tidak ditemukan",
			})
		}

		if (user.sales_code !== "3T0BZS") {
			return res.status(404).json({
				status: "error",
				message: "Kamu tidak memiliki akses",
			})
		}

		const penghasilan = await Booking.sum("harga_kamar", {
			where: { sales_code: "3T0BZS" },
		})

		const data = {
			nama: user.nama,
			email: user.email,
			no_hp: user.no_hp,
			alamat: user.alamat,
			saldo: penghasilan,
		}

		res.status(200).json({
			status: "success",
			data: data,
		})
	} catch (error) {
		res.status(500).json({ message: "Internal server error" })
	}
}
