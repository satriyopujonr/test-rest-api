# Test REST API

## Deskripsi
Proyek ini adalah REST API sederhana yang dibuat dengan menggunakan NestJS dan Knex.js. API ini menyediakan endpoint untuk mengelola produk dan pesanan, termasuk CRUD (Create, Read, Update, Delete).

## Fitur
- Mengelola produk:
  - Menambahkan produk baru
  - Mengupdate produk
  - Menghapus produk
  - Mendapatkan daftar produk
  - Mendapatkan detail produk

- Mengelola pesanan:
  - Membuat pesanan baru
  - Mengupdate pesanan
  - Menghapus pesanan
  - Mendapatkan daftar pesanan
  - Mendapatkan detail pesanan

## Teknologi yang Digunakan
- **NestJS**: Framework untuk membangun aplikasi server-side.
- **Knex.js**: Query builder untuk SQL.
- **Zod**: Library untuk validasi data.

## Instalasi

1. Clone repositori ini:
   ```bash
   git clone https://github.com/satriyopujonr/test-rest-api

2. Buat Database di mysql
3. Setup .env nya, contoh ada di .env.example
4. Jalankan migrasinya dengan command ``` pnpm run migrate ```
5. Jalankan aplikasinya dengan command ``` pnpm start:dev ```


## Menggunakan Docker
Pastikan Anda telah menginstal Docker dan Docker Compose di mesin Anda.

- Buat Database di mysql dengan nama test-rest-api
- Setup .env nya sesuai koneksi ke mysql anda
- Jalankan perintah berikut untuk membangun dan menjalankan aplikasi:

```docker-compose up --build```

- Akses API melalui http://localhost:9000.


## Endpoint
- Product
  - POST /products: Tambah produk baru
  - GET /products: Dapatkan daftar produk
  - GET /products/: Dapatkan detail produk berdasarkan ID
  - PUT /products/: Update produk berdasarkan ID
  - DELETE /products/: Hapus produk berdasarkan ID

- Order
  - POST /orders: Buat pesanan baru
  - GET /orders: Dapatkan daftar pesanan
  - GET /orders/: Dapatkan detail pesanan berdasarkan ID
  - DELETE /orders/: Hapus pesanan berdasarkan ID
