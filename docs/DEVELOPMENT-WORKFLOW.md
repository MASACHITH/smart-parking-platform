# Smart Parking Platform — Development Workflow

**Version:** 1.0  
**Last Updated:** 2026-03-17  
**Purpose:** Define the strict, repeatable process for epic-by-epic development with quality gates

---

## Core Principle

**One Epic at a Time**  
Each epic follows the same disciplined cycle:
1. Define epic and user stories
2. Developer builds code
3. QA tests comprehensively
4. **Quality Gate:** Pass or Send Back to Fix
5. Move to next epic (only if pass)

**No shortcuts. No skipping testing. No technical debt.**

---

## The Development Cycle (Per Epic)

```
┌─────────────────────────────────────────────────────────────┐
│                      EPIC CYCLE                              │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  STEP 1: Define Epic                                         │
│  ├─ Epic Title & Scope                                       │
│  ├─ User Stories (3-8 per epic)                             │
│  ├─ Acceptance Criteria (3-5 per story)                     │
│  └─ Technical Requirements                                   │
│       ↓                                                       │
│  STEP 2: Develop (Developer Agent)                           │
│  ├─ Write code for each user story                          │
│  ├─ Unit tests (100% code coverage)                         │
│  ├─ Integration tests                                        │
│  ├─ Follow ALL coding practices                             │
│  └─ Code review & clean code                                │
│       ↓                                                       │
│  STEP 3: Architecture Review (Architecture Agent) ⭐ NEW    │
│  ├─ Code structure (controllers→services→repos→db)         │
│  ├─ Multi-tenant isolation (customerId everywhere)          │
│  ├─ Dependency injection (no 'new' keywords)               │
│  ├─ Error handling (try/catch, logging)                    │
│  ├─ Database safety (parameterized, no SQL inject)         │
│  └─ Standards compliance (patterns match templates)         │
│       ├─ PASS → Approve for QA            ✅                │
│       └─ FAIL → Return to Developer       ❌                │
│       ↓                                                       │
│  STEP 4: Test (QA Agent)                                     │
│  ├─ Run all test cases                                       │
│  ├─ Verify acceptance criteria (each story)                 │
│  ├─ Test all configurations (multi-customer)                │
│  ├─ Test error scenarios                                     │
│  └─ Performance & security checks                           │
│       ↓                                                       │
│  STEP 5: Quality Gate Decision                              │
│  ├─ All tests PASS? → Go to STEP 6                         │
│  └─ Tests FAIL?    → Go to Fix Loop                         │
│       ↓                                                       │
│  FIX LOOP (if failed):                                       │
│  ├─ Developer fixes bugs                                     │
│  ├─ Write tests for bugs (prevent regression)              │
│  ├─ Architecture Agent reviews fixes                        │
│  ├─ Approved? → QA retests                                  │
│  └─ Return to Quality Gate Decision                         │
│       ↓                                                       │
│  STEP 6: Release Ready                                       │
│  ├─ All tests pass                                           │
│  ├─ Code reviewed (architecture + functionality)            │
│  ├─ Documentation complete                                   │
│  └─ Move to NEXT EPIC                                        │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Detailed Process (Per Epic)

### PHASE 1: Epic Definition (BA Agent + Developer)

**Role:** BA Agent (Business Analyst)  
**Duration:** 1-2 hours per epic  
**Output:** Epic document

#### What BA Does:
1. Define epic scope (1-2 page summary)
2. Write 3-8 user stories for this epic
3. Every story has 3-5 acceptance criteria
4. Every acceptance criterion is testable (not vague)
5. List technical requirements
6. List assumptions & constraints

#### Epic Template:

```markdown
## Epic: [Epic Name]

### Epic Description
[What this epic delivers]

### User Stories
- US-XXX: [Story 1]
  - AC1: [Criterion 1]
  - AC2: [Criterion 2]
  - AC3: [Criterion 3]

- US-YYY: [Story 2]
  - AC1: [Criterion]
  - AC2: [Criterion]

[More stories...]

### Technical Requirements
- Requirement 1
- Requirement 2

### Non-Functional Requirements
- Performance: [target]
- Security: [required level]
- Availability: [uptime target]

### Assumptions & Constraints
- Assumption 1
- Constraint 1

### Dependencies
- Depends on Epic-001? Yes/No
- Blocks Epic-003? Yes/No
```

#### BA Agent Prompt:

```
Create epic definition for Smart Parking Platform.

