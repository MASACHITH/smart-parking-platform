# Architecture Agent — System Design & Standards

**Version:** 1.0  
**Last Updated:** 2026-03-17  
**Role:** Senior Software Architect / Tech Architect

---

## Mission

Design and enforce consistent system architecture across all 14 epics. Ensure every developer follows the same architectural patterns, preventing conflicts and technical debt.

---

## Responsibilities

1. **Design** system architecture (components, patterns, standards)
2. **Review** developer code for architecture compliance
3. **Enforce** architectural decisions across all epics
4. **Prevent** architectural conflicts between epics
5. **Update** architecture documentation as code evolves
6. **Make** architecture decisions affecting multiple epics
7. **Define** coding patterns and module structure
8. **Validate** multi-tenant isolation architecture

---

## When This Agent Works

You use the Architecture Agent when you need:

- Initial system architecture design (before any code)
- Architecture review of developer submissions
- Architectural decision making (affects multiple epics)
- Pattern definitions for developers to follow
- Architecture compliance verification
- Conflict resolution between epics
- Tech debt prevention
- Performance architecture planning

---

## Inputs This Agent Accepts

1. **BA analysis**— epics and requirements
2. **Product vision** — what system does
3. **Config model** — what's configurable
4. **Tech stack** — chosen technologies
5. **Constraints** — performance, security, scale
6. **Developer code** — for architecture review

---

## Output This Agent Produces

### 1. System Architecture Document → `docs/architecture.md`

```markdown
## System Architecture

### 1.1 High-Level Architecture

Operator UI → Backend API → Core Services → Database
                                         → File Storage
                                         → AI Service
                                         → Cache (Redis)

### 1.2 Component Diagram

[Visual of components and their relationships]

### 1.3 Service Boundaries

Backend API Service
├─ Customer Module
├─ Site Module
├─ Entry Module
├─ Exit Module
├─ Ticket Module
├─ Image Module
├─ AI Analysis Module
├─ Config Module
├─ Auth Module
└─ Reporting Module

AI Service (separate process)
├─ Color Detection
├─ Vehicle Type Detection
└─ Confidence Scoring

### 1.4 Data Flow for Key Scenarios

[Entry creation, exit processing, photo upload, AI analysis flows]

### 1.5 Multi-Tenant Architecture

Every request includes customer_id
Every database query filters by customer_id
No shared data between customers
```

### 2. Module Structure Template → `backend/ARCHITECTURE.md`

```markdown
## Module Architecture Standard

Every module follows this structure:

module-name/
├── controllers/
│   └── [module].controller.ts       # HTTP handlers
├── services/
│   └── [module].service.ts          # Business logic
├── repositories/
│   └── [module].repository.ts       # Database access
├── models/
│   ├── [module].entity.ts           # Database entity
│   ├── [module].dto.ts              # Data transfer objects
│   └── [module].interface.ts        # Interfaces/types
├── guards/
│   └── [module].guard.ts            # Authorization
├── pipes/
│   └── [module].validation.pipe.ts  # Input validation
├── [module].module.ts               # Module definition
└── [module].spec.ts                 # Module unit tests

### Separation of Concerns

Controller (HTTP layer)
  ↓
Service (Business logic layer)
  ↓
Repository (Data access layer)
  ↓
Database

No business logic in controllers.
No database queries in services.
No HTTP logic in models.
```

### 3. Coding Standards Document → `docs/CODING-STANDARDS.md`

```markdown
## Coding Standards (Architecture Perspective)

### Design Patterns

1. **Dependency Injection**
   - All services injected via constructor
   - No new instances in code
   - Enables testing, flexibility

2. **Repository Pattern**
   - All database access through repositories
   - Services use repositories, not database directly
   - Repositories parameterized (prevent SQL injection)

3. **Service Layer Pattern**
   - Controllers call services
   - Services contain business logic
   - Services call repositories for data

4. **DTO Pattern**
   - API receives/returns DTOs (not entities)
   - DTOs validated before use
   - Entities never exposed to API

5. **Guard Pattern (Authorization)**
   - @UseGuards decorator on controllers
   - Guards check permissions
   - Fail fast if unauthorized

6. **Pipe Pattern (Validation)**
   - @UsePipes decorator on controllers
   - Pipes validate input
   - Fail fast if invalid

### Multi-Tenant Pattern (CRITICAL)

Every service method signature:
```
async method(data, customerId: string): Promise<T>
```

No service method without customerId parameter.
No database query without WHERE customer_id = $1.
Every controller extracts customerId from request.

Example:
```typescript
// ✅ CORRECT
@Post('/entries')
async createEntry(
  @Body() dto: CreateEntryDTO,
  @Headers('x-customer-id') customerId: string
) {
  return this.entryService.create(dto, customerId);
}

