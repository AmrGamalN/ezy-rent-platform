import { body, ValidationChain } from 'express-validator';
import { ArrayType } from '../types/validation.type';
import { buildValidator } from './main.valid';

/**
 * Validate array
 * @param field - Field name
 * @param isOptional - Is optional
 * @param options - Options
 * @returns ValidationChain[]
 * @description
 * - Validate array length
 * - Validate array element type
 * - Validate array element in
 * - Validate array element isIn
 * - Validate array element isArray
 */
export const validateArray = ({
  field,
  isOptional,
  options,
}: ArrayType): ValidationChain[] => {
  const chains: ValidationChain[] = [];
  let main = buildValidator(field, isOptional, options?.location);
  main = main.isArray().withMessage(`${field} must be an array`).bail();

  if (options?.minLength !== undefined || options?.maxLength !== undefined) {
    main = main
      .isLength({
        min: options.minLength,
        max: options.maxLength,
      })
      .withMessage(
        `${field} must have between ${options.minLength ?? 0} and ${
          options.maxLength ?? '∞'
        } items`,
      )
      .bail();
  }

  chains.push(main);

  if (options?.elementType) {
    const element = body(`${field}.*`)
      [options.elementType === 'string' ? 'isString' : 'isNumeric']()
      .withMessage(
        options.elementMessage || `${field}.* must be ${options.elementType}`,
      );
    chains.push(element);
  }

  if (options?.isIn && options?.isIn.length > 0) {
    const inValidator = body(`${field}`)
      .custom((arr: string[]) => {
        if (!Array.isArray(arr)) return false;
        return arr.every((val: string) => options.isIn!.includes(val));
      })
      .withMessage(
        `${field} contains invalid values. Allowed: ${options.isIn.join(', ')}`,
      );
    chains.push(inValidator);
  }

  return chains;
};
