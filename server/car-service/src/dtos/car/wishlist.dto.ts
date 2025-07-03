import { ObjectId } from "mongodb";
import { z } from "@amrogamal/shared-code";
export const WishlistDto = z.object({
  _id: z.instanceof(ObjectId),
  userId: z.string(),
  carId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateWishlistDto = z.object({
  carId: z.string(),
});

export const RemoveWishlistDto = z.object({
  userId: z.string(),
  carId: z.string(),
});

export type CreateWishlistDtoType = z.infer<typeof CreateWishlistDto>;
export type RemoveWishlistDtoType = z.infer<typeof RemoveWishlistDto>;