Epic to define: [Epic Name]
Parent roadmap: docs/implementation-roadmap.md

Please create:
1. Epic level description
2. 3-8 user stories (clear, independent)
3. Acceptance criteria (testable, measurable)
4. Technical requirements
5. Non-functional requirements (perf, security, availability)
6. Assumptions & constraints
7. Dependencies on other epics

Output to: docs/epics/epic-[name].md

Acceptance criteria MUST be:
- Specific (not vague)
- Measurable (testable)
- Achievable (realistic)
- Relevant (to the feature)
- Time-bound (for this epic)
```

---

### PHASE 2: Development (Developer Agent)

**Role:** Developer Agent (Senior Developer/Tech Lead)  
**Duration:** 2-7 days per epic (depending on size)  
**Output:** Production code + tests

#### What Developer Does:

1. **Read epic requirements** (accepting criteria, technical requirements)
2. **Design module structure** (folder layout, services, controllers)
3. **Write feature code** (following every coding practice)
4. **Write unit tests** (100% coverage, all edge cases)
5. **Write integration tests** (module interactions)
6. **Code review** checklist
7. **Documentation** (code comments, README)

#### Coding Practices (MANDATORY FOR ALL CODE):

```
✅ REQUIRED PRACTICES:

1. Code Quality
   ├─ TypeScript (strict mode)
   ├─ No console.log() in production
   ├─ No any types
   ├─ Proper error handling (try/catch)
   ├─ No hardcoded values
   └─ DRY principle (no code duplication)

2. Testing
   ├─ Unit tests (Jest/Vitest)
   ├─ 100% code coverage
   ├─ Happy path + error cases
   ├─ Edge cases covered
   ├─ Integration tests
   └─ Test names describe what they test

3. Architecture
   ├─ Separation of concerns (services, controllers, models)
   ├─ Dependency injection
   ├─ SOLID principles
   ├─ No circular dependencies
   ├─ Multi-tenant safety (customer_id on all queries)
   └─ Configuration-driven behavior

4. Database
   ├─ All queries parameterized (no SQL injection)
   ├─ Migrations versioned
   ├─ Indexes on foreign keys
   ├─ Soft deletes tracked
   ├─ Audit fields (created_at, created_by, updated_at)
   └─ Data integrity constraints

5. API Design
   ├─ Consistent request/response format
   ├─ Proper HTTP status codes
   ├─ Input validation
   ├─ Resource-based routing
   ├─ API versioning
   └─ Error messages helpful

6. Security
   ├─ Customer_id validation on every request
   ├─ Authorization checks (roles/permissions)
   ├─ Input sanitization
   ├─ Rate limiting
   ├─ Logging sensitive operations
   └─ No secrets in code

7. Documentation
   ├─ JSDoc comments for functions
   ├─ README for module
   ├─ API documentation
   ├─ Architecture diagram (if complex)
   └─ Setup instructions

8. Git
   ├─ Small, logical commits
   ├─ Clear commit messages
   ├─ Feature branch per story
   ├─ No merge without code review
   └─ No debug code left
```

#### Developer Agent Prompt:

```
Develop [Epic Name] for Smart Parking Platform.

Epic document: docs/epics/epic-[name].md

Code requirements:
1. Read all user stories and acceptance criteria
2. Design module structure (services, controllers, DTOs)
3. Implement each user story (story by story)
4. Write unit tests (100% coverage)
   - Happy path tests
   - Error case tests
   - Edge case tests
5. Write integration tests
6. Code follows ALL practices in docs/CODING-PRACTICES.md
7. Database: all queries parameterized, migrations created
8. API: endpoints match docs/api-design.md
9. Security: customer_id validation everywhere
10. Documentation: JSDoc + README

Output:
- Code in: backend/src/modules/[module-name]/
- Tests in: backend/tests/[module-name]/
- Migrations in: backend/migrations/
- Updated: docs/api-design.md (if new endpoints)

