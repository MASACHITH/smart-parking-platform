# Smart Parking Platform

**A modern, configurable parking ticketing system built for multi-customer deployment.**

## Vision

Build a **reusable SaaS parking platform** that can be sold to different customers with minimal customization. Each customer configures the system to their needs without code changes.

### Core Capabilities

- ✅ Vehicle entry and exit management
- ✅ Digital ticketing with unique IDs
- ✅ Number plate verification and capture
- ✅ Vehicle photo capture
- ✅ AI-based vehicle color and type detection
- ✅ Configurable billing (hourly, flat-rate, subscriptions)
- ✅ Multi-site and multi-gate support
- ✅ Role-based access control
- ✅ Audit logging and reporting

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Docker (optional)
- Python 3.10+ (for AI service)

### Project Structure

```
smart-parking-platform/
├── docs/                      # Documentation
│   ├── product-vision.md      # What we're building
│   ├── scope-v1.md            # What's in V1
│   ├── config-model.md        # What customers can configure
│   ├── architecture.md        # System design
│   ├── database-design.md     # Schema (TBD)
│   ├── api-design.md          # API contracts (TBD)
│   ├── epics.md               # Feature epics (TBD)
│   ├── user-stories.md        # User stories (TBD)
│   └── acceptance-criteria.md # Test criteria (TBD)
│
├── agents/                    # Agent instructions for Codex
│   ├── ba-agent.md            # Business analyst agent
│   ├── developer-agent.md     # Tech lead / architect agent
│   ├── qa-agent.md            # QA strategist agent
│   └── project-orchestrator.md # Project coordination agent
│
├── skills/                    # Reusable Codex skills
│   ├── design-db.md           # Database design skill
│   ├── design-api.md          # API design skill
│   └── create-test-cases.md   # Test case creation skill
│
├── backend/                   # Backend service (TBD)
│   ├── src/
│   ├── tests/
│   └── package.json
│
├── frontend/                  # Operator UI (TBD)
│   ├── src/
│   ├── public/
│   └── package.json
│
├── ai-services/               # AI vehicle analysis (TBD)
│   ├── src/
│   └── requirements.txt
│
├── infra/                     # Infrastructure & deployment
│   ├── docker/
│   ├── k8s/
│   └── terraform/
│
├── tests/                     # Test cases & automation (TBD)
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example              # Environment variables template
├── README.md                 # This file
└── docker-compose.yml        # Local development stack (TBD)
```

## Development Workflow

### Epic Development Cycle (Repeats for each epic)

```
Phase 1: BA Agent DEFINES Epic
  ├─ Epic scope & description
  ├─ 3-8 User stories
  └─ Acceptance criteria (testable)
         ↓
Phase 2: Developer Agent DEVELOPS code
  ├─ Implementation code
  ├─ Unit tests (100% coverage)
  ├─ Integration tests
  └─ All coding practices
         ↓
Phase 2.5: Architecture Agent REVIEWS code ⭐ GATEKEEPER
  ├─ Code structure verification
  ├─ Multi-tenant safety check
  ├─ Error handling review
  └─ Standards compliance
       ├─ APPROVED? → Go to Phase 3 ✅
       └─ FAILED? → Return to Developer ❌
         ↓
Phase 3: QA Agent TESTS code
  ├─ Automated tests
  ├─ Manual acceptance tests
  ├─ Configuration variations
  └─ PASS or FAIL decision
         ↓
Phase 4: Orchestrator DECIDES
  ├─ Review QA results
  └─ PASS → Next epic, FAIL → Fix loop
         ↓
Phase 5 (if FAIL): Developer FIXES
  ├─ Fix issues
  ├─ Re-architecture review ⭐
  └─ Re-QA testing
```

**Key Point:** Architecture Agent is a hard gatekeeper. No QA testing without architecture approval.

### Completed Foundation

✅ **Completed:**
- [x] Product vision
- [x] Scope for V1
- [x] Configurable features model
- [x] Agent instruction files (5 agents)
  - BA Agent
  - Developer Agent
  - **Architecture Agent** ⭐ NEW
  - QA Agent
  - Project Orchestrator
- [x] Core skills definitions
- [x] Development workflow documentation
- [x] Quality gates definition

**Next:** Start Epic-001 with BA Agent

### How to Get Started

## Starting Epic Development

The project foundation is now complete. Ready to start Epic-001.

### Step 1: BA Agent Defines Epic-001

Copy this prompt to Codex with **BA Agent**:

```
Define Epic-001: Database & Authentication for Smart Parking Platform.

Epic Scope:
Set up PostgreSQL database with schema for multi-tenant parking system.
Create authentication service (JWT, OAuth2) for operators and admins.
Ensure customer data isolation at database level.

Reference Documents:
- docs/product-vision.md
- docs/config-model.md
- docs/tech-stack.md

Please create:
1. Epic title and description
2. 4-6 user stories
3. Acceptance criteria per story (testable)
4. Technical requirements
5. Security requirements
6. Assumptions & dependencies
7. Non-functional requirements

Output: docs/epics/epic-001-database-auth.md
```

### Step 2: Developer Agent Implements Epic-001

Copy this prompt to Codex with **Developer Agent**:

```
Develop Epic-001: Database & Authentication for Smart Parking Platform.

Epic document: docs/epics/epic-001-database-auth.md

Requirements:
1. Read all user stories and acceptance criteria
2. Implement each story (in order)
3. 100% test coverage
4. All coding practices from agents/developer-agent.md
5. Multi-tenant safety (customer_id on every query)
6. Error handling for all cases
7. Configuration-aware code

Technical Stack:
- Backend: NestJS + TypeScript
- Database: PostgreSQL
- Tests: Jest

Output:
- Code: backend/src/modules/[name]/
- Unit tests: backend/tests/unit/[name]/
- Integration tests: backend/tests/integration/[name]/
- Migrations: backend/migrations/
- Updated APIs: docs/api-design.md (if new endpoints)

Before submitting, verify:
- npm run lint (0 errors)
- npm run test -- --coverage (100% pass, 100% coverage)
- npm run build (0 errors)
```

### Step 3: Architecture Agent Reviews Code ⭐ GATEKEEPER

Copy this prompt to Codex with **Architecture Agent**:

```
Review Architecture: Epic-001 Database & Authentication

Code location: backend/src/modules/[name]/
Tests location: backend/tests/unit/[name]/

Please review:
1. Code structure (controller→service→repo→db)
2. Multi-tenant isolation (customerId everywhere)
3. Error handling (try/catch, logging)
4. Coding standards (no any, no console.log, DRY)
5. Test coverage (100% pass, 100% coverage)

Decision:
- ✅ APPROVED → Code ready for QA
- ❌ FAILED → Return to Developer with specific issues

Reference: agents/architecture-agent.md
```

### Step 4: QA Agent Tests Code

Copy this prompt to Codex with **QA Agent**:

```
Test Epic-001: Database & Authentication for Smart Parking Platform.

Code location: backend/src/modules/[name]/
Tests location: backend/tests/[name]/
Epic document: docs/epics/epic-001-database-auth.md

Execute:
1. Run all tests (unit + integration)
   npm run test
2. Verify code coverage = 100%
   npm run test -- --coverage
3. Test each acceptance criterion
   For each AC, document PASS or FAIL
4. Configuration testing
   Test with different customer configurations
5. Error cases
   Invalid inputs, missing fields, edge cases
6. Security
   Customer isolation, permission checks
7. Performance
   Response times, load testing

Output:
- Test results: backend/tests/results/epic-001-results.md
- Bug report (if any): backend/tests/bugs/epic-001-bugs.md

Decision:
- PASS ✅ (all tests green, 0 bugs) → Mark ready
- FAIL ❌ (any test red, bugs found) → List bugs, severity
```

### Step 5: Orchestrator Makes Quality Gate Decision

Copy this prompt to Codex with **Project Orchestrator**:

```
Quality Gate Decision: Epic-001 Database & Authentication

QA Report: [PASS or FAIL]

Please review:
1. QA test results
2. Bug report (if any)
3. Assessment: Should this epic PASS or go back for fixes?

Output:
- docs/quality-gates/epic-001-decision.md

Decision:
- ✅ PASS: Release epic, ready for Epic-002
- ❌ FAIL: Identify fix priorities, schedule Developer rework
```

### Repeat for Epic-002, Epic-003, ...

After Epic-001 completes, repeat the same steps for Epic-002 through Epic-014.

**Each epic follows the same 5-phase cycle:**
1. BA Agent DEFINES
2. Developer Agent DEVELOPS
3. **Architecture Agent REVIEWS** ⭐
4. QA Agent TESTS
5. Orchestrator DECIDES

## Key Configuration Examples

### Simple Customer (Free Parking)

```yaml
company_name: "Corporate Campus"
enable_plate_verification: false
require_vehicle_photo: false
enable_ai_detection: false
billing_mode: "free_with_penalty"
grace_hours: 2
```

### Advanced Customer (Commercial Lot)

