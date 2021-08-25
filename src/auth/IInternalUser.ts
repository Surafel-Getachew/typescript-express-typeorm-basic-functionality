import { UserRole } from "../enums/user.role";

export interface IInternalUser {
  id: string;
  name?: string;
  organization: string;
  role: UserRole;
}
