import { z } from 'zod';

// DTO untuk membuat produk
export const CreateProductDto = z.object({
  name: z.string().nonempty({ message: 'The name field is required.' }),
  price: z
    .number()
    .int()
    .positive({ message: 'The price must be a positive number.' }),
  stock: z
    .number()
    .int()
    .positive({ message: 'The stock must be a positive number.' }),
});

// DTO untuk mendapatkan produk
export const GetProductDto = z.object({
  id: z.number().int().positive('ID must be a positive integer'),
});

// DTO untuk memperbarui produk
export const UpdateProductDto = z.object({
  id: z.number().int().positive('ID must be a positive integer'),
  name: z.string().optional(),
  price: z
    .number()
    .int()
    .positive('Price must be a positive integer')
    .optional(),
  stock: z.number().int().nonnegative('Stock cannot be negative').optional(),
  sold: z.number().int().nonnegative('Sold cannot be negative').optional(),
});

// Tipe TypeScript untuk DTO
export type CreateProduct = z.infer<typeof CreateProductDto>;
export type GetProduct = z.infer<typeof GetProductDto>;
export type UpdateProduct = z.infer<typeof UpdateProductDto>;
