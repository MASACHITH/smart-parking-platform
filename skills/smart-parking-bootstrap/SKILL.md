---
name: smart-parking-bootstrap
description: Bootstrap and validate the Smart Parking Platform local development stack. Use when setting up or checking the repo for Node.js + TypeScript backend, React + TypeScript frontend, PostgreSQL, Redis, Docker, package managers, environment prerequisites, or project initialization workflow. Also use when deciding how to structure local setup scripts, developer onboarding, or stack validation for this product.
---

# Smart Parking Bootstrap

Use this skill to set up, validate, or document the local development environment for the Smart Parking Platform. Prefer this skill when the task involves environment readiness, stack checks, bootstrap guidance, or reusable setup workflow for this repo.

## Workflow

1. Read [references/stack-baseline.md](references/stack-baseline.md) to align with the current recommended stack.
2. Run `scripts/check-stack.ps1` when the task is to inspect the local machine or validate prerequisites.
3. Use the output to identify missing tools, version mismatches, or environment risks.
4. Update repo setup docs or scripts instead of giving one-off instructions when the same work will likely recur.
5. If installation requires network access, package downloads, or privileged machine changes, request escalation before running the install command.

## What To Cover

- Node.js and package manager readiness
- React and TypeScript frontend setup assumptions
- Backend TypeScript runtime and tooling assumptions
- PostgreSQL and Redis availability
- Docker availability for local infrastructure
- Git availability
- Environment variable and local service expectations
- Repo setup guidance and onboarding consistency

## Current Product Defaults

- Architecture: modular monolith
- Frontend: React + TypeScript
- Backend: Node.js + TypeScript
- Primary database: PostgreSQL
- Cache and utility services: Redis
- API style: REST first, with WebSocket support for live updates if needed

## Usage Notes

- Keep setup guidance practical and specific to this repo.
- Prefer reusable scripts and docs over repeating shell commands in chat.
- Do not assume every machine should install everything globally if Docker or local containers are the better developer experience.
- Separate stack decisions from installation status:
  - stack decision = what the project uses
  - installation status = what this machine currently has

## Resources

### scripts/

- `check-stack.ps1`: Validate whether core local prerequisites are installed and visible on `PATH`.

### references/

- `stack-baseline.md`: Recommended stack and local environment baseline for this project.
