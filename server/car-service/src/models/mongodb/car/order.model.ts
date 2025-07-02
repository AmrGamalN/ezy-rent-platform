import { Schema, model, Types } from "mongoose";

export interface OrderDocument {
  userId: string;
  carId: Types.ObjectId;
  availableFrom: Date;
  availableTo: Date;
  discount: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  isPaid: boolean;
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod: "cash" | "card" | "wallet";
  transactionId?: string;
  paymobOrderId?: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<OrderDocument>(
  {
    userId: { type: String, required: true },
    carId: { type: Schema.Types.ObjectId, ref: "Car", required: true },
    availableFrom: { type: Date, required: true },
    availableTo: { type: Date, required: true },
    discount: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    isPaid: { type: Boolean, default: false },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "wallet"],
      default: "cash",
    },
    transactionId: { type: String },
    paymobOrderId: { type: String },

    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export const Order = model<OrderDocument>("Order", orderSchema);
