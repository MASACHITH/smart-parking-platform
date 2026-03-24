import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  });

  it('creates an access token for a valid seeded user', () => {
    const result = service.login({
      customerId: 'tenant-acme',
      email: 'admin@acmeparking.test',
      password: 'ChangeMe123!',
    });

    expect(result.accessToken).toContain('.');
    expect(result.user.customerId).toBe('tenant-acme');
  });

  it('rejects invalid credentials', () => {
    expect(() =>
      service.login({
        customerId: 'tenant-acme',
        email: 'admin@acmeparking.test',
        password: 'bad-password',
      }),
    ).toThrow(UnauthorizedException);
  });

  it('verifies a signed token and returns the authenticated user', () => {
    const { accessToken } = service.login({
      customerId: 'tenant-skyline',
      email: 'ops@skylineparking.test',
      password: 'ChangeMe123!',
    });

    const user = service.verifyToken(accessToken);

    expect(user.customerId).toBe('tenant-skyline');
    expect(user.roleCodes).toContain('operator');
  });
});
