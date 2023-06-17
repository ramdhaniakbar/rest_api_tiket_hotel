"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("users", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			nama: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			no_hp: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			alamat: {
				type: Sequelize.TEXT,
				allowNull: true,
			},
			sales_code: {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
			},
			saldo: {
				type: Sequelize.INTEGER,
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

		await queryInterface.addConstraint("users", {
			type: "unique",
			fields: ["email"],
			name: "UNIQUE_USERS_EMAIL",
		})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("users")
	},
}
