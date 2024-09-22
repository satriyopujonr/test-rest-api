import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.services';
import { CreateProduct, UpdateProductDto } from './products.dto';
import { z } from 'zod';

// Definisikan skema Zod untuk validasi
const productSchema = z.object({
  name: z.string().nonempty({ message: 'The name field is required.' }),
  price: z.number().min(1, { message: 'The price field is required.' }),
  stock: z.number().min(0, { message: 'The stock field is required.' }),
});

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProduct) {
    // Periksa apakah DTO kosong
    if (!createProductDto || Object.keys(createProductDto).length === 0) {
      throw new HttpException(
        {
          message: 'Validation failed',
          errors: {
            name: ['The name field is required.'],
            price: ['The price field is required.'],
            stock: ['The stock field is required.'],
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY, // Mengubah ke 422
      );
    }

    try {
      // Validasi DTO menggunakan Zod
      const validatedData = productSchema.parse(createProductDto);

      // Simpan produk ke database
      const results = await this.productsService.createProduct(validatedData);

      return results;
    } catch (error) {
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
  async getProducts() {
    const products = await this.productsService.findAll();
    return {
      message: 'Product List',
      data: products,
    };
  }

  @Get(':id') // Endpoint to get product by ID
  async getProductById(@Param('id') id: string) {
    const product = await this.productsService.findOne(Number(id));
    if (!product) {
      throw new HttpException(
        { message: 'Product not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return {
      message: 'Product details',
      data: product,
    };
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() productData: any) {
    const parseResult = UpdateProductDto.safeParse({
      id: Number(id),
      ...productData,
    });
    if (!parseResult.success) {
      throw new BadRequestException(parseResult.error.errors);
    }

    return await this.productsService.updateProduct(parseResult.data);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(Number(id));
  }
}
