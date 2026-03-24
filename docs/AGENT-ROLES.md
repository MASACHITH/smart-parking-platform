# Agent Roles in Development Workflow

**Version:** 1.0  
**Date:** 2026-03-17  
**Purpose:** Define each agent's role, inputs, and outputs in the epic development cycle

---

## Overview

Each epic goes through 5+ phases. **Different agents own different phases.**

```
┌──────────────────────────────────────────────────────────────┐
│                                                                │
│  EPIC CYCLE (Fixed Process)                                  │
│                                                                │
│  Phase 1: DEFINE                                              │
│  Owner: BA Agent                                              │
│  Input: Epic scope requirements                              │
│  Output: Epic document (stories + AC)                        │
│         ↓                                                      │
│  Phase 2: DEVELOP                                             │
│  Owner: Developer Agent                                       │
│  Input: Epic document (stories + AC)                         │
│  Output: Code + Unit Tests + Integration Tests              │
│         ↓                                                      │
│  Phase 2.5: ARCHITECTURE REVIEW ⭐ NEW                       │
│  Owner: Architecture Agent                                    │
│  Input: Code + Test files                                    │
│  Output: APPROVED or FAIL (return to Developer)             │
│         ↓                                                      │
│  Phase 3: TEST                                                │
│  Owner: QA Agent                                              │
│  Input: Code + Test files (after arch approval)             │
│  Output: Test results (PASS/FAIL)                           │
│         ↓                                                      │
│  Phase 4: DECIDE                                              │
│  Owner: Project Orchestrator (Quality Gate)                 │
│  Input: Test results                                         │
│  Output: PASS → Next Epic OR FAIL → Fix Loop                │
│         ↓                                                      │
│  Phase 5: FIX (if needed)                                     │
│  Owner: Developer Agent + Architecture Agent + QA Agent      │
│  Input: Bug report                                           │
│  Output: Fixed code → Architecture review → QA retest       │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

---

## Agent Roles & Responsibilities

### 1. BA Agent (Business Analyst)

**Owns:** Phase 1 (DEFINE)  
**When:** Epic needs to be defined  
**Frequency:** Once per epic (start of cycle)

#### Inputs:
- Epic scope description (1 paragraph)
- Related documents (product vision, scope)
- Technical constraints (if any)

#### Process:
1. Understand the epic requirement
2. Break into 3-8 user stories
3. For each story, write 3-5 acceptance criteria
4. Make acceptance criteria testable and measurable
5. List technical requirements
6. List non-functional requirements (perf, security)
7. Document assumptions & constraints
8. Identify dependencies on other epics

#### Outputs:
- `docs/epics/epic-[name].md` (detailed epic document)
  - Epic title, description, scope
  - User stories (US-XXX format)
  - Acceptance criteria per story (AC1, AC2, AC3...)
  - Technical requirements
  - Non-functional requirements
  - Assumptions
  - Constraints
  - Dependencies

#### Example Output:

```markdown
## Epic-004: Vehicle Entry

### Description
Operators can record vehicle entry, verify plate number, and generate tickets.

### User Stories

#### US-004-001: Operator Creates Vehicle Entry
As an operator
I want to record a vehicle entry
So that the system tracks when vehicles arrive

Acceptance Criteria:
- [ ] AC1: Operator can select site and gate
- [ ] AC2: Operator can enter plate number (or auto-capture)
- [ ] AC3: System generates unique ticket number
- [ ] AC4: Entry includes timestamp (current UTC)
- [ ] AC5: Entry saved to database

#### US-004-002: Verify Plate Format (if enabled)
As a system
I want to verify plate format matches customer config
So that invalid plates are caught early

Acceptance Criteria:
- [ ] AC1: If config requires verification, validate format
- [ ] AC2: If format invalid, show clear error message
- [ ] AC3: Error message suggests correct format
- [ ] AC4: Allow operator to override with permission
- [ ] AC5: Log all override attempts

[More stories...]

### Technical Requirements
- Must support UUID for entry_id
- Must support soft deletes (is_deleted flag)
- Must create migration for vehicle_entries table
- API endpoint: POST /api/v1/entries

### Non-Functional Requirements
- Performance: Entry creation < 200ms
- Security: Validate customer_id on all requests
- Availability: No downtime during entry creation
- Audit: Log all entries, who created, when

### Assumptions
- Entry can be created before photo upload (photo optional initially)
- Operator has already authenticated
- Site and gate exist in database

