import { validateString, validateBoolean } from '@amrogamal/shared-code';
import { ValidationChain } from 'express-validator';

export const validateCreateOrder = (): ValidationChain[] => [
  validateString({
    field: 'paymentMethod',
    isOptional: false,
    options: {
      isIn: ['cash', 'card', 'wallet', 'paymob'],
    },
  }),
];

export const validateUpdateOrder = (): ValidationChain[] => [
  validateString({
    field: 'status',
    isOptional: true,
    options: {
      isIn: ['pending', 'confirmed', 'cancelled', 'completed'],
    },
  }),
  validateString({
    field: 'paymentStatus',
    isOptional: true,
    options: {
      isIn: ['pending', 'paid', 'failed'],
    },
  }),
  validateBoolean({
    field: 'isPaid',
    isOptional: true,
  }),
];
