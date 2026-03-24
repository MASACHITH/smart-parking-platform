# Skill: Create Test Cases & Scenarios

**Version:** 1.0  
**Last Updated:** 2026-03-17

---

## Purpose

Define comprehensive test scenarios for the Smart Parking Platform covering:
- Core happy path flows
- Configuration variations
- Error handling
- Edge cases
- AI detection validation

---

## When to Use

- Before writing QA test scripts
- Validating feature completeness
- Planning regression testing
- Creating configuration matrix tests

---

## Output Format

### Primary Artifact: `docs/qa-test-plan.md`

Should contain:

1. **Test Scope** — which features, what's excluded
2. **Test Categories** — by feature area
3. **Per-Category Test Cases**
   - Test ID
   - Description
   - Pre-conditions
   - Steps
   - Expected result
   - Pass/fail criteria
4. **Configuration Test Matrix** — how many combinations
5. **Edge Cases & Negative Tests**
6. **Non-Functional Tests** — performance, load, etc.

---

## Test Structure & Template

```markdown
### Test Case: TC-ENTRY-001

**Category:** Vehicle Entry

**Title:** Create vehicle entry with valid plate

**Priority:** High

**Pre-conditions:**
- User is logged in as Operator
- Customer "Test Corp" exists
- Site "Main Lot" exists
- Gate "Entry-1" is active

**Steps:**
1. Navigate to Entry screen
2. Select Site: "Main Lot"
3. Select Gate: "Entry-1"
4. Enter Plate: "ABC123"
5. Click "Create Entry"

**Expected Result:**
- Entry record created with status: ACTIVE
- Ticket number generated
- Entry time recorded
- Success message shown

**Acceptance Criteria:**
- Entry ID is UUID format
- Status = ACTIVE
- Ticket number is unique
- Entry time is current UTC

**Notes:**
- Plate format is [A-Z]{3}-[0-9]{3}
- Customer can override format in config
```

---

## Core Test Categories

### Category 1: Vehicle Entry

#### TC-ENTRY-001: Entry with manual plate
- Operator enters plate
- Entry created successfully

#### TC-ENTRY-002: Entry with plate verification enabled
- Plate auto-verified against database
- Pass: correct format
- Fail: invalid format

#### TC-ENTRY-003: Entry without photo (optional config)
- Photo not required
- Entry created without photo

#### TC-ENTRY-004: Entry requires photo (mandatory config)
- Photo mandatory
- Entry blocks until photo uploaded
- Photo uploaded → entry complete

#### TC-ENTRY-005: Duplicate active ticket
- Same plate, config allows duplicates
- Create entry → second entry allowed
- Config forbids duplicates → second entry blocked

#### TC-ENTRY-006: Entry with operator notes
- Operator adds notes field
- Notes saved with entry
- Notes visible in entry detail

---

### Category 2: Vehicle Photo & AI Analysis

#### TC-PHOTO-001: Upload vehicle photo
- Operator uploads JPG/PNG
- Photo stored successfully
- Photo URL returned

#### TC-PHOTO-002: Photo upload validation
- File format not image → rejected
- File > max size → rejected
- Valid image → accepted

#### TC-AI-001: AI color detection enabled
- Photo uploaded
- AI analysis triggered automatically
- Color result returned (red, blue, etc.)
- Confidence score shown

#### TC-AI-002: AI color detection disabled
- Config: enable_ai_color_detection = false
- Photo doesn't trigger AI
- No color data collected

#### TC-AI-003: Low confidence AI result
- Color detected but confidence < threshold
- Config: require_operator_confirmation = true
- Result flagged for operator approval

#### TC-AI-004: Operator override AI result
- AI detected "red" with 70% confidence
- Operator changes to "blue"
- Override reason captured
- New value saved

#### TC-AI-005: Vehicle type detection
- Config: enable_ai_vehicle_type = true
- Photo analyzed for type (sedan, SUV, truck)
- Type and confidence returned

#### TC-AI-006: AI mismatch with customer rules
- Config: allow_vehicle_classes = [sedan, SUV]
- AI detects: truck
- System warns operator: "Type not in allowed list"
- Operator can override or fail

