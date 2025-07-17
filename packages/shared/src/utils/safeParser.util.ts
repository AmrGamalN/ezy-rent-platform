import { ZodObject } from 'zod';
import type { ZodRawShape } from 'zod';
import { serviceResponse } from './response.util';
import { UserRole } from '../types/role.type';
import { ValidateZodType } from '../types/validation.type';
import { ResponseOptions } from '../types/response.type';

export const safeParser = <T>({
  data,
  userDto,
  adminDto,
  managerDto,
  viewerRole,
  actionType,
}: ValidateZodType): ResponseOptions => {
  if (!data)
    return serviceResponse({
      statusText: 'NotFound',
    });

  if (Object.keys(data).length === 0)
    return serviceResponse({
      statusText: 'BadRequest',
      message: 'No data found',
      data: [],
    });

  const dto = getDataBasedOnRole(viewerRole!, userDto, adminDto, managerDto);
  if (actionType === 'getAll') {
    return safeParserMultiList<T>(data as T[], dto);
  }
  return safeParserSingleList<T>(data as T, dto);
};

const safeParserSingleList = <T>(
  data: T,
  dto: ZodObject<ZodRawShape>,
): ResponseOptions => {
  const parsed = dto.safeParse(data);
  if (!parsed.success)
    return serviceResponse({
      statusText: 'BadRequest',
      error: parsed.error,
    });
  return serviceResponse({
    statusText: 'OK',
    data: parsed.data,
  });
};

const safeParserMultiList = <T>(
  data: T[],
  dto: ZodObject<ZodRawShape>,
): ResponseOptions => {
  const parsed = data?.map((item: T) => {
    const parsedItem = dto.safeParse(item);
    if (!parsedItem.success)
      return serviceResponse({
        statusText: 'BadRequest',
        error: parsedItem.error,
      });
    return parsedItem.data;
  });
  return serviceResponse({
    statusText: 'OK',
    data: parsed,
  });
};

const getDataBasedOnRole = (
  viewerRole: UserRole,
  userDto: ZodObject<ZodRawShape>,
  adminDto?: ZodObject<ZodRawShape>,
  managerDto?: ZodObject<ZodRawShape>,
): ZodObject<ZodRawShape> => {
  if (viewerRole === 'manager' && managerDto) return managerDto;
  if (viewerRole === 'admin' && adminDto) return adminDto;
  return userDto;
};
