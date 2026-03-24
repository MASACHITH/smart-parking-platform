# Smart Parking Platform Memory

Last updated: 2026-03-24

## Purpose

This file is a lightweight running memory for previous chats, current project state, and the next recommended step. Update it after meaningful planning or implementation work so future sessions can recover context quickly.

## Previous Chat Context

- The project goal is a configurable, multi-tenant smart parking platform for multiple customer types.
- The platform should support both SaaS and on-premise deployment models.
- Strict tenant isolation is required across sites, users, vehicles, reports, and configuration.
- Platform admins manage tenant creation, licensed modules, and global settings.
- Customer admins manage their own sites, users, roles, tariffs, reports, and allowed configuration.

## Confirmed Product Requirements

- Vehicle entry and exit management
- Ticket or parking session creation
- Optional ANPR / number plate recognition
- Optional vehicle photo capture
- Optional AI vehicle color detection
- Optional AI vehicle type detection
- Configurable exit matching and mismatch handling
- Flexible tariffs and billing rules
- Configurable payment methods
- Multi-site and multi-zone support
- White-label and customer-level configuration
- Hardware integrations such as cameras, barriers, printers, scanners, kiosks, and POS
- Offline-capable site operations with sync after reconnect

## Current Repo State

- Foundation documentation is present.
- Agent workflow documentation is present.
- Epic planning documentation exists in `docs/epics.md`.
- Requirements memory exists in `docs/requirements-memory.md`.
- `backend/` now contains the first implementation scaffold for EPIC-01.
- `frontend/` is present but still empty.
- Implementation has started in the backend foundation layer, but business features are not built yet.

## Process Status

Current phase: EPIC-01 foundation slice 1 complete, ready for slice 2.

What is complete:

- Product vision and scope documents
- Configuration model
- Architecture and workflow guidance
- Agent role files
- Epic list
- Requirements memory

What is not complete:

- Detailed implementation of Epic-001 / platform foundation in code
- Frontend scaffolding
- QA pass on working software

## Next Recommended Step

Start implementation for the first foundation epic:

- Scaffold backend service structure
- Define multi-tenant database/auth foundation
- Add initial tests and development scripts
- Create the first working code slice instead of adding more planning-only documents

## Update Log

### 2026-03-20

- Reviewed project status from repo files.
- Confirmed the project is still in planning/foundation, not implementation.
- Created this `docs/memory.md` file so future chats can quickly recover prior context.
- Started EPIC-01 implementation with an initial backend scaffold.
- Added `backend/package.json`, TypeScript config, NestJS app entry, core module boundaries, and an initial Prisma schema.
- Set the first implementation focus to tenant foundation, auth foundation, users, sites, and zones.

### 2026-03-24

- Switched to an agile develop-test-fix loop for EPIC-01.
- Added Sprint 001 tracking in `docs/sprints/sprint-001-epic-01-foundation.md`.
- Implemented a first working auth and tenancy slice in the backend using seeded users, signed tokens, tenant middleware, and a protected sites endpoint.
- Added unit and e2e tests for login, tenant header enforcement, and token/header tenant mismatch protection.
- Installed backend dependencies and verified TypeScript linting passes.
- Found and recorded BUG-001: Jest worker processes fail with `spawn EPERM` here, so test scripts were updated to run in-band.
- Unit tests pass for `AuthService`.
- Found and recorded BUG-002: e2e tests initially failed due to `supertest` import style mismatch; fix applied.
- E2E tests now pass for health, login, tenant header enforcement, and tenant mismatch protection.
- Backend build passes for the current EPIC-01 slice.
- Current slice complete. Next recommended stories are Prisma-backed identity, role authorization, and tenant provisioning APIs.
