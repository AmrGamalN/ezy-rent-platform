import { body, query, param, check, ValidationChain } from 'express-validator';
import { LocationType } from '../types/validation.type';
import { validateArray } from './array.valid';
import { validateBoolean } from './boolean.valid';
import { validateDate } from './date.valid';
import { validateNumber } from './number.valid';
import { validateObject } from './object.valid';
import { validateString } from './string.valid';

/**
 * Build validator
 * @param field - Field name
 * @param isOptional - Is optional
 * @param location - Location type
 * @returns ValidationChain
 */
export const buildValidator = (
  field?: string,
  isOptional?: boolean,
  location?: LocationType,
): ValidationChain => {
  let validator =
    location === 'query'
      ? query(field)
      : location === 'param'
        ? param(field)
        : location === 'check'
          ? check(field)
          : body(field);

  if (!isOptional) {
    validator = validator.notEmpty().withMessage(`${field} is required`).bail();
  } else {
    validator = validator.optional({ checkFalsy: true });
  }
  return validator;
};

export * from './string.valid';
export * from './number.valid';
export * from './date.valid';
export * from './array.valid';
export * from './boolean.valid';
export * from './object.valid';
