import type { ZodObject, ZodRawShape } from 'zod';
import { UserRole } from './role.type';
export const phonePattern = /^\+[1-9]\d{10,13}$/;
export type ActionType = 'getAll' | 'update' | 'getOne' | 'delete';
export type LocationType = 'body' | 'query' | 'check' | 'param';
export const emailPattern =
  /^[a-zA-Z0-9._-]+@(gmail|yahoo|outlook|hotmail|icloud)\.com$/;

export type ValidateZodType = {
  data: unknown;
  userDto: ZodObject<ZodRawShape>;
  adminDto?: ZodObject<ZodRawShape>;
  managerDto?: ZodObject<ZodRawShape>;
  viewerRole?: UserRole;
  actionType?: ActionType;
};

export type DateType =
  | 'startDate'
  | 'endDate'
  | 'issuedAt'
  | 'interviewDate'
  | 'expireAt'
  | 'start'
  | 'end';

export type MainType = {
  field?: string;
  isOptional?: boolean;
  location?: LocationType;
};

export type StringType = MainType & {
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

export type ArrayType = MainType & {
  options?: {
    location?: LocationType;
    minLength?: number;
    maxLength?: number;
    elementType?: 'string' | 'number';
    elementMessage?: string;
    isIn?: string[] | readonly string[];
  };
};

export type NumberType = MainType & {
  options?: {
    location?: LocationType;
    isIn?: number[] | readonly number[];
    min?: number;
    max?: number;
    isYear?: boolean;
  };
};
