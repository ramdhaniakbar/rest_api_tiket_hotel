"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("bookings", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "users",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			kamar_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "hotel_kamar",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			harga_kamar: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			pendapatan_bersih: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			pendapatan_sales: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			sales_code: {
				type: Sequelize.STRING,
				allowNull: true,
				defaultValue: "",
			},
			tanggal_check_in: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			tanggal_check_out: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("bookings")
	},
}
