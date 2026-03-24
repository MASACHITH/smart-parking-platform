import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import type { NextFunction, Response } from 'express';
import { assertCustomerIdHeader, createTenantContext } from './tenant-context';
import type { AuthenticatedRequest } from '../../shared/request/authenticated-request';

@Injectable()
export class TenancyMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
    try {
      const customerId = assertCustomerIdHeader(req.headers['x-customer-id']);
      req.tenantContext = createTenantContext(customerId);
      next();
    } catch {
      next(new UnauthorizedException('Missing required x-customer-id header.'));
    }
  }
}
