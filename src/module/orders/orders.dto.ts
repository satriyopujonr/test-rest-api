import { z } from 'zod';

// DTO untuk membuat order
export const CreateOrderDto = z.object({
  products: z.array(
    z.object({
      id: z.number().min(1, { message: 'Product ID is required.' }),
      quantity: z
        .number()
        .min(1, { message: 'Quantity must be greater than zero.' }),
    }),
  ),
});

// DTO untuk mendapatkan order
export const GetOrderDto = z.object({
  id: z.number().int().positive('ID must be a positive integer'),
});

// DTO untuk memperbarui order
export const UpdateOrderDto = z.object({
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
export type CreateOrder = z.infer<typeof CreateOrderDto>;
export type GetOrder = z.infer<typeof GetOrderDto>;
export type UpdateOrder = z.infer<typeof UpdateOrderDto>;
