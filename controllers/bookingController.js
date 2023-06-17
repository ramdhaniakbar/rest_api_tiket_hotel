const { validationResult } = require("express-validator")
const { User, HotelKamar, Booking, Hotel } = require("../models")
const moment = require("moment/moment")
const { decodeToken } = require("../helpers/jwtHelper")

exports.getBookingList = async (req, res) => {
	try {
		const bookings = await Booking.findAll({
			attributes: { exclude: ["createdAt", "updatedAt"] },
			include: [
				{
					model: HotelKamar,
					as: "detail_kamar",
					attributes: { exclude: ["createdAt", "updatedAt"] },
					include: {
						model: Hotel,
						as: "detail_hotel",
						attributes: { exclude: ["createdAt", "updatedAt"] },
					},
				},
				{
					model: User,
					as: "detail_user",
					attributes: { exclude: ["password", "createdAt", "updatedAt"] },
				},
			],
		})

		return res.status(200).json({
			status: "success",
			message: "Berhasil mendapatkan data booking list",
			data: bookings,
		})
	} catch (error) {
		return res.status(500).json({ status: "error", error: error.message })
	}
}

exports.createBooking = async (req, res) => {
	try {
		const { kamar_id, sales_code, tanggal_check_in, tanggal_check_out } = req.body

		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			return res.status(400).json({
				status: "error",
				errors: errors.array(),
			})
		}

		const token = req.headers.authorization
		const decoded = decodeToken(token)

		const user = await User.findByPk(decoded.id)
		const hotelKamar = await HotelKamar.findByPk(kamar_id)

		if (!user) {
			return res.status(404).json({
				status: "error",
				message: "User tidak ditemukan",
			})
		}

		if (!hotelKamar) {
			return res.status(404).json({
				status: "error",
				message: "Hotel kamar tidak ditemukan dengan id " + kamar_id,
			})
		}

		if (sales_code && sales_code === user.sales_code) {
			return res.status(400).json({
				status: "error",
				message: "Sales code tidak valid",
			})
		}

		const today = moment().startOf("day")
		const checkInDate = moment(tanggal_check_in, "YYYY-MM-DD").startOf("day")
		const checkOutDate = moment(tanggal_check_out, "YYYY-MM-DD").startOf("day")

		if (!checkInDate.isSameOrAfter(today)) {
			return res.status(400).json({
				status: 400,
				message:
					"Tanggal check-in harus dimulai pada tanggal hari ini ataupun tanggal kedepannya",
			})
		}

		if (!checkOutDate.isAfter(checkInDate)) {
			return res.status(400).json({
				status: 400,
				message: "Tanggal check-out harus lebih besar dari tanggal check-in",
			})
		}

		const checkIn = moment(tanggal_check_in)
		const checkOut = moment(tanggal_check_out)
		const durasi = checkOut.diff(checkIn, "days")

		const harga_kamar = hotelKamar.harga * durasi

		if (user.saldo < harga_kamar) {
			return res.status(400).json({
				status: 400,
				message: "User saldo tidak cukup untuk memboking",
			})
		}

		const pakAmir = await User.findOne({ where: { nama: "Pak Amir" } })

		if (
			sales_code &&
			sales_code !== user.sales_code &&
			sales_code !== pakAmir.sales_code
		) {
			const komisi_sales = harga_kamar * 0.2
			const pendapatan_bersih = harga_kamar - komisi_sales

			const sales = await User.findOne({ where: { sales_code: sales_code } })

			if (!sales) {
				return res.status(400).json({
					status: "error",
					message: "Sales code tidak ditemukan",
				})
			}

			const data = {
				user_id: user.id,
				kamar_id: kamar_id,
				harga_kamar: harga_kamar,
				sales_code: sales_code,
				pendapatan_bersih: pendapatan_bersih,
				pendapatan_sales: komisi_sales,
				tanggal_check_in: tanggal_check_in,
				tanggal_check_out: tanggal_check_out,
			}

			const booking = await Booking.create(data)

			pakAmir.saldo += pendapatan_bersih
			await pakAmir.save()

			sales.saldo += komisi_sales
			await sales.save()

			user.saldo -= harga_kamar
			await user.save()

			return res.status(201).json({
				status: "success",
				data: booking,
			})
		} else if (!sales_code) {
			const pendapatan_bersih = harga_kamar
			const pendapatan_sales = 0

			const data = {
				user_id: user.id,
				kamar_id: kamar_id,
				harga_kamar: harga_kamar,
				sales_code: "",
				pendapatan_bersih: pendapatan_bersih,
				pendapatan_sales: pendapatan_sales,
				tanggal_check_in: tanggal_check_in,
				tanggal_check_out: tanggal_check_out,
			}

			const booking = await Booking.create(data)

			pakAmir.saldo += pendapatan_bersih
			await pakAmir.save()

			user.saldo -= harga_kamar
			await user.save()

			return res.status(201).json({
				status: "success",
				data: booking,
			})
		} else {
			const pendapatan_bersih = harga_kamar
			const pendapatan_sales = 0

			const sales = await User.findOne({ where: { sales_code: sales_code } })

			if (!sales) {
				return res.status(400).json({
					status: "error",
					message: "Sales code tidak ditemukan",
				})
			}

			const data = {
				user_id: user.id,
				kamar_id: kamar_id,
				harga_kamar: harga_kamar,
				sales_code: sales_code,
				pendapatan_bersih: pendapatan_bersih,
				pendapatan_sales: pendapatan_sales,
				tanggal_check_in: tanggal_check_in,
				tanggal_check_out: tanggal_check_out,
			}

			const booking = await Booking.create(data)

			sales.saldo += pendapatan_bersih
			await sales.save()

			user.saldo -= harga_kamar
			await user.save()

			return res.status(201).json({
				status: "success",
				data: booking,
			})
		}
	} catch (error) {
		return res.status(500).json({ status: "error", error: error.message })
	}
}