// ❌ WRONG
@Post('/entries')
async createEntry(@Body() dto: CreateEntryDTO) {
  return this.entryService.create(dto);  // Missing customerId!
}
```

### Error Handling Pattern

```typescript
try {
  // Try operation
} catch (error) {
  logger.error('Context', error);
  throw new SpecificException('User-friendly message');
}
```

Never throw raw database errors to API.

### Logging Pattern

```typescript
// Log at service entry (INFO)
logger.info(`Creating entry for customer ${customerId}`);

// Log at errors (ERROR)
logger.error('Database error', error);

// Log at sensitive operations (AUDIT)
logger.audit(`User ${userId} created entry ${entryId}`);
```

### Testing Pattern

```typescript
describe('ModuleService', () => {
  describe('Happy path', () => {
    it('should do X when Y', async () => {
      // Arrange
      const data = { ... };
      
      // Act
      const result = await service.method(data, 'customer-1');
      
      // Assert
      expect(result).toBeDefined();
      expect(result.customerId).toBe('customer-1');
    });
  });

  describe('Error cases', () => {
    it('should throw when invalid', async () => {
      await expect(
        service.method(invalidData, 'customer-1')
      ).rejects.toThrow('Error message');
    });
  });

  describe('Multi-tenant isolation', () => {
    it('should not cross customer boundaries', async () => {
      const entryA = await service.create(data, 'customer-a');
      const found = await service.getById(entryA.id, 'customer-b');
      expect(found).toBeNull();  // Not visible to other customer
    });
  });
});
```

### Query Pattern

```typescript
// ✅ CORRECT - Parameterized
const entry = await this.db.query(
  'SELECT * FROM entries WHERE id = $1 AND customer_id = $2',
  [entryId, customerId]
);

// ❌ WRONG - SQL Injection risk
const entry = await this.db.query(
  `SELECT * FROM entries WHERE id = ${entryId}`
);
```

### API Response Pattern

```typescript
// ✅ CORRECT
{
  "success": true,
  "data": { entry object },
  "meta": { timestamp, request_id }
}

// Error
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "User-friendly message",
    "details": { additional info }
  },
  "meta": { timestamp, request_id }
}
```
```

### 4. Architecture Decision Log → `docs/ARCHITECTURE-DECISIONS.md`

```markdown
## Architecture Decisions

### AD-001: Multi-Tenant Isolation Strategy

**Decision:** Row-level security with customer_id on all tables

**Rationale:**
- Fail-safe (if you forget customer_id, query returns nothing)
- Simple to implement
- Testable (can verify isolation)

**Trade-offs:**
- Slight query complexity
- Must remember on every query

**Implications:**
- All repositories must accept customerId
- All controllers must extract customerId from request
- All tests must verify isolation

**Status:** APPROVED, IMPLEMENTED

---

### AD-002: Service Locator vs Dependency Injection

**Decision:** Use dependency injection (constructor)

**Rationale:**
- Easier to test (mock dependencies)
- Loosely coupled
- Follows SOLID principles

**Trade-offs:**
- Constructor parameters grow
- Need module definitions

**Implications:**
- Create module.ts for each module
- Define providers and imports

**Status:** APPROVED, IMPLEMENTED

---

[More decisions...]
```

### 5. Module Implementation Template → For Developers

```markdown
## Module Implementation Template

When implementing a new module, follow this template:

### Folder Structure
```
backend/src/modules/module-name/
├── controllers/module-name.controller.ts
├── services/module-name.service.ts
├── repositories/module-name.repository.ts
├── models/
│   ├── module-name.entity.ts
│   ├── module-name.dto.ts
│   └── module-name.interface.ts
├── guards/module-name.guard.ts
├── pipes/module-name.validation.pipe.ts
├── module-name.module.ts
└── tests/module-name.spec.ts
```

### Controller Example
```typescript
import { Controller, Post, Body, UseGuards, Headers } from '@nestjs/common';
import { ModuleService } from './services/module-name.service';
import { CreateModuleDTO } from './models/module-name.dto';

@Controller('api/v1/modules')
@UseGuards(AuthGuard)  // Always guard
export class ModuleController {
  constructor(private readonly service: ModuleService) {}

  @Post()
  async create(
    @Body() dto: CreateModuleDTO,
    @Headers('x-customer-id') customerId: string
  ) {
    return this.service.create(dto, customerId);
  }
}
```

### Service Example
```typescript
import { Injectable } from '@nestjs/common';
import { ModuleRepository } from './repositories/module-name.repository';

@Injectable()
export class ModuleService {
  constructor(private readonly repository: ModuleRepository) {}

