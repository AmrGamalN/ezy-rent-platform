import { ObjectId } from "mongodb";
import { z } from "@amrogamal/shared-code";


const imageSchema = z.object({
  url: z.string().url(),
  key: z.string(),
});

const coordinatesSchema = z.object({
  lat: z.number().optional(),
  lng: z.number().optional(),
});

const guaranteesSchema = z.object({
  hasInsurance: z.boolean().default(false),
  insuranceDetails: z.string().optional(),
  licenseValid: z.boolean().default(false),
  requiresDeposit: z.boolean().default(false),
  depositAmount: z.number().default(0),
  additionalNotes: z.string().optional(),
});

export const CarDto = z.object({
  _id: z.instanceof(ObjectId),
  userId: z.string(),
  phone: z.string(),
  name: z.string(),
  description: z.string(),
  carModel: z.string(),
  brand: z.string(),
  year: z.number(),
  color: z.string(),
  images: z.array(imageSchema),
  pricePerDay: z.number(),
  availableFrom: z.coerce.date(),
  availableTo: z.coerce.date(),
  location: z.object({
    city: z.string(),
    address: z.string(),
    coordinates: coordinatesSchema.optional(),
  }),
  isAvailable: z.boolean().optional(),
  guarantees: guaranteesSchema.optional(),
});

export const AddCarDto = CarDto.omit({
  _id: true,
  userId: true,
});

export const UpdateCarDto = CarDto.omit({ _id: true, userId: true }).partial();

export type CarDtoType = z.infer<typeof CarDto>;
export type AddCarDtoType = z.infer<typeof AddCarDto>;
export type UpdateCarDtoType = z.infer<typeof UpdateCarDto>;
