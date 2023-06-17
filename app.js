require("dotenv").config()
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const bookingsRouter = require("./routes/bookings")
const hotelsRouter = require("./routes/hotels")
const hotelKamarRouter = require("./routes/hotel_kamar")

const verifyToken = require("./middleware/verifyToken")

const app = express()

app.use(logger("dev"))
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: false, limit: "50mb" }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/bookings", verifyToken, bookingsRouter)
app.use("/hotels", hotelsRouter)
app.use("/hotelkamar", hotelKamarRouter)

module.exports = app