```yaml
company_name: "Downtown Parking Inc"
enable_plate_verification: true
require_vehicle_photo: true
enable_ai_color_detection: true
enable_ai_vehicle_type_detection: true
require_operator_confirmation: true
billing_mode: "hourly"
base_rate: 5.00
grace_minutes: 15
lost_ticket_fee: 25.00
```

## Documentation Files

| File | Purpose | Status |
|------|---------|--------|
| product-vision.md | What the product is | ✅ Complete |
| scope-v1.md | What's in V1 | ✅ Complete |
| config-model.md | What customers can configure | ✅ Complete |
| architecture.md | System design | ⏳ TBD |
| database-design.md | DB schema | ⏳ TBD |
| api-design.md | API contracts | ⏳ TBD |
| epics.md | Feature epics | ⏳ TBD |
| user-stories.md | User stories | ⏳ TBD |
| acceptance-criteria.md | Test criteria | ⏳ TBD |
| qa-test-plan.md | Test strategy | ⏳ TBD |
| project-foundation-v1.md | Unified foundation | ⏳ TBD |

## Agent Files

| Agent | Purpose | Status |
|-------|---------|--------|
| ba-agent.md | Business analysis | ✅ Complete |
| developer-agent.md | Technical design & architecture | ✅ Complete |
| qa-agent.md | Quality assurance & testing | ✅ Complete |
| project-orchestrator.md | Coordination & sequencing | ✅ Complete |

## Skill Files

| Skill | Purpose | Status |
|-------|---------|--------|
| design-db.md | Database schema design | ✅ Complete |
| design-api.md | REST API design | ✅ Complete |
| create-test-cases.md | Test case creation | ✅ Complete |

## Technology Stack (Proposed for V1)

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Backend API** | Node.js + NestJS | Type-safe, modular, multi-tenant ready |
| **Database** | PostgreSQL 14+ | ACID compliance, JSON fields for config |
| **Frontend** | React + TypeScript | Modern, reactive, rapid development |
| **AI Service** | Python + FastAPI | Data science friendly, lightweight |
| **Storage** | S3-compatible | Scalable image storage (AWS S3 or MinIO) |
| **Auth** | JWT + OAuth2 | Stateless, multi-tenant |
| **Deployment** | Docker + Kubernetes | Cloud-native, scalable |
| **Monitoring** | Prometheus + Grafana | Observability |

## Key Features for V1

### Core Parking Flow
- ✅ Vehicle entry recording
- ✅ Automatic ticket generation
- ✅ Vehicle exit processing
- ✅ Parking fee calculation
- ✅ Operator dashboard

### Vehicle Intelligence
- ✅ Number plate verification
- ✅ Vehicle photo upload
- ✅ AI color detection
- ✅ AI vehicle type detection
- ✅ Operator overrides

### Configuration
- ✅ Per-customer feature toggles
- ✅ Multi-site support
- ✅ Configurable pricing models
- ✅ Custom billing rules
- ✅ Grace periods & penalties

### Access & Audit
- ✅ Role-based permissions
- ✅ Multi-site user assignment
- ✅ Complete audit logging
- ✅ Customer data isolation

## Roadmap

### V1 (Weeks 1-12)
- Core entry/exit flow
- Basic ticketing
- Plate verification
- Photo capture
- AI detection (color, type)
- Configurable billing
- Multi-tenant architecture
- Basic reporting

### V2 (Future)
- Mobile app for operators
- Advanced ANPR integration
- Customer self-service portal
- Advanced analytics
- Predictive analytics
- Hardware integrations (gates, cameras)
- Multi-currency & tax handling

## Contributing

This project uses a structured agent-driven workflow with Codex for multi-team coordination:

1. **BA Agent** — business requirements & stories
2. **Developer Agent** — architecture & design
3. **QA Agent** — testing & validation
4. **Project Orchestrator** — coordination & execution

Each agent has clear responsibilities defined in `agents/*.md` and tools defined in `skills/*.md`.

## Getting Help

### For Product Questions
Ask BA Agent - see `agents/ba-agent.md`

### For Architecture Questions
Ask Developer Agent - see `agents/developer-agent.md`

### For QA Questions
Ask QA Agent - see `agents/qa-agent.md`

### For Project Planning
Ask Project Orchestrator - see `agents/project-orchestrator.md`

## License

[To be determined]

## Contact

[To be determined]

---

**Last Updated:** 2026-03-17  
**Project Phase:** Foundation (Product definition & design)  
**Next Step:** Run BA Agent for business analysis