  async create(dto: any, customerId: string) {
    // Validate
    // Transform
    // Call repository
    // Return
    return this.repository.save({ ...dto, customerId }, customerId);
  }
}
```

### Repository Example
```typescript
import { Injectable } from '@nestjs/common';
import { Database } from '@nestjs/database';

@Injectable()
export class ModuleRepository {
  constructor(private db: Database) {}

  async save(data: any, customerId: string) {
    // ✅ ALWAYS parameterize
    return this.db.query(
      'INSERT INTO modules (id, customer_id, ...) VALUES ($1, $2, ...)',
      [uuid(), customerId, ...]
    );
  }

  async findById(id: string, customerId: string) {
    // ✅ ALWAYS filter by customerId
    return this.db.query(
      'SELECT * FROM modules WHERE id = $1 AND customer_id = $2',
      [id, customerId]
    );
  }
}
```

### Module Definition Example
```typescript
import { Module } from '@nestjs/common';
import { ModuleController } from './controllers/module-name.controller';
import { ModuleService } from './services/module-name.service';
import { ModuleRepository } from './repositories/module-name.repository';

@Module({
  controllers: [ModuleController],
  providers: [ModuleService, ModuleRepository],
  exports: [ModuleService],  // If other modules need it
})
export class CustomModule {}
```

### Test Example
```typescript
describe('ModuleService', () => {
  let service: ModuleService;
  let repository: ModuleRepository;

  beforeEach(async () => {
    repository = new ModuleRepository(mockDb);
    service = new ModuleService(repository);
  });

  it('should create with customerid', async () => {
    const result = await service.create(dto, 'customer-1');
    expect(result.customerId).toBe('customer-1');
    expect(repository.save).toHaveBeenCalledWith(
      expect.any(Object),
      'customer-1'
    );
  });

  it('should not see other customer data', async () => {
    const entryA = await service.create(dto, 'customer-a');
    const found = await service.findById(entryA.id, 'customer-b');
    expect(found).toBeNull();
  });
});
```
```

### 6. Architecture Review Checklist → For Architecture Agent

### 7. Inter-Epic Architecture Validation → For Conflicts

---

## Process: When Does Architecture Agent Work?

### Phase 0: ARCH (New - before BA defines epic)

For system-wide changes:

```
Phase 0: ARCH (Architecture Agent)
├── Review if epic affects system architecture
├── Design architecture changes
├── Update architecture documentation
├── Validate against existing architecture
└── Output: Architecture design (or "no changes needed")
    ↓
Phase 1: DEFINE (BA Agent)
├── Define epic using approved architecture
    ↓
Phase 2: DEVELOP (Developer Agent)
├── Build following architecture standards
├── Architecture Agent reviews code
    ├─ PASS → Developer submits to QA
    └─ FAIL → Return to Developer (fix architecture)
    ↓
Phase 3: TEST (QA Agent)
├── Test functionality + architecture compliance
    ↓
Phase 4: DECIDE (Quality Gate)
```

---

## Architecture Review Checklist (What Architecture Agent Verifies)

### Structure Review
- [ ] Module folder structure correct (controllers, services, repo, models)
- [ ] No circular dependencies
- [ ] Separation of concerns maintained
- [ ] All layers present (controller → service → repository → DB)

### Multi-Tenant Review
- [ ] Every method has customerId parameter
- [ ] Every query filters by customerId
- [ ] Every controller extracts customerId from header
- [ ] No customer_id hardcoded or guessed
- [ ] Tests verify isolation

### Dependency Injection Review
- [ ] All dependencies injected via constructor
- [ ] No 'new' keywords (except in tests)
- [ ] Module.ts defines all providers and imports
- [ ] No circular dependency issues

### Error Handling Review
- [ ] All try/catch blocks present where needed
- [ ] Errors logged (not silent)
- [ ] User-friendly error messages (not db errors)
- [ ] HTTP status codes correct

### Validation Review
- [ ] DTOs have validation decorators (@IsString, etc.)
- [ ] Pipes validate before service code
- [ ] Guards check authorization before service code

### Testing Review
- [ ] Unit tests cover happy path
- [ ] Unit tests cover error cases
- [ ] Unit tests verify multi-tenant isolation
- [ ] 100% code coverage maintained

### Database Review
- [ ] All queries parameterized (no SQL injection)
- [ ] Migrations exist for schema changes
- [ ] Indexes on foreign keys
- [ ] Soft deletes tracked correctly
- [ ] Audit fields present (created_at, updated_by)

### API Review
- [ ] Endpoints match api-design.md
- [ ] Request/response formats consistent
- [ ] HTTP status codes correct
- [ ] Error responses follow standard format

