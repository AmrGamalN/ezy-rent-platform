<<<<<<< Updated upstream
import { z } from "zod";
=======
<<<<<<< Updated upstream
import { z } from "common";
=======
<<<<<<< Updated upstream
import { z } from "zod";
=======
import { z } from "@amrogamal/shared-code";
>>>>>>> Stashed changes
>>>>>>> Stashed changes
>>>>>>> Stashed changes
export const ProfileDto = z.object({
  userId: z.string().min(1),
  username: z.string().min(1),
  avatar: z.object({
    url: z.string().optional(),
    key: z.string().optional(),
  }),
});

export const ProfileAddDto = ProfileDto.pick({
  username: true,
});

export const ProfileUpdateDto = ProfileDto.pick({
  username: true,
  avatar: true,
});

export type ProfileDtoType = z.infer<typeof ProfileDto>;
export type ProfileAddDtoType = z.infer<typeof ProfileAddDto>;
export type ProfileUpdateDtoType = z.infer<typeof ProfileUpdateDto>;