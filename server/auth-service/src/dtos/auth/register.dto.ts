<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
import { z } from "common";
import { SecurityAddEmailDto, SecurityAddPhoneDto } from "../user/security.dto";
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
import { z } from "zod";
import {
  SecurityAddEmailDto,
  SecurityAddPhoneDto,
} from "../user/security.dto";
<<<<<<< Updated upstream
=======
=======
import { z } from "@amrogamal/shared-code";
import { SecurityAddEmailDto, SecurityAddPhoneDto } from "../user/security.dto";
>>>>>>> Stashed changes
>>>>>>> Stashed changes
>>>>>>> Stashed changes
import { ProfileAddDto } from "../user/profile.dto";

export const RegisterEmailDto = SecurityAddEmailDto.merge(ProfileAddDto);
export const RegisterPhoneDto = SecurityAddPhoneDto.merge(ProfileAddDto);

export type RegisterEmailDtoType = z.infer<typeof RegisterEmailDto>;
export type RegisterPhoneDtoType = z.infer<typeof RegisterPhoneDto>;