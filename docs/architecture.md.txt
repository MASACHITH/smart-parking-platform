Smart Parking Platform Architecture

Document Date: 2026-03-17
Status: Draft

1. Purpose

This document defines the proposed solution architecture for the Smart Parking Platform based on the approved business requirements, version 1 scope, and stack direction.

2. Architecture Summary

Recommended architecture for version 1:

- Modular monolith
- React + TypeScript frontend
- Node.js + TypeScript backend
- PostgreSQL primary database
- Redis for cache and operational support
- REST APIs for core application interactions
- WebSocket support for live operational updates where needed
- Modular integration layer for devices and external services

This approach is recommended because it is easier to build, test, maintain, and scale gradually while staying friendly to AI-assisted development.

3. Architectural Principles

- Keep one deployable backend application for version 1
- Separate business domains into clear internal modules
- Use configuration and licensing instead of customer-specific code forks
- Keep hardware integrations behind adapters or connectors
- Preserve strict tenant isolation
- Design for offline-capable site operations
- Allow future extraction of modules into services if scale requires it

4. High-Level Component View

Main components:

- Web application
- Backend application
- PostgreSQL database
- Redis cache and operational support
- External integrations
- Site devices

5. Mermaid Diagram: High-Level System

```mermaid
flowchart LR
    U[Platform Users and Customer Users] --> FE[React Web Application]
    FE --> API[Node.js TypeScript Backend]
    API --> DB[(PostgreSQL)]
    API --> REDIS[(Redis)]
    API --> PAY[Payment Gateway]
    API --> MSG[SMS and Email Providers]
    API --> DEV[Device Integration Layer]
    DEV --> CAM[ANPR and Overview Cameras]
    DEV --> BAR[Barrier and Access Control]
    DEV --> PRN[Ticket Printers and Scanners]
```

6. Frontend Architecture

Version 1 frontend approach:

- Single React web application
- TypeScript for type safety
- Role-based screens and navigation
- Shared app for:
  - Platform admin
  - Customer admin
  - Entry operators
  - Exit or cashier operators
  - Supervisors
  - Security users
- Responsive design to support desk and operational device usage

Frontend responsibilities:

- Authentication and session handling
- Configuration and administration screens
- Entry and exit operational screens
- Dashboard and reporting screens
- Device and integration monitoring views

7. Backend Architecture

Version 1 backend approach:

- Single Node.js + TypeScript backend application
- Modular monolith with clear domain boundaries
- REST API as the primary interface
- Background processing for async workflows
- Optional WebSocket channel for live dashboards and gate activity

Suggested internal modules:

- Identity and access
- Tenant and licensing
- Customer configuration
- Site and zone management
- Parking sessions
- Entry processing
- Exit processing
- Tariffs and billing
- Payments
- Subscriptions and permits
- Device integrations
- Notifications
- Reporting
- Audit
- Offline sync

8. Mermaid Diagram: Modular Monolith

```mermaid
flowchart TB
    API[Backend API Layer]
    API --> IAM[Identity and Access Module]
    API --> TEN[Tenant and Licensing Module]
    API --> CFG[Configuration Module]
    API --> SITE[Site and Zone Module]
    API --> PARK[Parking Session Module]
    API --> BILL[Tariff and Billing Module]
    API --> PAY[Payment Module]
    API --> SUB[Subscription Module]
    API --> DEV[Device Integration Module]
    API --> NOTI[Notification Module]
    API --> REP[Reporting Module]
    API --> AUDIT[Audit Module]
    API --> OFF[Offline Sync Module]
```

9. Data Architecture

Primary system of record:

- PostgreSQL

Why PostgreSQL:

- strong fit for Node.js and TypeScript ecosystem
- well suited for multi-tenant transactional systems
- flexible enough for structured data plus configurable metadata
- cost-effective compared with licensed enterprise databases

Likely core data domains:

- Tenants
- Licenses
- Users
- Roles and permissions
- Sites
- Zones
- Devices
- Parking sessions
- Vehicle captures
- Plate reads
- AI detections
- Tariffs
- Payments
- Subscriptions
- Notifications
- Audit logs
- Sync jobs and sync events

