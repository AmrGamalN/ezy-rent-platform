import { body, query, param, check, ValidationChain } from 'express-validator';
import {
  emailPattern,
  LocationType,
  phonePattern,
  StringType,
} from '../types/validation.type';
import { CustomError } from '../utils/customError.util';

/**
 * Validate string
 * @param field - Field name
 * @param isOptional - Is optional
 * @param options - Options
 * @returns ValidationChain
 * @description
 * - Validate string length
 * - Validate string pattern
 * - Validate string enum
 * - Validate string url
 * - Validate string email
 * - Validate string phone number
 * - Validate string password
 * - Validate string custom
 */
export const validateString = ({
  field,
  isOptional,
  options,
}: StringType): ValidationChain => {
  let validator = buildValidator(field, isOptional, options?.location);
  validator = validator
    .trim()
    .isString()
    .withMessage(`${field} must be string`)
    .bail();

  // validate length
  if (options?.min !== undefined || options?.max !== undefined) {
    validator = validator
      .isLength({
        min: options?.min,
        max: options?.max,
      })
      .withMessage(
        `${field} must be between ${options.min ?? 0} and ${
          options.max ?? '∞'
        } characters`,
      )
      .bail();
  }

  // validate pattern
  if (options?.pattern) {
    validator = validator
      .matches(options.pattern)
      .withMessage(options.customMessage || `${field} is in invalid format`)
      .bail();
  }

  // validate enum
  if (options?.isIn && options?.isIn?.length >= 0) {
    validator = validator
      .isIn(options?.isIn)
      .withMessage(
        `${field} must be one of the following: ${options?.isIn.join(', ')}`,
      )
      .bail();
  }

  // validate url
  if (options?.isUrl) {
    validator = validator.isURL().withMessage('Invalid URL').bail();
  }

  // validate email
  if (options?.isEmail) {
    validator = validator
      .matches(emailPattern)
      .withMessage('Email provider not supported')
      .bail();
  }

  // validate phone number
  if (options?.isPhone) {
    validator = validator
      .customSanitizer((val) => val.replace(/[\s\-()]/g, ''))
      .matches(phonePattern)
      .custom((value) => {
        if (
          value === null ||
          value === undefined ||
          value === false ||
          Array.isArray(value) ||
          typeof value !== 'string' ||
          value.trim() === '' ||
          value.includes(' ') ||
          value.length !== 13
        ) {
          throw new CustomError(
            'BadRequest',
            400,
            'Invalid phone number',
            false,
          );
        }
        return true;
      })
      .bail();
  }

  // validate password
  if (options?.isPassword) {
    validator = validator
      .notEmpty()
      .withMessage('Password is required')
      .bail()
      .custom((value) => {
        if (
          value === null ||
          value === undefined ||
          value === false ||
          Array.isArray(value) ||
          typeof value !== 'string' ||
          value.trim() === '' ||
          value.includes(' ')
        ) {
          throw new Error('Invalid password value');
        }
        return true;
      })
      .bail()
      .isStrongPassword({
        minLength: 10,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        'Password must contain at least 1 lowercase, 1 uppercase, 1 number, 1 symbol, and be at least 10 characters',
      )
      .bail()
      .isLength({ min: 10, max: 30 })
      .withMessage('Password must be between 10 and 30 characters')
      .bail();
  }

  return validator;
};

const buildValidator = (
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
