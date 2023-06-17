const HotelKamar = require("./HotelKamar")

module.exports = (sequelize, DataTypes) => {
	const Hotel = sequelize.define(
		"Hotel",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			nama: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			alamat: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			no_hp: {
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
			tableName: "hotels",
			timestamps: true,
		}
	)

	return Hotel
}
