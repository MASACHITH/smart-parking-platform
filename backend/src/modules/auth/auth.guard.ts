import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { AuthenticatedRequest } from '../../shared/request/authenticated-request';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token.');
    }

    const accessToken = authorizationHeader.slice('Bearer '.length).trim();
    const user = this.authService.verifyToken(accessToken);
    const tenantContext = request.tenantContext;

    if (!tenantContext) {
      throw new UnauthorizedException('Tenant context is missing.');
    }

    if (tenantContext.customerId !== user.customerId) {
      throw new UnauthorizedException(
        'Token tenant does not match x-customer-id header.',
      );
    }

    request.user = user;
    return true;
  }
}
