module.exports = (sequelize, DataTypes) => {
	const HotelKamar = sequelize.define(
		"HotelKamar",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			hotel_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			nama_kamar: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			nomor_kamar: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			harga: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			deskripsi: {
				type: DataTypes.TEXT,
				allowNull: true,
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
			tableName: "hotel_kamar",
			timestamps: true,
		}
	)

	return HotelKamar
}
