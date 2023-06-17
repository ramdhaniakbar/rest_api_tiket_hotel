const express = require("express")
const router = express.Router()
const { HotelKamar } = require("../models")

/* GET users listing. */
router.get("/", function (req, res) {
	res.send("Ini adalah routes hotel kamar")
})

/* POST hotel kamar listing. */
router.post("/", async (req, res) => {
	try {
		const { hotel_id, nama_kamar, nomor_kamar, harga, deskripsi } = req.body

		if (!hotel_id || !nama_kamar || !nomor_kamar || !harga) {
			return res.status(400).json({
				status: 400,
				message:
					"Kamu harus memasukan hotel_id, nama_kamar, nomor_kamar dan harga!",
			})
		}

		// proses create
		const hotel_kamar = await HotelKamar.create({
			hotel_id,
			nama_kamar,
			nomor_kamar,
			harga,
			deskripsi,
		})

		return res.status(201).json({
			status: 201,
			message: "Berhasil membuat data hotel kamar",
			data: hotel_kamar,
		})
	} catch (error) {
		console.error("Error occurred:", error)
		return res.status(500).json({ status: 500, error: error.message })
	}
})

module.exports = router