---

### Category 3: Vehicle Exit & Charges

#### TC-EXIT-001: Simple exit — hourly rate
- Entry: 10:00 AM
- Exit: 11:00 AM
- Duration: 1 hour
- Rate: $5/hour
- Expected charge: $5.00

#### TC-EXIT-002: Exit with grace period
- Config: grace_minutes = 15
- Entry: 10:00 AM
- Exit: 10:10 AM (within grace)
- Expected charge: $0.00

#### TC-EXIT-003: Exit exceeding grace period
- Config: grace_minutes = 15
- Entry: 10:00 AM
- Exit: 10:20 AM (5 min over grace)
- Duration: 20 minutes
- Rate: $5/hour
- Expected charge: ~$1.67 (5 min)

#### TC-EXIT-004: Lost ticket fee
- Entry record lost/not found
- Config: enable_lost_ticket_fee = true
- Loss fee: $25.00
- Customer charged $25.00

#### TC-EXIT-005: Overnight stay
- Entry: 10:00 PM (Day 1)
- Exit: 9:00 AM (Day 2)
- Config: enable_overnight_charges = true
- Overnight fee: $10.00
- Expected: hourly rate + overnight fee

#### TC-EXIT-006: Long stay discount
- Entry: 10:00 AM (Monday)
- Exit: 5:00 PM (Wednesday) — 55 hours
- Rate: $5/hour, but 10% discount after 24 hours
- Expected calculation: (24 × $5) + (31 × $4.50)

#### TC-EXIT-007: Exit with subscription pass
- User has active pass (30 free hours/month)
- Entry: 10:00 AM
- Exit: 12:00 PM (2 hours)
- Remaining pass hours: 28
- Expected charge: $0.00

---

### Category 4: Configuration Variations

#### TC-CONFIG-001: Customer A — minimal config
```
enable_plate_verification: false
require_vehicle_photo: false
enable_ai_color_detection: false
enable_ai_vehicle_type_detection: false
billing_mode: free_with_penalty
```
- Test entry → no verification required
- Test exit → free parking
- Test override → no AI

#### TC-CONFIG-002: Customer B — maximum config
```
enable_plate_verification: true
require_vehicle_photo: true
enable_ai_color_detection: true
enable_ai_vehicle_type_detection: true
require_operator_confirmation: true
billing_mode: hourly
```
- Test entry → plate verified
- Test photo upload → required
- Test AI → all detections on
- Test exit → hourly charge calculated

#### TC-CONFIG-003: Config change during active entry
- Entry created with Config V1
- Config changed to V2
- Exit processing uses Config V2
- Verify backward compatibility

#### TC-CONFIG-004: Multi-site, different configs
- Site A: free parking
- Site B: $5/hour
- Operator parks car in Site A
- Verify: charged $0, not $5

---

### Category 5: Error Conditions

#### TC-ERROR-001: Invalid plate format
- Plate: "INVALID"
- Format regex: [A-Z]{3}-[0-9]{3}
- Expected: error "INVALID_PLATE"

#### TC-ERROR-002: Missing required field
- Create entry without gate_id
- Expected: error "MISSING_GATE_ID"

#### TC-ERROR-003: Unauthorized user
- User role: "viewer" (no entry:create)
- Attempt: POST /entries
- Expected: 403 FORBIDDEN

#### TC-ERROR-004: Customer context missing
- Request missing X-Customer-ID header
- Expected: 401 UNAUTHORIZED

#### TC-ERROR-005: Photo upload file too large
- File: 50 MB
- Config: max_file_size_mb: 5
- Expected: error "FILE_TOO_LARGE"

#### TC-ERROR-006: Entry not found
- Request: GET /entries/invalid-id
- Expected: 404 NOT_FOUND

#### TC-ERROR-007: Concurrent entry delete
- User A opens entry detail
- User B deletes entry
- User A attempts update
- Expected: error "ENTRY_NOT_FOUND" or "CONFLICT"

---

### Category 6: User & Permissions

