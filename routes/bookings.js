const express = require("express")
const router = express.Router()
const { body } = require("express-validator")

const {
	getBookingList,
	createBooking,
} = require("../controllers/bookingController")

/* GET users listing. */
router.get("/", getBookingList)

/* POST booking listing. */
router.post(
	"/",
	[
		body("kamar_id")
			.exists()
			.withMessage("Kamar id is required")
			.isInt()
			.withMessage("Invalid input kamar_id"),
		body("sales_code")
			.optional()
			.isString()
			.withMessage("Invalid input sales code "),
		body("tanggal_check_in")
			.exists()
			.withMessage("Tanggal check in is required")
			.isDate()
			.withMessage("Invalid input tanggal check in"),
		body("tanggal_check_out")
			.exists()
			.withMessage("Tanggal check out is required")
			.isDate()
			.withMessage("Invalid input tanggal check out"),
	],
	createBooking
)

module.exports = router
