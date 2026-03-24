import type { Request } from 'express';
import type { AuthenticatedUser } from '../../modules/auth/auth.types';
import type { TenantContext } from '../../modules/tenancy/tenant-context';

export interface AuthenticatedRequest extends Request {
  tenantContext?: TenantContext;
  user?: AuthenticatedUser;
}