Redis use cases:

- cache hot operational lookups
- short-lived workflow state
- rate limiting
- background job coordination
- websocket presence or pub-sub support
- temporary site sync support where appropriate

10. Mermaid Diagram: Data and Integration Flow

```mermaid
flowchart LR
    CAM[Camera Event] --> DEV[Device Module]
    DEV --> PARK[Parking Session Module]
    PARK --> DB[(PostgreSQL)]
    PARK --> BILL[Billing Module]
    BILL --> PAY[Payment Module]
    PAY --> DB
    PARK --> REDIS[(Redis)]
    PAY --> PG[Payment Gateway]
    PARK --> NOTI[Notification Module]
    NOTI --> SMS[SMS Provider]
    NOTI --> EMAIL[Email Provider]
```

11. Integration Architecture

Version 1 priority integrations:

- Payment gateway
- SMS provider
- Email provider
- ANPR and overview cameras
- Basic barrier or access control

Integration design principles:

- Use adapters for each device or provider type
- Keep provider-specific logic outside core business modules
- Normalize device events before business processing
- Record integration failures for operational visibility

Suggested integration categories:

- Payment adapters
- Messaging adapters
- Camera adapters
- Barrier adapters
- Scanner and printer adapters

12. Offline Architecture

Operational requirement:

- Entry and exit must continue during temporary internet outages

Recommended version 1 strategy:

- maintain a site-operational mode for essential flows
- store operational records locally at the site runtime boundary
- queue sync tasks for later upload
- reconcile back to the central platform when connectivity returns

Offline-capable functions in version 1:

- vehicle entry
- vehicle exit
- session lookup
- barrier control

Open design note:

- exact local storage strategy still needs a deeper technical decision:
  - browser local storage is not enough for robust site operations
  - a local agent, edge service, or site-side runtime may be needed later

13. Security Architecture

Security requirements:

- strict tenant data isolation
- role-based access control
- auditable sensitive actions
- protected administrative boundaries

Recommended security controls:

- JWT-based authenticated sessions or equivalent token strategy
- backend authorization checks on every protected action
- tenant scoping enforced in service and data access layers
- audit logs for configuration, payments, and overrides
- secrets stored outside source control

14. Deployment Architecture

Version 1 deployment should support:

- SaaS deployment
- On-premise deployment

Recommended deployment shape:

- one frontend deployment
- one backend deployment
- one PostgreSQL database per environment
- one Redis instance per environment
- separate configuration by environment

15. Mermaid Diagram: Deployment View

```mermaid
flowchart TB
    subgraph Client Environment
        USER[Web Users]
        BROWSER[Browser]
        USER --> BROWSER
    end

    subgraph Application Environment
        FE[Frontend App]
        BE[Backend App]
        REDIS[(Redis)]
        DB[(PostgreSQL)]
        FE --> BE
        BE --> REDIS
        BE --> DB
    end

    subgraph External Services
        PAY[Payment Gateway]
        MSG[SMS and Email Services]
        DEV[Devices and Gate Systems]
    end

    BE --> PAY
    BE --> MSG
    BE --> DEV
    BROWSER --> FE
```

16. Recommended Version 1 Technology Direction

- Frontend: React + TypeScript
- Backend: Node.js + TypeScript
- Database: PostgreSQL
- Cache and support services: Redis
- Architecture style: modular monolith
- API style: REST first
- Live updates: WebSockets where required

17. Key Risks

- offline architecture needs careful technical design
- hardware vendors may vary significantly
- tariff complexity can create high testing load
- modular boundaries must stay clean to avoid monolith sprawl

18. Open Questions

- package manager standard: npm, pnpm, or yarn
- backend framework choice inside Node.js
- frontend state management approach
- ORM choice
- background job framework choice
- exact site offline runtime approach
- Docker-first or direct local installation for PostgreSQL and Redis

19. Recommendation

Proceed with a modular monolith on Node.js + TypeScript and React + TypeScript, backed by PostgreSQL and Redis. Keep the design integration-friendly and configuration-driven from the start, and defer microservice extraction until real scale or operational boundaries justify it.