### Constraints
- Cannot modify entry after exit recorded
- Entry must have plate_number OR photo (at least one)
```

#### Success Criteria:
- ✅ Epic scope is clear (no ambiguity)
- ✅ 3-8 user stories defined
- ✅ All acceptance criteria are testable
- ✅ No acceptance criteria says "manually verify" or "looks good"
- ✅ Technical requirements listed
- ✅ All dependencies identified

#### BA Agent Prompt Template:

```
Define [Epic Name] for Smart Parking Platform.

Epic Scope:
[1 paragraph describing what epic delivers]

Related Docs:
- docs/product-vision.md
- docs/scope-v1.md
- docs/implementation-roadmap.md

Please create:
1. Epic-level description
2. 3-8 user stories (independent, clear)
3. Acceptance criteria per story (testable, measurable)
4. Technical requirements
5. Non-functional requirements (performance, security, availability)
6. Assumptions & constraints
7. Dependencies on other epics

Output: docs/epics/epic-[name].md

Checklist:
- [ ] All AC are testable (not vague)
- [ ] All AC are measurable (can prove PASS/FAIL)
- [ ] No AC about UI/UX ("looks good" is NOT a criterion)
- [ ] Tech requirements are specific
- [ ] Dependencies are listed
```

---

### 2. Developer Agent (Senior Developer)

**Owns:** Phase 2 (DEVELOP) and Phase 5 Loop (FIX)  
**When:** After BA defines epic  
**Frequency:** Once per epic, plus fixes if QA fails

#### Inputs:
- Epic document (stories + AC)
- Existing codebase
- Coding standards (`docs/CODING-PRACTICES.md`)
- API design (`docs/api-design.md`)
- Database schema (`docs/database-design.md`)

#### Process:
1. Read epic document fully
2. Design module structure (services, controllers, models)
3. Implement each user story one by one
4. Write unit tests (100% coverage) for each story
5. Write integration tests
6. Follow ALL coding practices (no exceptions)
7. Database: write migrations, parameterized queries
8. API: follow contract from api-design.md
9. Security: customer_id validation on every query
10. Code review: check own code against standards

#### Outputs:
- Production code: `backend/src/modules/[name]/`
  - controllers/
  - services/
  - models/ (DTOs)
  - repositories/
  - interfaces/
  - index.ts
- Unit tests: `backend/tests/unit/[name]/`
- Integration tests: `backend/tests/integration/[name]/`
- Database migrations: `backend/migrations/`
- Updated `docs/api-design.md` (if new endpoints)
- Updated `docs/database-design.md` (if new tables)

#### Code Structure Example:

```
backend/src/modules/entry/
├── entry.controller.ts
│   └── POST /entries → createEntry()
│   └── GET /entries/:id → getEntry()
├── entry.service.ts
│   └── createEntry(plateNumber, siteId, ...)
│   └── verifyPlateFormat(plate, rules)
│   └── getEntry(entryId)
├── entry.repository.ts
│   └── save(entry)
│   └── findById(id)
│   └── exists(plateNumber, siteId)  // for duplicate check
├── entry.model.ts
│   └── interface IEntry
│   └── class EntryDTO
├── entry.module.ts
│   └── imports, providers, exports
└── entry.spec.ts
    └── Unit tests (describe + it blocks)

backend/tests/integration/entry/
├── entry.integration.spec.ts
│   └── Test with real database
│   └── Test multi-tenant isolation
│   └── Test configuration variations

backend/migrations/
├── 2026-03-17-create-vehicle-entries.sql
```

#### Coding Practices (MUST FOLLOW ALL):

```javascript
// ✅ DO THIS:

// 1. TypeScript strict mode
const userId: string = user.id;  // typed
const data: IData = getData();   // interfaces

// 2. Error handling
try {
  const entry = await this.entryService.create(data);
  return { success: true, data: entry };
} catch (error) {
  logger.error('Entry creation failed', error);
  throw new BadRequestException('Failed to create entry');
}

// 3. Input validation
class CreateEntryDTO {
  @IsString()
  @IsNotEmpty()
  plateNumber: string;
  
  @IsUUID()
  siteId: string;
}

// 4. Customer isolation (CRITICAL)
async getEntry(entryId: string, customerId: string) {
  // ALWAYS filter by customer_id
  return db.query(
    'SELECT * FROM vehicle_entries WHERE id = $1 AND customer_id = $2',
    [entryId, customerId]
  );
}

// 5. Parameterized queries
// ✅ CORRECT:
db.query(
  'SELECT * FROM entries WHERE customer_id = $1 AND plate = $2',
  [customerId, plateNumber]
);

// ❌ NEVER:
db.query(
  `SELECT * FROM entries WHERE customer_id = ${customerId}`
);  // SQL INJECTION!

