import { validateString } from '@amrogamal/shared-code';
import { ValidationChain } from 'express-validator';

const validateCategory = (isOptional: boolean = false): ValidationChain[] => [
  validateString({
    field: 'name',
    isOptional,
    options: {
      min: 1,
      max: 50,
      pattern: /^[a-z]+$/,
    },
  }),
  validateString({
    field: 'description',
    isOptional: true,
    options: { min: 1, max: 500 },
  }),
];

export const validateUpdateCategory = validateCategory(true);
export const validateCreateCategory = validateCategory(false);
