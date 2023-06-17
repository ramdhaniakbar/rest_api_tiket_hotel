const express = require("express")
const router = express.Router()
const { Hotel } = require("../models")

/* GET hotels listing. */
router.get("/", (req, res) => {
	res.send("Ini adalah routes hotels")
})

/* POST hotels listing. */
router.post("/", async (req, res) => {
	try {
		const { nama, alamat, no_hp } = req.body

		if (!nama || !alamat || !no_hp) {
			return res.status(400).json({
				status: 400,
				message: "Kamu harus memasukan nama, alamat dan no_hp!",
			})
		}

		// proses create
		const hotel = await Hotel.create({
			nama,
			alamat,
			no_hp,
		})

		return res.status(201).json({
			status: 201,
			message: "Berhasil membuat data hotel",
			data: hotel,
		})
	} catch (error) {
		console.error("Error occurred:", error)
		return res.status(500).json({ status: 500, error: error.message })
	}
})

module.exports = router
