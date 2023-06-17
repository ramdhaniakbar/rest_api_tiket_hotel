"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("hotel_kamar", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			hotel_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "hotels",
					key: "id",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
			nama_kamar: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			nomor_kamar: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			harga: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			deskripsi: {
				type: Sequelize.TEXT,
				allowNull: true,
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

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("hotel_kamar")
	},
}