Before marking complete, run:
- npm run lint (no errors)
- npm run test (100% pass, 100% coverage)
- npm run build (no errors)
```

---

### PHASE 2.5: Architecture Review (Architecture Agent) ⭐ NEW

**Role:** Architecture Agent (Architecture Review & Enforcement)  
**Duration:** 30 minutes - 2 hours per epic  
**Output:** PASS approval or FAIL with required fixes

#### What Architecture Agent Does:

1. **Code Structure Review**
   - Controllers exist and are thin (no business logic)
   - Services contain business logic
   - Repositories handle all database access
   - Dependency injection used everywhere (no `new` keywords)

2. **Multi-Tenant Safety Verification**
   - customerId parameter on every method
   - customerId passed to every repository call
   - No global queries (all filtered by customerId)
   - Database queries use parameterized values
   - Column-level RLS policies in place (if PostgreSQL)

3. **Error Handling Compliance**
   - All database operations wrapped in try/catch
   - All API endpoints wrapped in try/catch
   - Proper error logging (structured, with context)
   - User-friendly error messages (no stack traces in API)
   - HTTP status codes correct (400 for input, 500 for server)

4. **Pattern Enforcement**
   - Controller pattern: route → DTO validation → service call
   - Service pattern: business logic, dependency calls
   - Repository pattern: database queries only
   - DTO pattern: all API inputs validated
   - Pipe pattern: validation pipes on all routes

5. **Code Quality Standards**
   - No any types (strict TypeScript)
   - No console.log (use logger)
   - DRY principle followed (no duplicated logic)
   - Test file exists for each module
   - Code comments on complex logic
   - Naming conventions followed (camelCase, descriptive)

6. **Documentation**
   - Architecture decisions logged (in ADL doc)
   - Module purposes documented
   - Complex algorithms commented
   - API request/response formats clear

#### Architecture Review Decision:

**✅ PASS:**
- Code meets all 6 criteria above
- Multi-tenant isolation verified
- All coding standards followed
- Code approved for QA testing

**❌ FAIL:**
- Code does NOT meet standards
- Return to Developer Agent with:
  - Specific issues (with line numbers)
  - Required fixes (clear action items)
  - Re-review schedule

#### Important Rule:

**CODE CANNOT PROCEED TO QA UNTIL ARCHITECTURE AGENT APPROVES.**

This is a hard gatekeeper to prevent:
- Multi-tenant security breaches
- Architectural inconsistencies
- Technical debt accumulation
- Code quality issues reaching production

#### Architecture Review Template:

```markdown
# Architecture Review: [Epic Name]

## Status: ✅ PASS / ❌ FAIL

### Code Structure
- [ ] Controllers are thin (route/validation only)?
- [ ] Services contain business logic?
- [ ] Repositories handle DB access?
- [ ] Dependency injection used throughout?

### Multi-Tenant Safety
- [ ] customerId on every method signature?
- [ ] customerId passed to every repo call?
- [ ] No global/unfiltered queries?
- [ ] Parameterized queries (no SQL injection)?

### Error Handling
- [ ] try/catch on all DB operations?
- [ ] try/catch on all API endpoints?
- [ ] Structured logging with context?
- [ ] User-friendly error messages?

### Standards Compliance
- [ ] No 'any' types (strict TypeScript)?
- [ ] No console.log in code?
- [ ] DRY principle (no duplication)?
- [ ] Tests exist (and passing)?

### If FAIL - Required Fixes:
1. Issue 1: [description] @ [file:line]
   └─ Fix: [required action]

2. Issue 2: [description] @ [file:line]
   └─ Fix: [required action]

[... more issues ...]

Wait for Developer Agent to fix, then review again.
```

---

### PHASE 3: QA Testing (QA Agent)

**Role:** QA Agent (Senior QA Engineer)  
**Duration:** 1-3 days per epic  
**Output:** Test results + pass/fail decision

#### What QA Does:

1. **Read acceptance criteria** (for this epic)
2. **Read test cases** (created during design phase)
3. **Run automated tests** (unit + integration)
4. **Run manual tests** (acceptance criteria per user story)
5. **Test all configurations** (multi-customer combinations)
6. **Test error cases** (invalid inputs, edge cases)
7. **Test performance** (response times, load)
8. **Test security** (data isolation, permissions)
9. **Create bug report** (if any failures)
10. **Make pass/fail decision**

#### Test Execution Checklist:

```markdown
## Epic: [Name] - QA Test Execution

### Automated Test Results
- [ ] npm run test passes (100%)
- [ ] npm run test:integration passes (100%)
- [ ] Coverage: 100% code coverage maintained
- [ ] No skipped tests
- [ ] No flaky tests

