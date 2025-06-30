import { ZodObject, ZodRawShape } from "zod";
import { UserRoleType } from "./role.type";
export type ActionType = "getAll" | "update" | "getOne" | "delete";

export type ValidateZodType = {
  data: any;
  userDto: ZodObject<ZodRawShape>;
  adminDto?: ZodObject<ZodRawShape>;
  managerDto?: ZodObject<ZodRawShape>;
  viewerRole?: UserRoleType;
  actionType?: ActionType;
};
