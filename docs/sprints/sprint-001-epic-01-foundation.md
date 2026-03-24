# Sprint 001: EPIC-01 Foundation Slice

Status: Completed for current slice

## Sprint Goal

Deliver the first working backend slice for EPIC-01 with tenant-aware authentication and a protected tenant-scoped endpoint.

## Stories

- SP-001: As a platform operator, I need the backend application scaffold so foundation work can start in code.
- SP-002: As a tenant-scoped user, I need requests to require `x-customer-id` so customer context is explicit.
- SP-003: As an authenticated user, I need a signed access token so protected endpoints can validate identity.
- SP-004: As the platform team, I need tenant mismatch protection so one customer cannot use another customer's token.
- SP-005: As a delivery team, I need automated tests for the first auth and tenancy slice so regressions are caught early.

## Acceptance Checks

- [x] Login returns an access token for a known seeded tenant user.
- [x] Protected endpoints reject requests without `x-customer-id`.
- [x] Protected endpoints reject requests without bearer authentication.
- [x] Protected endpoints reject token and tenant header mismatch.
- [x] Protected endpoints return tenant-scoped data for valid requests.

## Bug Log

- BUG-001: Jest worker processes fail with `spawn EPERM` in the current environment. Fix: run Jest with `--runInBand` for this repo.
- BUG-002: E2E tests failed because the `supertest` import style did not match the current Jest/TypeScript runtime. Fix: use namespace import syntax.

## Next Likely Stories

- SP-006: Add Prisma service and real database-backed identity store.
- SP-007: Add role-based authorization checks.
- SP-008: Add tenant provisioning endpoints and tests.
