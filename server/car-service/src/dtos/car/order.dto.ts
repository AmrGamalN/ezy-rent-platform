import { z } from "@amrogamal/shared-code";

export const OrderDto = z.object({
  _id: z.string(),
  userId: z.string(),
  carId: z.string(),
  transactionId: z.string().optional(),
  paymobOrderId: z.string().optional(),
  availableFrom: z.coerce.date(),
  availableTo: z.coerce.date(),
  discount: z.number().min(0),
  totalPrice: z.number().min(0),
  isPaid: z.boolean(),
  status: z
    .enum(["pending", "confirmed", "cancelled", "completed"])
    .default("pending"),
  paymentStatus: z.enum(["pending", "paid", "failed"]).default("pending"),
  paymentMethod: z.enum(["cash", "card", "wallet", "paymob"]).default("cash"),
  customer: z.object({
    name: z.string().min(1),
    phone: z.string().min(10),
    email: z.string().email(),
  }),
});

export const CreateOrderDto = OrderDto.pick({
  carId: true,
  paymentMethod: true,
});

export const UpdateOrderStatusDto = OrderDto.pick({
  status: true,
  isPaid: true,
  paymentStatus: true,
});

export type CreateOrderStatusDtoType = z.infer<typeof CreateOrderDto>;
export type UpdateOrderStatusDtoType = z.infer<typeof UpdateOrderStatusDto>;
