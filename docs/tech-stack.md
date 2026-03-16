# Smart Parking Platform Tech Stack

## Purpose

This document records the recommended technology stack for version 1 of the Smart Parking Platform.

## Confirmed Core Decisions

- Architecture: modular monolith
- Frontend: React + TypeScript
- Backend: Node.js + TypeScript
- Database: PostgreSQL
- Cache and operational support: Redis

## Recommended Version 1 Stack

### Frontend

- React
- TypeScript
- Vite for frontend build tooling
- React Router for routing
- TanStack Query for server state
- Tailwind CSS for UI styling
- React Hook Form for forms
- Zod for validation

### Backend

- Node.js
- TypeScript
- NestJS for modular backend structure
- REST API for core platform endpoints
- WebSocket support for real-time operational updates where needed
- Prisma as ORM and schema tooling
- BullMQ for background jobs

### Data and Infrastructure

- PostgreSQL as primary relational database
- Redis for caching, queueing, and transient operational state
- Docker for local infrastructure and consistent setup

### Auth and Security

- JWT-based authentication
- Role-based access control
- Audit logging for sensitive actions

### Reporting and Files

- PDF export support
- Excel export support
- Object/file storage to be chosen later if image storage grows

### Testing

- Vitest for frontend unit tests
- Jest for backend unit and integration tests
- Playwright for end-to-end testing

## Why This Stack

- fast for version 1 delivery
- strong fit for AI-assisted development
- consistent TypeScript across frontend and backend
- good ecosystem for dashboards, APIs, queues, and integrations
- easy to structure as a modular monolith

## Open Technical Choices

- package manager standard
- object storage approach
- deployment platform
- observability stack
- exact Docker composition for local development

## Recommendation

Adopt this stack as the default technical baseline unless a later enterprise or infrastructure requirement forces a change.