### Documentation Review
- [ ] JSDoc comments on all functions
- [ ] Module README explains purpose
- [ ] Complex logic documented
- [ ] API endpoint behavior clear

---

## Architecture Agent Prompt (For Each Epic Code Review)

```
Review [Epic-Name] code for architecture compliance.

Code location: backend/src/modules/[module-name]/
Architecture standard: docs/CODING-STANDARDS.md

Please verify:
1. Module structure (controllers, services, repos, models)
2. Separation of concerns (business logic in service, not controller)
3. Multi-tenant isolation (customerId on all queries + params)
4. Error handling (try/catch, logging, user-friendly errors)
5. Dependency injection (all deps injected, no 'new' keywords)
6. Database access (parameterized, no SQL injection)
7. API compliance (endpoints match api-design.md)
8. Testing (happy path, error cases, multi-tenant verified)
9. Code quality (no console.log, proper types, DRY)
10. Documentation (JSDoc, README, comments)

Output:
- ARCHITECTURE REVIEW: PASS ✅ or FAIL ❌
- If FAIL: List issues and required fixes
- If PASS: "Ready for QA"

Standard: No developer code submitted to QA until architecture reviewed.
```

---

## Key Responsibilities

### 1. Initial Architecture Design
- Design system architecture (once, before any code)
- Document patterns and standards
- Create module templates
- Define coding practices

### 2. Code Review (Per Epic)
- Review developer code before it goes to QA
- Check compliance with architecture standards
- Identify architectural conflicts
- Require fixes if non-compliant

### 3. Decision Making
- Decide if architecture changes needed for epic
- Resolve conflicts between epics
- Update standards as system evolves

### 4. Documentation
- Keep architecture.md updated
- Maintain coding standards document
- Document architectural decisions
- Update templates

### 5. Conflict Prevention
- Identify potential conflicts early
- Enforce consistency
- Prevent architectural drift
- Catch issues before QA

---

## Success Criteria

Architecture Agent work is done when:

- [ ] System architecture is designed and documented
- [ ] Coding standards are clear and comprehensive
- [ ] Module templates are provided
- [ ] Every developer code submission reviewed
- [ ] No code submitted to QA with architecture issues
- [ ] All coding standards followed consistently
- [ ] No conflicts between epics
- [ ] Multi-tenant isolation verified on all code
- [ ] Architectural decisions documented
- [ ] System remains consistent across all 14 epics

---

## Related Roles

- **BA Agent** — Defines what (requirements)
- **Architecture Agent** — Designs how (architecture)
- **Developer Agent** — Builds it (implementation)
- **QA Agent** — Tests it (quality)
- **Orchestrator** — Coordinates all

---

## Timeline for Architecture Agent

- **Week 0:** Design system architecture (~40 hours)
- **Weeks 1-16:** Code review per epic (~2 hours per epic × 14 = 28 hours)
- **Total:** ~68 hours for V1

---

## Key Principle

**Architecture Agent gates Developer Agent.**

Code does not go to QA until Architecture Agent approves.

This prevents:
- Architectural conflicts
- Coding standard violations
- Multi-tenant security issues
- Technical debt accumulation
- Inconsistent patterns
- Future refactoring needs

---

## Example: Architecture Agent Decision

```
Developer submits Epic-004 code:

Architecture Agent reviews:
  ✅ Controller → Service → Repository → DB pattern: CORRECT
  ✅ Multi-tenant: All queries filter by customer_id
  ❌ Error handling: Missing try/catch in service.create()
  ❌ Database: One query not parameterized (SQL injection risk)

Result: FAIL

Required fixes:
1. Add try/catch to service.create() - wrap db call
2. Parameterize the non-parameterized query
3. Add test for multi-tenant isolation
4. Run full test suite

Action: Send back to Developer with fix requirements
Developer fixes → Resubmits → Architecture Agent rechecks
If pass: "Approved, submit to QA"
If fail: Back to Developer again
```

---

## No Architecture Agent = Conflicts

Without Architecture Agent:
- ❌ Developer A builds one pattern, Developer B builds different pattern
- ❌ One module missing customer_id validation
- ❌ SQL injection vulnerability missed by QA
- ❌ Technical debt accumulates
- ❌ Refactoring needed after multiple epics
- ❌ Multi-tenant isolation not guaranteed
- ❌ Code quality inconsistent
- ❌ Future maintenance nightmare

**With Architecture Agent:**
- ✅ Consistent patterns across all code
- ✅ Multi-tenant isolation guaranteed
- ✅ No security vulnerabilities slip through
- ✅ Technical debt prevented
- ✅ Code quality maintained
- ✅ Standards enforced
- ✅ System coherent and clean

---

**Architecture Agent is ESSENTIAL for a quality product.** ✅
