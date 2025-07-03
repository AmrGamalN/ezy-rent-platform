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
  prefix: string;
  phone: string;
  name: string;
  description: string;
  carModel: string;
  brand: string;
  year: number;
  color: string;
  category: string;
  carImages: {
    url: string;
    key: string;
    prefix?: string;
  }[];
  price: number;
  discount: number;
  availableFrom: Date;
  availableTo: Date;
  location: {
    city: string;
    address: string;
    coordinates?: {
      lat?: String;
      lng?: String;
    };
  };
  isAvailable?: boolean;
  allowNegotiate?: boolean;
  guarantees?: {
    hasInsurance?: boolean;
    insuranceDetails?: string;
    licenseValid?: boolean;
    requiresDeposit?: boolean;
    depositAmount?: number;
    additionalNotes?: string;
  };
  isExpired: boolean;
  expired_At: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
