# Stack Baseline

## Purpose

This reference defines the current recommended technical baseline for the Smart Parking Platform local development environment.

## Application Stack

- Architecture: modular monolith
- Frontend: React + TypeScript
- Backend: Node.js + TypeScript
- Database: PostgreSQL
- Cache or infra helper: Redis
- Local infrastructure option: Docker

## Recommended Local Tooling

- `node`
- `npm`
- `git`
- `docker`
- `docker compose`
- `psql` or a reachable PostgreSQL instance
- `redis-cli` or a reachable Redis instance

## Practical Notes

- `psql` and `redis-cli` are helpful but not strictly required if the project uses Docker for local services.
- If Docker is present, prefer containerized PostgreSQL and Redis for repeatable onboarding.
- If Node.js is present but package managers differ, document the project standard before generating setup commands.
- Treat database tools separately from management tools:
  - PostgreSQL is the database engine
  - SQL Server Management Studio is a SQL Server client tool, not a replacement for PostgreSQL

## Recommended Version Direction

Use current LTS or otherwise stable versions rather than pinning speculative exact versions inside the skill. Exact versions should live in project files such as:

- `.nvmrc`
- `package.json`
- Docker images
- setup docs

## When To Update This Reference

Update this file when:

- the project changes frontend or backend stack
- the preferred local infra strategy changes
- the team standardizes on a package manager
- the team introduces additional required services
