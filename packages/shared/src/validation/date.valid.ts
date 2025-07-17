import { ValidationChain } from 'express-validator';
import { MainType } from '../types/validation.type';
import { CustomError } from '../utils/customError.util';
import { buildValidator } from './main.valid';

/**
 * Validate date
 * @param field - Field name
 * @param isOptional - Is optional
 * @param location - Location type
 * @returns ValidationChain
 * @description
 * - Validate date is a valid date
 * - Validate date is before or equal to end date
 * - Validate date is after or equal to start date
 */
export const validateDate = ({
  field,
  isOptional,
  location,
}: MainType): ValidationChain => {
  let validator = buildValidator(field, isOptional, location);

  validator = validator
    .isISO8601()
    .withMessage(`${field} must be a valid format YYYY-MM-DD`)
    .custom((value, { req }) => {
      const start = req.query?.start || req.body?.availableFrom;
      const end = req.query?.end || req.body?.availableTo;

      if (field === 'startDate') {
        if (value && !end) {
          throw new CustomError(
            'BadRequest',
            400,
            'If start is provided, end must also be provided',
            false,
          );
        }

        if (start && end && new Date(start) > new Date(end)) {
          throw new CustomError(
            'BadRequest',
            400,
            'Start date must be before or equal to end date',
            false,
          );
        }
      }

      if (field === 'endDate') {
        if (value && !start) {
          throw new CustomError(
            'BadRequest',
            400,
            'If end is provided, start must also be provided',
            false,
          );
        }
      }
      return true;
    })
    .toDate();
  return validator;
};