### Manual Test Results (Per User Story)
- [ ] US-XXX: [Story] - All AC pass?
  - [ ] AC1: [Criterion] - PASS / FAIL
  - [ ] AC2: [Criterion] - PASS / FAIL
  - [ ] AC3: [Criterion] - PASS / FAIL

- [ ] US-YYY: [Story] - All AC pass?
  - [ ] AC1: PASS / FAIL
  - [ ] AC2: PASS / FAIL

[... more stories ...]

### Configuration-Based Testing
- [ ] Config A (minimal): All stories work?
- [ ] Config B (full): All stories work?
- [ ] Config C (custom): All stories work?
- [ ] Data isolation: Customer A cannot see Customer B data?

### Error & Edge Case Testing
- [ ] Invalid input handling
- [ ] Null/empty field handling
- [ ] Concurrent request handling
- [ ] Database connection loss recovery
- [ ] Rate limiting works?

### Security Testing
- [ ] Customer_id validation on all endpoints?
- [ ] Role-based access enforced?
- [ ] SQL injection prevention?
- [ ] XSS prevention?
- [ ] Audit logging complete?

### Performance Testing
- [ ] API response time < 2 seconds?
- [ ] Database queries optimized?
- [ ] No memory leaks?
- [ ] Load test: 100 concurrent requests passes?

### Data Integrity Testing
- [ ] No data loss on failure?
- [ ] Transactions work correctly?
- [ ] Soft deletes tracked?
- [ ] Audit trail complete?

### Final Decision
- [ ] All automated tests PASS
- [ ] All manual tests PASS
- [ ] All acceptance criteria PASS
- [ ] No critical/high bugs
- [ ] Code review approved
- [ ] Documentation complete

**Result:** PASS ✅ / FAIL ❌

If FAIL:
- List all bugs found
- Prioritize by severity
- Send to Developer for fixes
```

#### QA Agent Prompt:

```
Test [Epic Name] for Smart Parking Platform.

Epic: docs/epics/epic-[name].md
Code location: backend/src/modules/[name]/
Test files: backend/tests/[name]/

Please execute:
1. Run automated tests (unit + integration)
2. Verify code coverage = 100%
3. Test each user story:
   - For each story, verify ALL acceptance criteria pass
4. Configuration testing:
   - Test with minimal config
   - Test with full config
   - Test with mixed config
5. Error cases:
   - Invalid inputs
   - Missing required fields
   - Concurrent requests
   - Database errors
6. Security:
   - Customer_id validation
   - Role-based access
   - Data isolation
7. Performance:
   - API response < 2 sec
   - Database queries optimized
8. Data integrity:
   - No data loss
   - Transactions work
   - Audit logging complete

Output:
- Test results file: backend/tests/results/epic-[name]-results.md
- Bug report (if any): backend/tests/bugs/epic-[name]-bugs.md

Decision:
- PASS ✅ → Mark ready for release
- FAIL ❌ → List bugs, severity, priority
```

---

### PHASE 4: Quality Gate Decision

**Role:** Project Orchestrator (Tech Lead)  
**Duration:** 30 minutes per epic  
**Decision:** PASS → NEXT EPIC or FAIL → FIX LOOP

#### Quality Gate Checklist:

```
✅ PASS Criteria (ALL must be true):

Unit Tests
  ✅ All tests pass (npm run test = 100%)
  ✅ 100% code coverage
  ✅ No skipped tests

Integration Tests
  ✅ All integration tests pass
  ✅ Database migrations successful
  ✅ API endpoints work as designed

Acceptance Criteria
  ✅ EVERY acceptance criterion passes
  ✅ All user stories in epic are complete
  ✅ No AC marked "partial" or "deferred"

Manual Testing
  ✅ QA found no critical bugs
  ✅ QA found no high-priority bugs
  ✅ All low-priority bugs have fixes in place

Configuration Testing
  ✅ Works with all customer configurations
  ✅ Data isolation verified (multi-tenant)
  ✅ No cross-customer data leakage

Security
  ✅ Customer_id validation on all requests
  ✅ Role-based access working
  ✅ No SQL injection vulnerabilities
  ✅ Audit logging complete

Performance
  ✅ API response times acceptable
  ✅ Database queries optimized
  ✅ Load testing passed (100 concurrent)

Code Quality
  ✅ No lint errors (npm run lint)
  ✅ Builds successfully (npm run build)
  ✅ Code reviewed and approved
  ✅ Comments/documentation complete

