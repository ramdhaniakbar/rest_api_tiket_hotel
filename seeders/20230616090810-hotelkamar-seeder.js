"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("hotel_kamar", [
			{
				hotel_id: 1,
				nama_kamar: "Bungalow",
				nomor_kamar: "30",
				harga: 750000,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				hotel_id: 1,
				nama_kamar: "Flamingo",
				nomor_kamar: "22",
				harga: 690000,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				hotel_id: 1,
				nama_kamar: "Swan",
				nomor_kamar: "27",
				harga: 800000,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				hotel_id: 2,
				nama_kamar: "Aries",
				nomor_kamar: "11",
				harga: 450000,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				hotel_id: 2,
				nama_kamar: "Libra",
				nomor_kamar: "04",
				harga: 420000,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				hotel_id: 2,
				nama_kamar: "Gemini",
				nomor_kamar: "19",
				harga: 450000,
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
	},
}
