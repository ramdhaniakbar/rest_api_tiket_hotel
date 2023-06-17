"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("hotels", [
			{
				nama: "Megamendung Permai",
				alamat: "Jl. Megamendung Puncak",
				no_hp: "08534258924",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nama: "Grand Cempaka",
				alamat: "Jl. Cipayung Puncak",
				no_hp: "08329439241",
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				nama: "Seruni",
				alamat: "Jl. Tugu Puncak",
				no_hp: "085485879246",
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
		await queryInterface.bulkDelete("Hotel")
	},
}
