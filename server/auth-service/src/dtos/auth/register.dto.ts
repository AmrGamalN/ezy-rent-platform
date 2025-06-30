import {
  SecurityAddEmailDto,
  SecurityAddPhoneDto,
} from "./../user/security.dto";

import { z } from "@amrogamal/shared-code";
import { ProfileAddDto } from "../user/profile.dto";

export const RegisterEmailDto = SecurityAddEmailDto.merge(ProfileAddDto);
export const RegisterPhoneDto = SecurityAddPhoneDto.merge(ProfileAddDto);

export type RegisterEmailDtoType = z.infer<typeof RegisterEmailDto>;
export type RegisterPhoneDtoType = z.infer<typeof RegisterPhoneDto>;
