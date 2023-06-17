<h2>Aplikasi REST API Booking Tiket Kamar Hotel</h2>
Aplikasi ini adalah sebuah REST API yang digunakan untuk melakukan booking tiket kamar hotel. Dibangun dengan menggunakan framework Express.js sebagai server, Sequelize ORM sebagai Object-Relational Mapping untuk mengakses database, dan PostgreSQL sebagai database utama.

<h3>Fitur Utama</h3>
<ul>
  <li>Manajemen pengguna (registrasi, login)</li>
  <li>Manajemen pemesanan (buat pesanan, lihat list pesanan)</li>
  <li>Authentication dan Authorization menggunakan JSON Web Token (JWT)</li>
</ul>

<h3>Cara installasi</h3>
<ol type="1">
  <li>Clone repositori ini ke dalam direktori lokal: <br /> <strong>git clone https://github.com/ramdhaniakbar/rest_api_tiket_hotel.git</strong></li>
  <li>Masuk ke project: <br /> <strong>rest_api_tiket_hotel</strong></li>
  <li>Instal dependensi dengan menjalankan perintah berikut: <br /> <strong>npm install</strong></li>
  <li>Jalankan migrasi database untuk membuat tabel-tabel yang diperlukan: <br /> <strong>npx sequelize db:migrate</strong></li>
  <li>Jalankan run seeder untuk membuat dummy data yang diperlukan: <br /> <strong>npx sequelize db:seed:all</strong></li>
  <li>Jalankan aplikasi dengan perintah berikut:
: <br /> <strong>npm start</strong></li>
</ol>