// 6. Unit tests
describe('EntryService', () => {
  it('should create entry with valid plate', async () => {
    const result = await service.create({
      plate: 'ABC123',
      siteId: 'site-1'
    });
    expect(result.id).toBeDefined();
    expect(result.plate).toBe('ABC123');
  });

  it('should reject invalid plate format', async () => {
    await expect(
      service.create({ plate: 'INVALID' })
    ).rejects.toThrow('Invalid plate format');
  });
});

// ❌ DON'T DO THIS:

// 1. No console.log
console.log(data);  // ❌ Don't do this in prod code

// 2. No 'any' types
const data: any = getData();  // ❌ Avoid

// 3. No hardcoded values
const customerId = 'hard-coded-id';  // ❌ Should come from request

// 4. No SQL injection
const query = `SELECT * FROM entries WHERE id = ${id}`;  // ❌ DANGER

// 5. Incomplete error handling
const entry = await this.entryService.create(data);  // ❌ No try/catch
```

#### Example Test Structure:

```typescript
describe('EntryService.createEntry', () => {
  describe('Happy path', () => {
    it('should create entry with valid data', async () => {
      const result = await service.createEntry(createEntryDTO);
      expect(result.id).toBeDefined();
      expect(result.customerId).toBe(createEntryDTO.customerId);
      expect(result.createdAt).toBeDefined();
    });
  });

  describe('Acceptance Criteria', () => {
    it('US-004-001 AC1: should record site and gate', async () => {
      const result = await service.createEntry({
        siteId: 'site-123',
        gateId: 'gate-456'
      });
      expect(result.siteId).toBe('site-123');
      expect(result.gateId).toBe('gate-456');
    });

    it('US-004-001 AC2: should generate unique ticket', async () => {
      const entry1 = await service.createEntry(data);
      const entry2 = await service.createEntry(data);
      expect(entry1.ticketNumber).not.toBe(entry2.ticketNumber);
    });

    it('US-004-001 AC3: should record entry timestamp', async () => {
      const before = new Date();
      const result = await service.createEntry(data);
      const after = new Date();
      expect(result.createdAt).toBeGreaterThanOrEqual(before);
      expect(result.createdAt).toBeLessThanOrEqual(after);
    });
  });

  describe('Error cases', () => {
    it('should reject missing plate number', async () => {
      await expect(
        service.createEntry({ siteId: 'site-1' })  // missing plate
      ).rejects.toThrow('Plate number required');
    });

    it('should reject invalid plate format if configured', async () => {
      // config requires format ABC-123
      await expect(
        service.createEntry({ plate: 'INVALID' })
      ).rejects.toThrow('Invalid plate format');
    });
  });

  describe('Security', () => {
    it('should prepend customer_id to all queries (multi-tenant)', async () => {
      // Customer A should not see Customer B's entries
      const entryA = await service.createEntry({
        ...data,
        customerId: 'customer-a'
      });
      
      // Try to access as Customer B
      const found = await repository.findEntry(
        entryA.id,
        'customer-b'  // different customer
      );
      
      expect(found).toBeNull();  // Not found (good!)
    });
  });

  describe('Configuration variations', () => {
    it('should work with config: plate verification ON', async () => {
      // Customer C has plate verification enabled
      const result = await service.createEntry(
        data,
        configVariation.plateVerificationOn
      );
      // Should validate plate format
    });

    it('should work with config: plate verification OFF', async () => {
      // Customer D has plate verification disabled
      const result = await service.createEntry(
        { plate: 'ANYTHING' },  // any format accepted
        configVariation.plateVerificationOff
      );
      // Should NOT validate format
    });
  });
});
```

#### Success Criteria:
- ✅ Code compiles (npm run build = 0 errors)
- ✅ Linting passes (npm run lint = 0 errors)
- ✅ Unit tests pass (npm run test = 100% pass)
- ✅ 100% code coverage
- ✅ All AC covered by tests
- ✅ All error cases tested
- ✅ Multi-tenant isolation verified
- ✅ Configuration variations tested
- ✅ No console.log, no debug code
- ✅ Code reviewed

#### Developer Agent Prompt Template:

```
Develop Epic-[###]: [Epic Name] for Smart Parking Platform.

Epic document: docs/epics/epic-[name].md

Requirements:
1. Read all user stories and acceptance criteria
2. Implement each story (in order)
3. 100% test coverage
4. All coding practices from docs/CODING-PRACTICES.md
5. Multi-tenant safety (customer_id on every query)
6. Error handling for all cases
7. Configuration-aware (different behaviors per config)

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

Before submitting to QA, verify:
- npm run lint (0 errors)
- npm run test -- --coverage (100% pass, 100% coverage)
- npm run build (0 errors)
- npm run test:integration (0 errors)

Checklist:
- [ ] Every AC has a test case
- [ ] Every error case tested
- [ ] Multi-customer tested
- [ ] All configs tested
- [ ] Code reviewed
- [ ] No debug code
```

---

### 3. Architecture Agent (Senior Architect) ⭐ NEW

**Owns:** Phase 2.5 (ARCHITECTURE REVIEW)  
**When:** After Developer submits code + tests, BEFORE QA  
**Frequency:** Once per epic, plus reviews if fixes needed

#### Purpose:
Architecture Agent is a **gatekeeper** to prevent:
- Multi-tenant security breaches
- Architectural inconsistencies across teams
- Technical debt accumulation
- Code quality regressions

#### Inputs:
- Source code from Developer
- Test files (unit + integration)
- Epic document
- Coding standards (`agents/architecture-agent.md`)
- System architecture patterns

#### Process:
1. Review code structure
   - Are controllers thin (no business logic)?
   - Are services doing business logic?
   - Are repositories doing DB access?
   - Is dependency injection used everywhere?

2. Verify multi-tenant safety
   - Does every method have customerId parameter?
   - Is customerId passed to every repository call?
   - Are there any unfiltered global queries?
   - Are all SQL queries parameterized (prevent injection)?

3. Check error handling
   - Are all DB operations in try/catch?
   - Are all API endpoints in try/catch?
   - Is logging structured with context?
   - Are error messages user-friendly?

4. Enforce coding standards
   - No `any` types (strict TypeScript)?
   - No console.log in production code?
   - DRY principle followed (no code duplication)?
   - Tests exist and pass?

5. Document architectural decisions
   - Log decision in Architecture Decision Log
   - Explain why this structure was chosen
   - Reference related decisions

#### Outputs:
- ✅ **APPROVED:** Code passes all checks, ready for QA
  - Approval comment (what passed)
  - Any concerns (minor issues to fix in next epic)
  
- ❌ **FAILED:** Code has issues, return to Developer
  - Specific failures (with file:line references)
  - Required fixes (clear action items)
  - Timeline for re-review

#### Code Review Template:

```markdown
# Architecture Review: Epic-[###]

## Status: ✅ APPROVED / ❌ FAILED

### Code Structure
- [ ] Controllers are thin (routes & validation only)?
  - Description: Controllers should delegate to services
  - File: backend/src/modules/entry/entry.controller.ts
  - Status: ✅ PASS
  
- [ ] Services contain business logic?
  - Description: Services calculate, transform, decide
  - File: backend/src/modules/entry/entry.service.ts
  - Status: ✅ PASS
  
- [ ] Repositories handle ALL database access?
  - Description: No raw DB queries in services or controllers
  - File: backend/src/modules/entry/entry.repository.ts
  - Status: ✅ PASS
  
- [ ] Dependency injection used everywhere?
  - Description: Constructor injection, no `new` keywords
  - File: backend/src/modules/entry/entry.module.ts
  - Status: ✅ PASS

### Multi-Tenant Safety ⚠️ CRITICAL
- [ ] Every method has customerId parameter?
  - ✅ PASS: Service methods all require customerId
  - Line: entry.service.ts:45-50
  
- [ ] customerId passed to every repository call?
  - ✅ PASS: All repo calls include customerId
  - Lines: entry.service.ts:55, 62, 68
  
- [ ] No global/unfiltered database queries?
  - ✅ PASS: All SELECT queries filtered by customer_id
  - Example: `WHERE customer_id = $2 AND id = $1`
  
- [ ] All SQL queries use parameterized values?
  - ✅ PASS: Using $1, $2 parameterization
  - No string interpolation in queries

### Error Handling
- [ ] All database operations wrapped in try/catch?
  - ✅ Status: All DB calls protected
  - Files: entry.service.ts, entry.repository.ts
  
- [ ] All API endpoints wrapped in try/catch?
  - ✅ Status: All controller methods protected
  - File: entry.controller.ts
  
- [ ] Error logging structured with context?
  - ✅ Status: Using context-aware logging
  - Example: logger.error('Create failed', { customerId, error })
  
- [ ] User-friendly error messages (no stack traces)?
  - ✅ Status: API returns clean error objects
  - Example: { "error": "Invalid plate format", "code": "PLATE_FORMAT" }

### Code Quality Standards
- [ ] No `any` types in TypeScript?
  - ✅ Status: All types properly declared
  - 0 instances of `any`
  
- [ ] No console.log in production code?
  - ✅ Status: All logging uses logger service
  - Count: 0 console.log instances
  
- [ ] DRY principle (no code duplication)?
  - ✅ Status: Helper functions extracted
  - Example: validatePlateFormat() extracted and reused
  
- [ ] All tests pass and 100% coverage?
  - ✅ Status: npm run test passes
  - Coverage: 100%

### If FAILED - Required Fixes:

Example failure:

❌ **Issue 1: Multi-tenant isolation missing**
- Location: backend/src/modules/entry/entry.service.ts:78
- Problem: Query missing customer_id filter
  ```typescript
  // ❌ WRONG:
  const entry = await db.query(
    'SELECT * FROM entries WHERE id = $1',
    [entryId]
  );
  ```
- Fix Required:
  ```typescript
  // ✅ CORRECT:
  const entry = await db.query(
    'SELECT * FROM entries WHERE id = $1 AND customer_id = $2',
    [entryId, customerId]
  );
  ```
- Severity: **CRITICAL** (security breach)
- Approved? **NO** - Developer must fix this

---

### If APPROVED - Next Step:
✅ Code approved. Proceed to Phase 3: QA Agent testing.

---

## Important Rules:

### 1. Hard Gatekeeper:
**CODE CANNOT PROCEED TO QA UNTIL ARCHITECTURE AGENT APPROVES.**

### 2. Multi-Tenant Safety is Non-Negotiable:
Any code without proper customerId filtering is REJECTED, no exceptions.

### 3. Review Turnaround:
- Approve: 30 min - 1 hour
- Reject + Feedback: 1-2 hours

### 4. Developer Obligations:
- Fix ONLY the issues Architecture Agent reported
- Re-submit code for re-review (same Architecture Agent)
- Wait for approval before going to QA

### 5. Testing Doesn't Start Until Architecture Approves:
No QA testing happens until Phase 2.5 is PASS.
```

#### Architecture Agent Prompt Template:

```
Review Architecture: Epic-[###] [Epic Name]

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

Reference docs:
- agents/architecture-agent.md
- docs/DEVELOPMENT-WORKFLOW.md (Phase 2.5)
- docs/database-design.md
- docs/CODING-PRACTICES.md
```

---

### 4. QA Agent (Senior QA Engineer)

**Owns:** Phase 3 (TEST) and Phase 5 Loop (RETEST)  
**When:** After Developer submits code + tests  
**Frequency:** Once per epic, plus retests if bugs found

#### Inputs:
- Source code
- Test files (unit + integration)
- Epic document (acceptance criteria)
- Test cases from design phase

#### Process:
1. Review epic document (understand acceptance criteria)
2. Run automated tests (unit + integration)
3. Verify code coverage = 100%
4. Test each user story:
   - For EACH acceptance criterion → verify PASS
5. Test configuration variations (3-5 configs)
6. Test error cases (invalid input, edge cases)
7. Test security (customer_id isolation, permissions)
8. Test performance (response times, load)
9. Create detailed test report
10. Make PASS/FAIL decision

#### Outputs:
- Test execution report: `backend/tests/results/epic-[name]-results.md`
  - Automated test results (all pass/fail)
  - Manual test results (per story, per AC)
  - Configuration test results
  - Error case results
  - Security test results
  - Performance test results
- Bug report (if any): `backend/tests/bugs/epic-[name]-bugs.md`
  - Bug ID
  - Severity (critical, high, medium, low)
  - Steps to reproduce
  - Expected vs actual
  - Impact

#### Example Test Report:

```markdown
# Epic-004: Vehicle Entry - Test Results

**Epic:** Vehicle Entry & Ticketing  
**Developer:** [Name]  
**QA:** [Name]  
**Date:** 2026-03-18  
**Status:** ❌ FAIL (2 bugs found)

---

## Automated Test Results

✅ **Unit Tests:** 24 passed, 0 failed (100%)  
✅ **Integration Tests:** 8 passed, 0 failed (100%)  
✅ **Code Coverage:** 100%

Command results:
```bash
npm run test
> 32 tests passed in 2.3s
Coverage: Statements 100% | Branches 100% | Lines 100% | Functions 100%
```

---

## Manual Test Results (Per User Story)

### US-004-001: Operator Creates Vehicle Entry

✅ AC1: Operator can select site and gate
- [ ] Test: Select site dropdown appears
- [ ] Result: EXISTS ✅
- [ ] Test: Select gate dropdown appears
- [ ] Result: EXISTS ✅

✅ AC2: Operator can enter plate number
- [ ] Test: Plate input field exists
- [ ] Result: EXISTS ✅
- [ ] Test: Plate is editable
- [ ] Result: WORKING ✅

✅ AC3: System generates unique ticket number
- [ ] Test: Create entry #1, ticket = ENTRY-1234-001
- [ ] Result: CORRECT ✅
- [ ] Test: Create entry #2, ticket = ENTRY-1234-002
- [ ] Result: DIFFERENT ✅

❌ AC4: Entry includes timestamp (current UTC)
- [ ] Test: Create entry, check created_at
- [ ] Expected: current UTC time
- [ ] Actual: NULL in database
- [ ] Status: FAIL ❌ **BUG #1**

✅ AC5: Entry saved to database
- [ ] Test: Query database for entry
- [ ] Result: FOUND ✅

### US-004-002: Verify Plate Format (if enabled)

✅ AC1: Validate format if config enabled
- [ ] Test: Config has require_plate_verification = true
- [ ] Test: Submit plate "INVALID"
- [ ] Expected: Error message
- [ ] Actual: Error message ✅
- [ ] Status: PASS ✅

✅ AC2: Show clear error message
- [ ] Test: Error message content
- [ ] Expected: "Invalid plate format. Expected: ABC-123"
- [ ] Actual: "Invalid plate format. Expected: ABC-123" ✅
- [ ] Status: PASS ✅

❌ AC3: Suggest correct format
- [ ] Test: Error message mentions expected format
- [ ] Expected: "Format must be ABC-123" in message
- [ ] Actual: No suggestion in message
- [ ] Status: FAIL ❌ **BUG #2**

[More stories...]

---

## Configuration Testing

✅ **Config A (Minimal):**
- [ ] require_plate_verification = false
- [ ] Auto-accept any plate
- [ ] Result: WORKS ✅

✅ **Config B (Full):**
- [ ] require_plate_verification = true
- [ ] require_photo = true
- [ ] enable_ai_detection = true
- [ ] Result: WORKS ✅

✅ **Config C (Mixed):**
- [ ] Custom settings
- [ ] Result: WORKS ✅

---

## Error Cases

✅ Missing plate number
- [ ] Expected: Error shown
- [ ] Actual: Error shown ✅

✅ Invalid gate ID
- [ ] Expected: Error shown
- [ ] Actual: Error shown ✅

---

## Security Testing

✅ Customer isolation verified
- [ ] Customer A entry not visible to Customer B
- [ ] Result: ISOLATED ✅

✅ Customer ID validation
- [ ] Request without X-Customer-ID header rejected
- [ ] Result: REJECTED ✅

---

## Performance Testing

✅ Entry creation < 200ms
- [ ] Avg: 120ms
- [ ] Max: 180ms
- [ ] Result: PASS ✅

---

## BUG REPORT

### BUG #1: created_at not set

- **Severity:** HIGH
- **Story:** US-004-001 AC4
- **Steps to reproduce:**
  1. Create entry via API
  2. Query database
  3. Check created_at column
- **Expected:** created_at = current UTC
- **Actual:** created_at = NULL
- **Impact:** Cannot track entry time (critical for billing)
- **Root cause:** likely in entry.service.ts (missing timestamp)

### BUG #2: Error message doesn't suggest format

- **Severity:** LOW
- **Story:** US-004-002 AC3
- **Steps to reproduce:**
  1. Submit plate "INVALID" (config has format requirement)
  2. Check error message
- **Expected:** "Format must be ABC-123"
- **Actual:** "Invalid plate format" (no suggestion)
- **Impact:** Operators confused about correct format
- **Suggestion:** Add format pattern to error message

---

## QA DECISION

❌ **FAIL** — 2 bugs found

- 1 HIGH-severity bug (created_at NULL)
- 1 LOW-severity bug (error message)

**Status:** Send back to Developer for fixes.

**Requirements to pass:**
- [ ] Fix created_at issue
- [ ] Write test for timestamp verification
- [ ] Fix error message
- [ ] All tests pass (100%)
- [ ] Resubmit for QA
```

#### Success Criteria:
- ✅ All automated tests executed (0 skipped)
- ✅ Code coverage = 100%
- ✅ Every acceptance criterion tested
- ✅ All configurations tested
- ✅ All error cases tested
- ✅ Security isolation verified
- ✅ Performance met targets
- ✅ Detailed test report created
- ✅ Clear PASS/FAIL decision

#### QA Agent Prompt Template:

```
Test Epic-[###]: [Epic Name] for Smart Parking Platform.

Code location: backend/src/modules/[name]/
Tests location: backend/tests/[name]/
Epic document: docs/epics/epic-[name].md

Execute:
1. Run all tests (unit + integration)
   npm run test
2. Verify code coverage = 100%
   npm run test -- --coverage
3. Test each acceptance criterion
   For US-XXX, for each AC, mark PASS or FAIL
4. Configuration testing
   - Test with 3-5 different customer configs
5. Error cases
   - Invalid inputs
   - Missing fields
   - Edge cases
6. Security
   - Customer isolation (A cannot see B)
   - Permission checks
7. Performance
   - Response times
   - Load testing
8. Data integrity
   - No data loss
   - Transactions work

Output:
- Test results: backend/tests/results/epic-[name]-results.md
- Bug report (if any): backend/tests/bugs/epic-[name]-bugs.md

Decision:
- PASS ✅ (all tests green, 0 bugs) → Mark ready
- FAIL ❌ (any test red, any bug) → List bugs, severity
```

---

### 5. Project Orchestrator (Tech Lead)

**Owns:** Phase 4 (DECIDE Quality Gate) and overall sequencing  
**When:** After QA submits test results  
**Frequency:** Once per epic (or once per retest if fixes needed)

#### Inputs:
- QA test report (PASS/FAIL)
- Bug report (if any)
- Developer submission

#### Process:
1. Read QA test report
2. Review bug list (if any)
3. Assess:
   - All automated tests pass? (100%)
   - All AC pass? (100%)
   - All configurations work?
   - Any critical/high bugs?
4. Make decision: PASS or FAIL

#### Outputs:
- Quality Gate decision document
- If PASS: Release epic, move to next
- If FAIL: Send back to Developer with priorities
- Update project status tracking

#### Example Quality Gate Decision:

```markdown
# Epic-004: Vehicle Entry - Quality Gate Decision

**Date:** 2026-03-18  
**QA Report:** FAIL (2 bugs found)  
**Decision:** FAIL — Return to Developer

---

## Quality Gate Checklist

❌ **Automated Tests:**
- [ ] All unit tests pass (100%)
- [ ] All integration tests pass (100%)
- [ ] Code coverage = 100%
- [ ] No skipped tests
- **Status:** ❌ (see issues below)

❌ **Acceptance Criteria:**
- [ ] US-004-001: ALL AC pass?
  - AC1: ✅ PASS
  - AC2: ✅ PASS
  - AC3: ✅ PASS
  - AC4: ❌ FAIL (created_at NULL)
  - AC5: ✅ PASS
- **Status:** ❌ (AC4 fails)

❌ **Configuration Testing:**
- [ ] Config A: ✅ PASS
- [ ] Config B: ✅ PASS
- [ ] Config C: ✅ PASS
- **Status:** ✅ PASS

❌ **Security:**
- [ ] Customer isolation: ✅ PASS
- [ ] Permission checks: ✅ PASS
- **Status:** ✅ PASS

❌ **Bugs:**
- [ ] Critical bugs: 0
- [ ] High-priority bugs: 1 (created_at NULL)
- [ ] Medium bugs: 0
- [ ] Low bugs: 1 (error message)
- **Status:** ❌ (HIGH bug found)

---

## Decision

**❌ FAIL**

**Reason:**
1. AC4 fails (created_at not set) — HIGH impact
2. High-priority bug blocks completion

**Action:**
Send back to Developer for fixes:

✅ Priority 1: Fix created_at - must set timestamp
✅ Priority 2: Add test case to prevent regression
✅ Priority 3: Fix error message (low but good UX)

**Re-submission:**
- Developer fixes bugs
- Developer writes test cases for bugs
- All tests must pass (100%)
- Resubmit for QA retest
- Return to Quality Gate

**Timeline:** Expect retest in 1 day

---

## Next Steps

1. Developer receives this decision
2. Developer fixes Priority 1 + 2 + 3
3. Developer runs full test suite locally
4. Developer submits to QA again
5. QA retests (focus on fixes)
6. If all green → Epic passes
7. Move to next epic
```

#### Success Criteria:
- ✅ Clear PASS/FAIL decision
- ✅ Reasons documented
- ✅ If FAIL: priorities for Developer
- ✅ If PASS: ready to move to next epic
- ✅ Timeline given for retest (if needed)

#### Quality Gate Checklist:

```
PASS criteria (ALL must be true):
- [ ] All automated tests pass (100%)
- [ ] Code coverage = 100%
- [ ] ALL acceptance criteria: PASS
- [ ] No critical bugs
- [ ] No high-priority bugs
- [ ] Code review passed
- [ ] Documentation complete
- [ ] Performance targets met
- [ ] Configuration testing passed
- [ ] Security verified

FAIL criteria (if ANY are true):
- [ ] Any automated test fails
- [ ] Coverage < 100%
- [ ] Any AC fails
- [ ] Critical bug found
- [ ] High-priority bug found
- [ ] Code review issues
- [ ] Performance target missed
- [ ] Any configuration fails
```

---

## Agent Communication Flow

```
┌─────────────────────┐
│   BA Agent          │
│   Define Epic       │
│   Output: Epic Doc  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Developer Agent     │
│ Build Code + Tests  │
│ Output: Code Files  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐  ⭐ NEW GATEKEEPER
│ Architecture Agent   │
│ Review Code Quality  │
│ Output: OK or FIX    │
└──────────┬──────────┘
           │
      OK   │   Needs Fix
           │   │
        (Y)│   │(N)
           │   ▼
           │ Developer
           │ (Fix Issues)
           │   │
           │   ▼
           │ Architecture
           │ (Re-review)
           │
           ▼
┌─────────────────────┐
│   QA Agent          │
│   Run Tests         │
│ Output: PASS/FAIL   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Orchestrator     │
│   Quality Gate      │
│   Decision: Y/N     │
└──────────┬──────────┘
           │
       PASS │ FAIL
           │   │
        (Y) │   │ (N)
           │   ▼
        NEXT  Developer
        EPIC  (Fix Loop)
             │
             ▼
            Architecture
            (Re-review)
             │
             ▼
            QA
           (Retest)
             │
             ▼
         Orchestrator
         (Re-decide)
```

---

## Key Points for Each Agent

### BA Agent
- ✅ Define once per epic
- ✅ Write testable AC (not vague)
- ✅ Don't code, just define
- ✅ List all dependencies
- ✅ Document assumptions

### Developer Agent
- ✅ Build once per epic
- ✅ Test everything (100% coverage)
- ✅ Follow ALL coding practices
- ✅ Multi-tenant safety mandatory
- ✅ Config-aware code
- ✅ Fix bugs when QA says FAIL + retest

### Architecture Agent ⭐ NEW GATEKEEPER
- ✅ Review code structure (controllers→services→repos)
- ✅ Verify multi-tenant isolation (customerId everywhere)
- ✅ Check error handling (try/catch, logging)
- ✅ Enforce coding standards (no any, no console.log, DRY)
- ✅ APPROVE before QA testing starts
- ✅ REJECT if standards not met (code returns to Developer)
- ✅ Hard gatekeeper: no QA testing without architecture approval

### QA Agent
- ✅ Test once per epic
- ✅ Test EVERY acceptance criterion
- ✅ Test ALL configurations
- ✅ Test ALL error cases
- ✅ Make pass/fail clear
- ✅ Retest when Developer fixes bugs
- ✅ Only test code approved by Architecture Agent

### Orchestrator
- ✅ Review QA results
- ✅ Make PASS/FAIL decision
- ✅ Track overall progress
- ✅ No decision = no progress
- ✅ Clear + documented

---

## Summary

| Agent | Phase | Input | Output | Decision | Gatekeeper? |
|-------|-------|-------|--------|----------|-------------|
| BA | 1. Define | Epic scope | Epic doc (stories, AC) | None (always out) | ❌ No |
| Dev | 2. Build | Epic doc | Code + tests | READY FOR ARCH | ❌ No |
| Arch | 2.5 Review | Code + tests | APPROVED or FAILED | APPROVED or RETURN | ✅ **YES** |
| QA | 3. Test | Code + tests (after arch approval) | Test report | PASS or FAIL | ❌ No |
| Orch | 4. Decide | Test report | Next epic or FIX | PASS → Next, FAIL → Fix | ❌ No |
| Dev | 5. Fix | Bug report | Fixed code | READY FOR ARCH | ❌ No |
| Arch | 5. Re-review | Fixed code | RE-APPROVED or RE-FAILED | APPROVED or RETURN | ✅ **YES** |
| QA | 5. Retest | Fixed code (after arch approval) | Test report | PASS or FAIL | ❌ No |

**This cycle repeats for every epic.**

**Critical Rule:** Architecture Agent is a hard gatekeeper. Code CANNOT proceed to QA (or retest) without architecture approval. This prevents multi-tenant security breaches and architectural inconsistencies.

---

**Now you have a clear, structured process. No ambiguity. No shortcuts. Architecture enforced.** 🚀