#### TC-USER-001: Operator creates entry
- Role: Operator
- Permission: entry:create
- Action: POST /entries
- Expected: 200 OK, entry created

#### TC-USER-002: Viewer cannot create entry
- Role: Viewer
- Permission: entry:read only
- Action: POST /entries
- Expected: 403 FORBIDDEN

#### TC-USER-003: User assigned to Gate-1 only
- User role: Gate Operator
- Assigned gates: [Gate-1]
- Attempt: create entry at Gate-2
- Expected: 403 FORBIDDEN

#### TC-USER-004: Admin changes user role
- User has entry:read, entry:create
- Admin updates role to viewer-only
- User attempts entry:create
- Expected: 403 FORBIDDEN

---

### Category 7: Reporting

#### TC-REPORT-001: Revenue report — hourly view
- Entries: 10:00-11:00 AM: $5, 11:00 AM-12:00 PM: $5
- Report: hourly
- Expected: results grouped by hour

#### TC-REPORT-002: Occupancy report
- Entries: 3
- Exits: 2
- Active entries: 1
- Expected: capacity = 1/max_spaces

#### TC-REPORT-003: AI accuracy report
- AI detections: 10
- Operator corrections: 2
- Expected: accuracy = 80%

---

### Category 8: Non-Functional Tests

#### TC-PERF-001: Entry creation response time
- Load: 100 concurrent entries
- Expected: all < 2 seconds

#### TC-PERF-002: API rate limiting
- Rate limit: 1000 req/minute
- Test: 1001 requests in 1 minute
- Request 1001: 429 TOO_MANY_REQUESTS

#### TC-PERF-003: Database backup
- Active entries: 10,000
- Database backup
- Expected: backup completes in 5 minutes

#### TC-SECURITY-001: SQL injection attempt
- Plate input: `'; DROP TABLE entries; --`
- Expected: treated as literal string, not executed

#### TC-SECURITY-002: XSS in operator notes
- Notes: `<script>alert('xss')</script>`
- Expected: stored as escaped string, not executed in UI

---

## Configuration Test Matrix

| Config | Plate Req | Photo Req | AI On | Billing | Expected Entry Behavior |
|--------|----------|----------|-------|---------|------------------------|
| A | No | No | No | Free | Manual entry, no photo, instant exit free |
| B | Yes | Yes | Yes | Hourly | Auto-verify, photo mandatory, AI runs, charge hourly |
| C | Yes | No | Yes | Flat | Auto-verify, photo optional, AI runs, daily charge |
| D | No | Yes | No | Lost Ticket | Manual entry, photo needed, no AI, lost ticket penalty |
| E | Yes | Yes | Yes | Subscription | Full verification, subscription billing, all AI features |

---

## Edge Cases Checklist

- [ ] Entry at midnight (day boundary)
- [ ] Entry across daylight saving time
- [ ] Very long stay (1+ week)
- [ ] Plate number with special chars (allowed in some countries)
- [ ] Photo upload during network outage
- [ ] AI service timeout (fallback with manual?)
- [ ] Database down during exit (queue exit for later?)
- [ ] Operator logs out during active entry
- [ ] Same vehicle parks twice in same day
- [ ] Charge calculation with multiple rate tiers

---

## Test Type Distribution for V1

| Type | Count | Priority |
|------|-------|----------|
| Happy path | 20 | High |
| Config variations | 10 | High |
| Error conditions | 15 | Medium |
| Edge cases | 10 | Medium |
| Performance | 5 | Low |
| Security | 5 | Medium |
| **Total** | **65** | — |

---

## Regression Test Checklist (Before Release)

- [ ] All entry types work (manual, auto-verified)
- [ ] All photo configurations work
- [ ] All AI configurations work
- [ ] All billing modes work
- [ ] All roles/permissions work
- [ ] All error cases handled
- [ ] API rate limiting works
- [ ] Multi-customer isolation works
- [ ] Audit logs complete
- [ ] Reports generate correctly

---

## Related Skills

- design-api.md (API endpoints to test)
- design-db.md (database state for test setup)
- qa-automation.md (automated test runner)
