import { ValidationChain } from 'express-validator';
import { NumberType } from '../types/validation.type';
import { buildValidator } from './main.valid';

/**
 * Validate number
 * @param field - Field name
 * @param isOptional - Is optional
 * @param options - Options
 * @returns ValidationChain
 * @description
 * - Validate number is a number
 * - Validate number is in range
 */
export const validateNumber = ({
  field,
  isOptional,
  options,
}: NumberType): ValidationChain => {
  let validator = buildValidator(field, isOptional, options?.location);
  validator = validator
    .trim()
    .isNumeric()
    .withMessage(`${field} must be number`)
    .bail()
    .toInt();

  if (options?.isIn && options?.isIn?.length >= 0) {
    validator = validator
      .isIn(options?.isIn)
      .withMessage(
        `${field} must be one of the following: ${options?.isIn.join(', ')}`,
      )
      .bail();
  }
  return validator;
};
