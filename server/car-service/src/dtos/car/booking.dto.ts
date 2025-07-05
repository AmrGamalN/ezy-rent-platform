import { ObjectId } from 'mongodb';
import { z } from '@amrogamal/shared-code';

export const BookingDto = z.object({
  _id: z.instanceof(ObjectId),
  renterId: z.string(),
  ownerId: z.string(),
  carId: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  deliveryLocation: z.string(),
  returnLocation: z.string(),
  deliveryTime: z.string(),
  returnTime: z.string(),
  rentType: z
    .enum([
      'with_driver',
      'without_driver',
      'airport_delivery',
      'wedding',
      'other',
    ])
    .default('other'),
  status: z
    .enum(['pending', 'confirmed', 'cancelled', 'completed'])
    .default('pending'),
  specifiedRentType: z.string().optional(),
  insuranceType: z.enum(['basic', 'full']),
  paymentMethod: z.enum(['cash', 'card', 'wallet', 'paymob']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateBookingDto = BookingDto.omit({
  _id: true,
  renterId: true,
  ownerId: true,
  status: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  carId: z.string(),
});

export const UpdateBookingByRenterDto = CreateBookingDto.partial().omit({
  carId: true,
});
export const UpdateBookingByOwnerDto = BookingDto.pick({
  status: true,
});

export type BookingDtoType = z.infer<typeof BookingDto>;
export type CreateBookingDtoType = z.infer<typeof CreateBookingDto>;
export type UpdateBookingByRenterDtoType = z.infer<
  typeof UpdateBookingByRenterDto
>;
export type UpdateBookingByOwnerDtoType = z.infer<
  typeof UpdateBookingByOwnerDto
>;
