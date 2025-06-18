import {} from "mongoose";
import { Document } from "mongoose";

export type CarTypeFilter = {
  page: number;
  limit: number;
  name: string;
  isAvailable: boolean;
  brand: string;
  model: string;
  year: number;
  color: string;
  city: string;
  minPrice: number;
  maxPrice: number;
  availableFrom: Date;
  availableTo: Date;
};

export interface ICar extends Document {
  userId: string;
  phone: string;
  name: string;
  description: string;
  carModel: string;
  brand: string;
  year: number;
  color: string;
  images: {
    url: string;
    key: string;
  }[];
  pricePerDay: number;
  availableFrom: Date;
  availableTo: Date;
  location: {
    city: string;
    address: string;
    coordinates?: {
      lat?: number;
      lng?: number;
    };
  };
  isAvailable?: boolean;
  guarantees?: {
    hasInsurance?: boolean;
    insuranceDetails?: string;
    licenseValid?: boolean;
    requiresDeposit?: boolean;
    depositAmount?: number;
    additionalNotes?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}