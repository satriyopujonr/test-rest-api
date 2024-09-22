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
3. Setup .Env nya, contoh ada di .env example
4. Jalankan migrasinya dengan command ``` pnpm run migrate ```
5. Jalankan aplikasinya dengan command ``` pnpm start:dev ```


## Endpoint
- Product
  - POST /products: Tambah produk baru
  - GET /products: Dapatkan daftar produk
  - GET /products/: Dapatkan detail produk berdasarkan ID
  - PUT /products/: Update produk berdasarkan ID
  - DELETE /products/: Hapus produk berdasarkan ID

-Order
  - POST /orders: Buat pesanan baru
  - GET /orders: Dapatkan daftar pesanan
  - GET /orders/: Dapatkan detail pesanan berdasarkan ID
  - DELETE /orders/: Hapus pesanan berdasarkan ID
