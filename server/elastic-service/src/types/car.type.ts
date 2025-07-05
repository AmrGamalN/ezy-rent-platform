<<<<<<< HEAD
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

=======
>>>>>>> 663f8f9 (fix(payment): fix missing/incorrect TypeScript types)
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
<<<<<<< HEAD
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
=======
    prefix?: string;
>>>>>>> 663f8f9 (fix(payment): fix missing/incorrect TypeScript types)
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
<<<<<<< HEAD
  isExpired?: boolean;
  expired_At?: Date;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
=======
  isExpired: boolean;
  expired_At: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateCar = {
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
  isExpired: boolean;
  expired_At: Date;
};

export type SearchCar = {
  name: string;
  brand: string;
  carModel: string;
  category: string;
  color: string;
  city: string;
  year: number;
  minPrice: number;
  maxPrice: number;
  isAvailable: boolean;
  allowNegotiate: boolean;
  availableFrom: Date;
  availableTo: Date;
>>>>>>> 663f8f9 (fix(payment): fix missing/incorrect TypeScript types)
};
