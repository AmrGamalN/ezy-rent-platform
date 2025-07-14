import { Schema, model, Document } from 'mongoose';

export interface WishlistDocument extends Document {
  userId: string;
  carId: string;
  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema: Schema = new Schema<WishlistDocument>(
  {
    userId: { type: String, required: true },
    carId: { type: String, required: true },
  },
  { timestamps: true },
);

wishlistSchema.index({ userId: 1, carId: 1 }, { unique: true });
export const Wishlist = model<WishlistDocument>('car_Wishlist', wishlistSchema);
