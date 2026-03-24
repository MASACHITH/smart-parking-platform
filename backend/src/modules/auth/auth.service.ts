import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';
import {
  AuthenticatedUser,
  AuthTokenPayload,
  LoginRequest,
} from './auth.types';

interface SeedUserRecord extends AuthenticatedUser {
  password: string;
}

@Injectable()
export class AuthService {
  private readonly signingSecret = 'dev-smart-parking-secret';

  private readonly users: SeedUserRecord[] = [
    {
      userId: 'user-platform-admin',
      customerId: 'tenant-acme',
      email: 'admin@acmeparking.test',
      roleCodes: ['platform_admin'],
      password: 'ChangeMe123!',
    },
    {
      userId: 'user-ops-01',
      customerId: 'tenant-skyline',
      email: 'ops@skylineparking.test',
      roleCodes: ['operator'],
      password: 'ChangeMe123!',
    },
  ];

  login(request: LoginRequest): { accessToken: string; user: AuthenticatedUser } {
    const user = this.users.find(
      (candidate) =>
        candidate.customerId === request.customerId &&
        candidate.email === request.email &&
        candidate.password === request.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const authenticatedUser: AuthenticatedUser = {
      userId: user.userId,
      customerId: user.customerId,
      email: user.email,
      roleCodes: user.roleCodes,
    };

    return {
      accessToken: this.signToken(authenticatedUser),
      user: authenticatedUser,
    };
  }

  verifyToken(accessToken: string): AuthenticatedUser {
    const [encodedPayload, signature] = accessToken.split('.');

    if (!encodedPayload || !signature) {
      throw new UnauthorizedException('Invalid access token format.');
    }

    const expectedSignature = this.createSignature(encodedPayload);
    const validSignature = timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    );

    if (!validSignature) {
      throw new UnauthorizedException('Invalid access token signature.');
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8'),
    ) as AuthTokenPayload;

    if (payload.exp <= Date.now()) {
      throw new UnauthorizedException('Access token has expired.');
    }

    return {
      userId: payload.userId,
      customerId: payload.customerId,
      email: payload.email,
      roleCodes: payload.roleCodes,
    };
  }

  private signToken(user: AuthenticatedUser): string {
    const payload: AuthTokenPayload = {
      ...user,
      exp: Date.now() + 60 * 60 * 1000,
    };
    const encodedPayload = Buffer.from(
      JSON.stringify(payload),
      'utf8',
    ).toString('base64url');

    return `${encodedPayload}.${this.createSignature(encodedPayload)}`;
  }

  private createSignature(encodedPayload: string): string {
    return createHmac('sha256', this.signingSecret)
      .update(encodedPayload)
      .digest('base64url');
  }
}
