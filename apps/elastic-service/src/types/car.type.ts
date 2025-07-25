export type SearchCar = {
  name: string;
  isAvailable: boolean;
  allowNegotiate: boolean;
  brand: string;
  carModel: string;
  year: number;
  color: string;
  city: string;
  minPrice: number;
  maxPrice: number;
  availableFrom: Date;
  availableTo: Date;
  category: string;
};

export type CreateCar = {
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
  }[];
  price: number;
  discount: number;
  availableFrom: Date;
  availableTo: Date;
  location: {
    city: string;
    address: string;
    coordinates: {
      lat?: string;
      lng?: string;
    };
  };
  isAvailable: boolean;
  allowNegotiate: boolean;
  guarantees: {
    hasInsurance?: boolean;
    insuranceDetails?: string;
    licenseValid?: boolean;
    requiresDeposit?: boolean;
    depositAmount?: number;
    additionalNotes?: string;
  };
  isExpired?: boolean;
  expired_At?: Date;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type UpdateCar = {
  userId: string;
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
  }[];
  price: number;
  discount: number;
  availableFrom: Date;
  availableTo: Date;
  location: {
    city: string;
    address: string;
    coordinates?: {
      lat?: string;
      lng?: string;
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
  isExpired?: boolean;
  expired_At?: Date;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
