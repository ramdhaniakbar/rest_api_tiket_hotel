"use strict"
const bcrypt = require("bcryptjs")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("users", [
			{
				nama: "Pak Amir",
				email: "amir@gmail.com",
				password: await bcrypt.hash("123456", 10),
				no_hp: "08379825322",
				alamat: "Jl. Sentul",
				sales_code: "3T0BZS",
				saldo: 0,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nama: "Ramdhani Akbar",
				email: "ramdhaniakbar@gmail.com",
				password: await bcrypt.hash("123456", 10),
				no_hp: "083811655736",
				alamat: "Jl. Megamendung Puncak",
				sales_code: "Y09TFP",
				saldo: 4500000,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nama: "John Doe",
				email: "john@gmail.com",
				password: await bcrypt.hash("123456", 10),
				no_hp: "08532849648",
				alamat: "Jl. Tajur Bogor",
				sales_code: "MAV9WW",
				saldo: 5024259,
				created_at: new Date(),
				updated_at: new Date(),
			},
		])
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("User")
	},
}
