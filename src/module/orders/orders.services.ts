import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common/base.service';
import { CreateOrder } from './orders.dto';

@Injectable()
export class OrdersService extends BaseService {
  async createOrder(createOrderDto: CreateOrder) {
    const knex = this.databaseService.getKnex();

    // Ambil semua produk berdasarkan ID yang diberikan dalam order
    const productIds = createOrderDto.products.map((product) => product.id);
    const products = await knex('products')
      .select('*')
      .whereIn('id', productIds);

    // Periksa stok untuk setiap produk
    for (const product of createOrderDto.products) {
      const foundProduct = products.find((p) => p.id === product.id);
      if (!foundProduct || foundProduct.stock < product.quantity) {
        throw new NotFoundException({ message: 'Product out of stock' });
      }
    }

    // Buat order baru
    const [orderId] = await knex('orders').insert({}).returning('id');

    const orderItems = createOrderDto.products.map((product) => ({
      order_id: orderId,
      product_id: product.id,
      quantity: product.quantity,
    }));

    // Simpan item ke order_items
    await knex('order_items').insert(orderItems);

    // Update stok di tabel products
    await Promise.all(
      orderItems.map((item) =>
        knex('products')
          .where('id', item.product_id)
          .decrement('stock', item.quantity),
      ),
    );

    // Kembalikan detail order yang baru saja dibuat
    const orderDetail = await knex('orders')
      .select('created_at', 'updated_at')
      .where('id', orderId)
      .first();

    const detailedProducts = await knex('products')
      .select(
        'id',
        'name',
        'price',
        'stock',
        'sold',
        'created_at',
        'updated_at',
      )
      .whereIn(
        'id',
        orderItems.map((item) => item.product_id),
      );

    return {
      message: 'Order created',
      data: {
        id: orderId,
        products: detailedProducts.map((product) => ({
          ...product,
          quantity: orderItems.find((item) => item.product_id === product.id)
            .quantity,
          sold: orderItems.find((item) => item.product_id === product.id)
            .quantity, // Update sold
        })),
        created_at: orderDetail.created_at,
        updated_at: orderDetail.updated_at,
      },
    };
  }

  async findAll() {
    const knex = this.databaseService.getKnex();

    // Ambil semua order dengan produk terkait
    const orders = await knex('orders')
      .select(
        'orders.id as orderId',
        'orders.created_at as orderCreatedAt',
        'orders.updated_at as orderUpdatedAt',
        'products.id as productId',
        'products.name',
        'products.price',
        'order_items.quantity',
        'products.stock',
        'products.sold',
        'products.created_at as productCreatedAt',
        'products.updated_at as productUpdatedAt',
      )
      .innerJoin('order_items', 'orders.id', 'order_items.order_id')
      .innerJoin('products', 'order_items.product_id', 'products.id');

    // Format data agar sesuai dengan respons yang diinginkan
    const formattedOrders = orders.reduce((acc, order) => {
      const existingOrder = acc.find((o) => o.id === order.orderId);
      if (existingOrder) {
        existingOrder.products.push({
          id: order.productId,
          name: order.name,
          price: order.price,
          quantity: order.quantity,
          stock: order.stock,
          sold: order.sold,
          created_at: order.productCreatedAt,
          updated_at: order.productUpdatedAt,
        });
      } else {
        acc.push({
          id: order.orderId,
          products: [
            {
              id: order.productId,
              name: order.name,
              price: order.price,
              quantity: order.quantity,
              stock: order.stock,
              sold: order.sold,
              created_at: order.productCreatedAt,
              updated_at: order.productUpdatedAt,
            },
          ],
          created_at: order.orderCreatedAt,
          updated_at: order.orderUpdatedAt,
        });
      }
      return acc;
    }, []);

    return formattedOrders;
  }

  async findOne(id: number) {
    // Ambil order berdasarkan ID
    const order = await this.databaseService
      .getKnex()
      .select('orders.created_at', 'orders.updated_at')
      .from('orders')
      .where('orders.id', id)
      .first();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Ambil detail produk berdasarkan order
    const products = await this.databaseService
      .getKnex()
      .select(
        'products.id',
        'products.name',
        'products.price',
        'order_items.quantity',
        'products.stock',
        'products.sold',
        'products.created_at',
        'products.updated_at',
      )
      .from('order_items')
      .innerJoin('products', 'order_items.product_id', 'products.id')
      .where('order_items.order_id', id);

    return {
      id: order.id,
      products,
      created_at: order.created_at,
      updated_at: order.updated_at,
    };
  }

  async deleteOrder(id: number) {
    const knex = this.databaseService.getKnex();

    // Ambil detail order sebelum dihapus
    const order = await knex('orders')
      .select('created_at', 'updated_at')
      .where('id', id)
      .first();

    // Cek jika order tidak ditemukan
    if (!order) {
      throw new NotFoundException({ message: 'Order not found' }); // Order tidak ditemukan
    }

    // Ambil detail produk dari order_items
    const products = await knex('order_items')
      .select('order_items.quantity', 'products.*')
      .innerJoin('products', 'order_items.product_id', 'products.id')
      .where('order_items.order_id', id);

    // Hapus order dan item terkait
    await knex('order_items').where('order_id', id).del();
    await knex('orders').where('id', id).del();

    // Mengupdate stok produk setelah dihapus
    await Promise.all(
      products.map((product) =>
        knex('products')
          .where('id', product.id)
          .increment('stock', product.quantity),
      ),
    );

    return {
      message: 'Order deleted successfully',
      data: {
        id,
        products: products.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          stock: product.stock + product.quantity, // Update stok
          sold: 0, // Reset sold
          created_at: product.created_at,
          updated_at: product.updated_at,
        })),
        created_at: order.created_at,
        updated_at: order.updated_at,
      },
    };
  }
}
