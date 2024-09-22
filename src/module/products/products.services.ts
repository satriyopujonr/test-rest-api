import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduct } from './products.dto';
import { BaseService } from 'src/common/base.service';

@Injectable()
export class ProductsService extends BaseService {
  async createProduct(createProductDto: CreateProduct) {
    const knex = this.databaseService.getKnex();

    // Simpan produk ke database
    const [id] = await knex('products')
      .insert({
        ...createProductDto,
      })
      .returning('id');

    const product = await knex('products').where('id', id).first();

    return {
      message: 'Product created successfully',
      data: product,
    };
  }

  async findAll() {
    // Mengambil semua produk dari tabel 'products'
    const products = await this.getKnex().table('products').select('*');
    return products;
  }

  async findOne(id: number) {
    const product = await this.getKnex()
      .table('products')
      .where({ id })
      .first(); // Mengambil satu produk berdasarkan ID
    return product; // Jika tidak ditemukan, akan mengembalikan undefined
  }

  async updateProduct(productData: any) {
    const knex = this.databaseService.getKnex();

    // Melakukan update berdasarkan ID
    const result = await knex('products')
      .where('id', productData.id)
      .update({
        ...productData,
        updated_at: new Date(), // Memperbarui kolom updated_at
      });

    // Jika tidak ada baris yang diupdate, berarti produk tidak ditemukan
    if (result === 0) {
      throw new NotFoundException({
        message: 'Product not found',
      });
    }

    // Mengambil data produk yang telah diperbarui
    const product = await knex('products').where('id', productData.id).first();

    return {
      message: 'Product updated successfully',
      data: product,
    };
  }

  async deleteProduct(id: number) {
    const knex = this.databaseService.getKnex();

    // Mencari produk sebelum dihapus
    const product = await knex('products').where('id', id).first();

    // Jika produk tidak ditemukan, lempar NotFoundException
    if (!product) {
      throw new NotFoundException({
        message: 'Product not found', // Pesan jika produk tidak ditemukan
      });
    }

    // Menghapus produk
    await knex('products').where('id', id).del();

    return {
      message: 'Product deleted successfully',
      data: product, // Mengembalikan data produk yang dihapus
    };
  }
}
