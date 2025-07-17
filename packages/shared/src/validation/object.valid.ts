import { body, ValidationChain } from 'express-validator';
import { MainType } from '../types/validation.type';

/**
 * Validate object
 * @param field - Field name
 * @param isOptional - Is optional
 * @returns ValidationChain
 * @description
 * - Validate object is an object
 * - Validate object is not empty
 */
export const validateObject = ({
  field,
  isOptional,
}: MainType): ValidationChain => {
  const validator = body(field)
    .isObject()
    .withMessage(`${field} must be an object`);
  return !isOptional
    ? validator.notEmpty().withMessage(`${field} is required`)
    : validator.optional({ checkFalsy: true });
};
