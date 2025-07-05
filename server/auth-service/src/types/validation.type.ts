export const phonePattern = /^\+[1-9]\d{10,15}$/;

export const emailPattern =
  /^[a-zA-Z0-9._-]+@(gmail|yahoo|outlook|hotmail|icloud|example)\.com$/;

export type LocationType = 'body' | 'query' | 'check' | 'param';

export type DateFieldType =
  | 'startDate'
  | 'endDate'
  | 'issuedAt'
  | 'interviewDate'
  | 'expireAt'
  | 'start'
  | 'end';

export type MainValidationType = {
  field?: string;
  isOptional?: boolean;
  location?: LocationType;
};

export type ValidationStringType = MainValidationType & {
  options?: {
    location?: LocationType;
    min?: number;
    max?: number;
    isIn?: string[] | readonly string[];
    pattern?: RegExp;
    customMessage?: string;
    isUrl?: boolean;
    isEmail?: boolean;
    isPhone?: boolean;
    isPassword?: boolean;
  };
};

export type ValidationArrayType = MainValidationType & {
  options?: {
    location?: LocationType;
    minLength?: number;
    maxLength?: number;
    elementType?: 'string' | 'number';
    elementMessage?: string;
    isIn?: string[] | readonly string[];
  };
};

export type ValidationNumberType = MainValidationType & {
  options?: {
    location?: LocationType;
    isIn?: number[] | readonly number[];
    min?: number;
    max?: number;
  };
};
