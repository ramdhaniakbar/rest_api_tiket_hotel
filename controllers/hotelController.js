const { Hotel } = require("../models")
const { validationResult } = require("express-validator")

exports.createHotel = async (req, res) => {
	try {
		const { nama, alamat, no_hp } = req.body

		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				status: "error",
				errors: errors.array(),
			})
		}

		const data = {
			nama,
			alamat,
			no_hp,
		}

		const hotel = await Hotel.create(data)
		return res.status(201).json({
			status: "success",
			message: "Berhasil membuat data hotel",
			data: hotel,
		})
	} catch (error) {
		return res.status(500).json({ status: "error", error: error.message })
	}
}
