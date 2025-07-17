import { ValidationChain } from 'express-validator';
import { MainType } from '../types/validation.type';
import { buildValidator } from './main.valid';

/**
 * Validate boolean
 * @param field - Field name
 * @param isOptional - Is optional
 * @param location - Location type
 * @returns ValidationChain
 * @description
 * - Validate boolean is true or false
 */
export const validateBoolean = ({
  field,
  isOptional,
  location,
}: MainType): ValidationChain => {
  let validator = buildValidator(field, isOptional, location);
  validator = validator
    .trim()
    .isBoolean()
    .withMessage(`${field} must be string`)
    .bail();
  return validator;
};
