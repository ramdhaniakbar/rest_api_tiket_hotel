const Booking = require("./Booking")

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
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
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			no_hp: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			alamat: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			sales_code: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			saldo: {
				type: DataTypes.INTEGER,
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
			tableName: "users",
			timestamps: true,
		}
	)

	return User
}
