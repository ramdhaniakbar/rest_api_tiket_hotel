const { validationResult } = require("express-validator")
const { Hotel, HotelKamar } = require("../models")

exports.createHotelKamar = async (req, res) => {
	try {
		const { hotel_id, nama_kamar, nomor_kamar, harga, deskripsi } = req.body

		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				status: "error",
				errors: errors.array(),
			})
		}

		const hotel = await Hotel.findByPk(hotel_id)

		console.log(hotel)

		if (!hotel) {
			return res.status(404).json({
				status: "error",
				message: "Hotel tidak ditemukan dengan id " + hotel_id,
			})
		}

		const data = { hotel_id, nama_kamar, nomor_kamar, harga, deskripsi }

		const hotel_kamar = await HotelKamar.create(data)

		return res.status(201).json({
			status: "success",
			message: "Berhasil membuat data kamar hotel",
			data: hotel_kamar,
		})
	} catch (error) {
		return res.status(500).json({ status: "error", error: error.message })
	}
}