Documentation
  ✅ API endpoints documented
  ✅ Code has JSDoc comments
  ✅ Module README complete
  ✅ Setup instructions clear

---

❌ FAIL Criteria (if ANY are true):

- Any automated test fails
- Code coverage < 100%
- Any acceptance criterion fails
- Critical or high-priority bugs found
- Customer_id validation failing
- Performance targets missed
- Code review issues not resolved
- No documentation
- Build or lint errors

---

**DECISION LOGIC:**

If PASS:
  → Mark epic as COMPLETE ✅
  → Move to NEXT EPIC

If FAIL:
  → Send back to DEVELOPER with bug list
  → Developer fixes bugs
  → Developer adds tests to prevent regression
  → Submit to QA again
  → Retest everything
  → Return to Quality Gate
```

---

### PHASE 5: Fix Loop (If Tests Fail)

**Role:** Developer + QA (cycle repeats)  
**Duration:** 1-3 days  
**Goal:** Fix ALL bugs, retest, pass quality gate

#### Fix Process:

```
┌─ Bug Found (FAIL at Quality Gate)
│
├─→ Developer:
│   ├─ Read bug report
│   ├─ Identify root cause
│   ├─ Fix the bug
│   ├─ Write test case (prevent future regression)
│   ├─ Run all tests locally (must pass)
│   └─ Submit for retest
│
├─→ QA:
│   ├─ Retest the fixed bug
│   ├─ Verify fix doesn't break other features
│   ├─ Retest related stories
│   ├─ Run full test suite again
│   └─ New Quality Gate Decision
│
└─ Return to Quality Gate (PASS or back to Developer)
```

#### Developer Fix Checklist:

```markdown
## Bug Fix Checklist

For each bug reported:

1. Understand the bug
   - [ ] Read bug description
   - [ ] Understand root cause
   - [ ] Reproduce the bug locally

2. Fix the bug
   - [ ] Fix code
   - [ ] Follow coding practices
   - [ ] No new issues introduced

3. Test the fix
   - [ ] Write test case (prevent regression)
   - [ ] Test the specific bug scenario
   - [ ] Run related tests
   - [ ] Run full test suite: npm run test
   - [ ] Check: npm run lint
   - [ ] Check: npm run build

4. Verify no regression
   - [ ] All existing tests still pass
   - [ ] Code coverage maintained (100%)
   - [ ] No new failing tests

5. Submit for retest
   - [ ] Update test results document
   - [ ] Note: "Fixed bug #123"
   - [ ] Submit to QA
```

#### QA Retest Checklist:

```markdown
## QA Retest Checklist

For each fix:

1. Test the specific bug fix
   - [ ] Bug no longer occurs
   - [ ] Fix works in all configurations
   - [ ] Fix works with both valid and invalid inputs

2. Regression testing
   - [ ] All automated tests still pass
   - [ ] Related features still work
   - [ ] Other epics unaffected

3. Quality Gate Retest
   - [ ] Run full Quality Gate again
   - [ ] PASS or identify new bugs
```

---

## Epic Sequence (Recommended Order)

Based on dependencies:

```
Phase 1: Foundation (Week 1-2)
  Epic-001: Database & Authentication
  Epic-002: Core API & Multi-Tenant Routing
  Epic-003: Customer & Site Management

Phase 2: Core Parking (Week 3-5)
  Epic-004: Vehicle Entry (create, verify plate)
  Epic-005: Vehicle Photo & Upload
  Epic-006: AI Vehicle Analysis
  Epic-007: Vehicle Exit & Billing

Phase 3: Configuration & Features (Week 6-8)
  Epic-008: Configurable Rules Engine
  Epic-009: User Roles & Permissions
  Epic-010: Operator Dashboard

Phase 4: Reporting & Quality (Week 9-12)
  Epic-011: Reporting & Analytics
  Epic-012: Audit Logging
  Epic-013: System & Load Testing
  Epic-014: Security Hardening
