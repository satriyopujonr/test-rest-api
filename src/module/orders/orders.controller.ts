import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.services';
import { z } from 'zod';
import { CreateOrder } from './orders.dto';

// Definisikan skema Zod untuk validasi
const orderSchema = z.object({
  products: z.array(
    z.object({
      id: z.number().min(1, { message: 'Product ID is required.' }),
      quantity: z
        .number()
        .min(1, { message: 'Quantity must be greater than zero.' }),
    }),
  ),
});

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrder) {
    // Periksa apakah DTO kosong
    if (!createOrderDto || Object.keys(createOrderDto).length === 0) {
      throw new HttpException(
        {
          message: 'Product not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      // Validasi DTO menggunakan Zod
      const validatedData = orderSchema.parse(createOrderDto);

      // Simpan order ke database
      const results = await this.ordersService.createOrder(validatedData);

      // Ubah status code menjadi 200
      return {
        message: 'Order created',
        data: results,
      };
    } catch (error) {
      if (error.message === 'Product out of stock') {
        throw new HttpException(
          {
            message: 'Product out of stock',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce(
          (acc, curr) => {
            const path = curr.path[0];
            acc[path] = acc[path] || [];
            acc[path].push(curr.message);
            return acc;
          },
          {} as Record<string, string[]>,
        );

        throw new HttpException(
          {
            message: 'Validation failed',
            errors: formattedErrors,
          },
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      throw error; // Jika bukan ZodError, lempar kembali error
    }
  }

  @Get()
  async getOrders() {
    const orders = await this.ordersService.findAll();
    return {
      message: 'Order List',
      data: orders,
    };
  }

  @Get(':id') // Endpoint to get order by ID
  async getOrderById(@Param('id') id: string) {
    const order = await this.ordersService.findOne(Number(id));
    if (!order) {
      throw new HttpException(
        { message: 'Order not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      message: 'Order details',
      data: order,
    };
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return await this.ordersService.deleteOrder(Number(id));
  }
}
