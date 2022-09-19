import { SetMetadata } from '@nestjs/common';
import { UserRole } from './role.enum';
export const ROLES_KEY = 'roles';
export const RolesGuard = (...roles: UserRole[]) =>
  SetMetadata(ROLES_KEY, roles);
