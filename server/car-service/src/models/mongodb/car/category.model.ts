import { Schema, model, Document } from "mongoose";

export interface CategoryDocument extends Document {
  name: string;
  description?: string;
  categoryImage?: {
    url: string;
    key: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema: Schema = new Schema<CategoryDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    categoryImage: {
      url: { type: String },
      key: { type: String },
      _id: false,
    },
  },
  { timestamps: true }
);

export const Category = model<CategoryDocument>("Category", categorySchema);