```

---

## Rules for This Workflow

### ✅ DO:
- ✅ Complete one epic fully before starting next
- ✅ Write tests for every piece of code
- ✅ Fix all bugs before moving on
- ✅ Follow ALL coding practices (no exceptions)
- ✅ Document as you go
- ✅ Review all code before merge
- ✅ Run full test suite frequently
- ✅ Test multi-customer scenarios
- ✅ Commit frequently with clear messages
- ✅ Create test cases that prevent regression

### ❌ DON'T:
- ❌ Skip testing (ever)
- ❌ Leave bugs for "next sprint"
- ❌ Have > 10% auto tests failing
- ❌ Merge code without review
- ❌ Leave debug code or console.log()
- ❌ Hardcode customer/configuration values
- ❌ Skip coding practices for "speed"
- ❌ Move to next epic if current fails
- ❌ Have < 100% code coverage
- ❌ Ignore security concerns

---

## Success Metrics

### Per Epic:
- ✅ All automated tests pass (100%)
- ✅ All manual acceptance criteria pass (100%)
- ✅ Code coverage = 100%
- ✅ Zero critical bugs
- ✅ Zero high-priority bugs
- ✅ All low bugs resolved
- ✅ Code reviewed and approved
- ✅ Documentation complete
- ✅ Performance targets met
- ✅ Security verified

### Overall:
- ✅ All 14 epics pass quality gates
- ✅ 0 regression bugs in later epics
- ✅ 100% code coverage maintained
- ✅ 0 critical/high bugs in production
- ✅ All documentation complete
- ✅ Ready for V1 release

---

## Commands to Run Frequently

```bash
# After every code change
npm run lint          # Check code quality
npm run test          # Run all tests locally
npm run test:coverage # Check coverage (must be 100%)
npm run build         # Check if builds
npm run test:integration # Test database/API

# Before marking epic complete
npm run test -- --coverage  # Detailed coverage report
npm run test:e2e            # End-to-end tests
npm run security:check      # Check dependencies for vulnerabilities

# Daily
npm run test                # All tests pass?
npm run lint:fix            # Fix lint issues
git status                  # Clean working directory
```

---

## Communication Flow

```
BA Agent (defines epic)
    ↓
[Epic document created]
    ↓
Developer Agent (builds code)
    ↓
[Code + tests submitted]
    ↓
QA Agent (runs tests)
    ↓
[Test results: PASS or FAIL]
    ↓
Quality Gate (orchestrator decision)
    ├─ PASS → Next epic
    └─ FAIL → Back to Developer (fix)
        ↓
        [Developer fixes + retests]
        ↓
        [Resubmit]
        ↓
        [QA retests]
        ↓
        [Quality Gate retest]
```

---

## Expected Timeline

| Phase | Epics | Weeks | Notes |
|-------|-------|-------|-------|
| 1. Foundation | 3 | 2 | Core infrastructure |
| 2. Core Parking | 4 | 3 | Entry, exit, billing |
| 3. Configuration | 3 | 2 | Rules, roles, UI |
| 4. Quality | 4 | 3 | Reporting, security, testing |
| **Total** | **14** | **10** | Ready for V1 launch |

---

## Quality Standards

### Code Quality
- Linting: 0 errors
- Unit test coverage: 100%
- Integration tests: all pass
- Build: no errors

### Functionality
- All acceptance criteria: pass
- All user stories: complete
- All configurations: tested
- Multi-tenant isolation: verified

### Performance
- API response: < 2 seconds
- Database queries: optimized
- Load: 100 concurrent requests handled

### Security
- Customer isolation: verified
- Role-based access: enforced
- SQL injection: prevented
- Audit logging: complete

### Documentation
- API: fully documented
- Code: commented (JSDoc)
- README: per module
- Setup: clear instructions

---

## Escalation Path

If epic fails quality gate:

```
QA: "Epic failed. 3 bugs found."
  ↓
Developer: "Fixing bugs..."
  ↓
Developer: "Resubmit"
  ↓
QA: "Still 1 bug. High priority."
  ↓
Orchestrator: "Escalate to Tech Lead"
  ↓
Tech Lead: Reviews root cause
  ↓
Decision: Fix or defer to V2
```

---

## Summary

**This is your development standard:**

1. **One Epic** at a time
2. **Define** with stories & criteria
3. **Develop** with 100% testing & all practices
4. **Test** comprehensively (automated + manual)
5. **Quality Gate** pass/fail decision
6. **If Fail** → Fix loop (not next epic)
7. **If Pass** → Move to next epic
8. **No shortcuts.** No technical debt.

**Every epic that passes quality gate is production-ready.**

---

**Ready to start Epic-001?** 🚀
