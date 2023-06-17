const HotelKamar = require("./HotelKamar")
const User = require("./User")

module.exports = (sequelize, DataTypes) => {
	const Booking = sequelize.define(
		"Booking",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			kamar_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			harga_kamar: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			pendapatan_bersih: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			pendapatan_sales: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			sales_code: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			tanggal_check_in: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			tanggal_check_out: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			createdAt: {
				field: "created_at",
				type: DataTypes.DATE,
				allowNull: false,
			},
			updatedAt: {
				field: "updated_at",
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			tableName: "bookings",
			timestamps: true,
		}
	)

	return Booking
}
