const express = require("express")
const router = express.Router()
const { body } = require("express-validator")
const {
	registerUser,
	loginUser,
	getPenghasilan,
} = require("../controllers/userController")
const verifyToken = require("../middleware/verifyToken")

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("Ini adalah routes users")
})

/* POST users register listing. */
router.post(
	"/register",
	[
		body("nama")
			.exists()
			.withMessage("Nama is required")
			.trim()
			.escape()
			.withMessage("Invalid input nama"),
		body("email")
			.exists()
			.withMessage("Email is required")
			.isEmail()
			.normalizeEmail()
			.withMessage("Invalid input email"),
		body("password")
			.exists()
			.withMessage("Password is required")
			.trim()
			.escape()
			.isLength({ min: 6 })
			.withMessage("Invalid input password"),
		body("no_hp")
			.optional()
			.custom((value, { req }) => {
				if (value === "" || value === null) {
					return true
				}
				return /^\d{10}$/.test(value)
			})
			.withMessage("Invalid input no_hp"),
		body("saldo").optional().isInt().withMessage("Invalid input saldo"),
		body("alamat").optional().isString().withMessage("Invalid input alamat"),
	],
	registerUser
)

/* POST users login listing. */
router.post(
	"/login",
	[
		body("email")
			.exists()
			.withMessage("Email is required")
			.isEmail()
			.normalizeEmail()
			.withMessage("Invalid input email"),
		body("password")
			.exists()
			.withMessage("Password is required")
			.trim()
			.escape()
			.isLength({ min: 6 })
			.withMessage("Invalid input password"),
	],
	loginUser
)

/* GET users login listing. */
router.get("/penghasilan", verifyToken, getPenghasilan)

module.exports = router
