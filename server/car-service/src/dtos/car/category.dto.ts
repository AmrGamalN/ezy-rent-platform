import { ObjectId } from 'mongodb';
import { z } from '@amrogamal/shared-code';
export const CreateCategoryDto = z.object({
  _id: z.instanceof(ObjectId),
  name: z.string().min(2).max(50),
  description: z.string().optional(),
  categoryImage: z
    .object({
      url: z.string().url(),
      key: z.string(),
    })
    .optional(),
  key: z.string().optional(),
});

export const UpdateCategoryDto = CreateCategoryDto.partial();
export type CreateCategoryDtoType = z.infer<typeof CreateCategoryDto>;
export type UpdateCategoryDtoType = z.infer<typeof UpdateCategoryDto>;
