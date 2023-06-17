const express = require("express")
const router = express.Router()
const { body } = require("express-validator")
const { createHotel } = require("../controllers/hotelController")

/* GET hotels listing. */
router.get("/", (req, res) => {
	res.send("Ini adalah routes hotels")
})

/* POST hotels listing. */
router.post(
	"/",
	[
		body("nama")
			.exists()
			.withMessage("Nama is required")
			.trim()
			.escape()
			.withMessage("Invalid input nama"),
		body("alamat")
			.exists()
			.withMessage("Alamat is required")
			.trim()
			.escape()
			.withMessage("Invalid input alamat"),
		body("no_hp")
			.exists()
			.withMessage("No hp is required")
			.isMobilePhone()
			.withMessage("Invalid input no_hp"),
	],
	createHotel
)

module.exports = router
