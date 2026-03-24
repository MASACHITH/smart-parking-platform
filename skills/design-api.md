# Skill: Design REST API Contracts

**Version:** 1.0  
**Last Updated:** 2026-03-17

---

## Purpose

Create well-defined REST API contracts for the Smart Parking Platform backend, ensuring:
- Multi-tenant isolation (all requests include customer context)
- Consistent request/response formats
- Clear error handling
- API versioning strategy

---

## When to Use

- Designing APIs for a new feature/module
- Creating API documentation before implementation
- Ensuring consistency across all endpoints
- Defining authentication and authorization boundaries

---

## Inputs Required

1. **Database schema** — entities available
2. **Feature scope** — what needs an API
3. **User roles** — who calls which endpoints
4. **Business rules** — validation constraints

---

## Output Format

### Primary Artifact: `docs/api-design.md`

Should contain:

1. **API Overview**
   - Base URL
   - Authentication method
   - Versioning strategy
   - Rate limiting
   - Pagination

2. **Endpoint Categories** (group by resource)
   - Entry Management
   - Exit & Ticketing
   - Vehicle Analysis
   - Configuration
   - Reporting
   - Users & Roles

3. **Per-Endpoint Definition**
   - HTTP method, path, description
   - Request body (JSON schema)
   - Response body (JSON schema)
   - Status codes and errors
   - Example cURL/request

4. **Data Models** (shared)
   - Customer DTO
   - Ticket DTO
   - User DTO
   - etc.

5. **Security & Auth**
   - JWT token structure
   - Required scopes per endpoint
   - Multi-tenant validation

---

## API Design Principles for Smart Parking

### 1. Multi-Tenant Header
Every request must declare the customer context:
```
GET /api/v1/entries
Authorization: Bearer <jwt_token>
X-Customer-ID: <customer_uuid>
```

### 2. Resource Naming
```
POST   /api/v1/entries              # create entry
GET    /api/v1/entries/{entryId}    # get single entry
PUT    /api/v1/entries/{entryId}    # update entry
DELETE /api/v1/entries/{entryId}    # soft delete entry
GET    /api/v1/entries?limit=10     # list (paginated)
```

### 3. Request Format
```json
{
  "data": {
    "plate_number": "ABC123",
    "gate_id": "gate-01",
    "photo_url": "https://...",
    "operator_id": "user-123"
  }
}
```

### 4. Response Format (Success)
```json
{
  "success": true,
  "data": {
    "id": "entry-abc123",
    "customer_id": "cust-123",
    "plate_number": "ABC123",
    "created_at": "2026-03-17T10:30:00Z"
  },
  "meta": {
    "timestamp": "2026-03-17T10:30:00Z",
    "request_id": "req-789"
  }
}
```

### 5. Error Format
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PLATE",
    "message": "Plate number does not match required format",
    "details": {
      "field": "plate_number",
      "expected_format": "XXX-###"
    }
  },
  "meta": {
    "timestamp": "2026-03-17T10:30:00Z",
    "request_id": "req-789"
  }
}
```

---

## Core API Endpoints (V1 Minimum)

### Entry Management

**POST /api/v1/entries**
- Create a vehicle entry record
- Required: gate_id, operator_id
- Optional: plate_number (if not auto-verified)
- Returns: entry_id, timestamp

**GET /api/v1/entries/{entryId}**
- Retrieve single entry details
- Returns: full entry record + related images + AI analysis

**GET /api/v1/entries**
- List entries with filters
- Filters: site_id, gate_id, date_range, plate_number
- Pagination: limit, offset
- Returns: paginated entry list

**PUT /api/v1/entries/{entryId}**
- Update entry (e.g., correct plate number)
- Only: gate_id, plate_number, operator_notes
- Returns: updated entry

### Vehicle Photo

**POST /api/v1/entries/{entryId}/photos**
- Upload vehicle photo for an entry
- Body: multipart/form-data (image file)
- Returns: photo_id, stored_url

**GET /api/v1/entries/{entryId}/photos**
- List all photos for an entry
- Returns: array of photo objects

### AI Vehicle Analysis

**POST /api/v1/entries/{entryId}/ai-analysis**
- Trigger AI analysis on most recent photo
- Optional: confidence_threshold override
- Returns: analysis_id, status (pending/complete/error)

**GET /api/v1/entries/{entryId}/ai-analysis**
- Get AI analysis result
- Returns: color, vehicle_type, confidence_scores

**PUT /api/v1/entries/{entryId}/ai-analysis**
- Operator override AI result
- Body: { color: "red", vehicle_type: "sedan", reason: "..." }
- Returns: updated analysis record

### Vehicle Exit & Charge

**POST /api/v1/exits**
- Record vehicle exit, calculate charge
- Body: { entry_id, exit_time, exit_gate_id, operator_id }
- Returns: exit_id, amount_due, ticket_status

**GET /api/v1/exits/{exitId}**
- Retrieve exit record and calculated charges
- Returns: exit, charges, payment status

### Tickets

**GET /api/v1/tickets/{ticketId}**
- Retrieve ticket details
- Returns: ticket, entry, exit, charges, status

**PUT /api/v1/tickets/{ticketId}**
- Void ticket (lost ticket refund, operator error)
- Body: { reason, authorized_by }
- Returns: updated ticket with void status

### Configuration

**GET /api/v1/config**
- Retrieve current customer's parking config
- Returns: all config flags, pricing, rules

**PUT /api/v1/config**
- Update config (admin only)
- Body: partial config to update
- Returns: updated full config

**GET /api/v1/config/rate-plans**
- List rate plans for customer
- Returns: array of rate plan objects

### Users & Roles

**GET /api/v1/users**
- List users in organization
- Returns: user list (admin only)

**POST /api/v1/users**
- Create new user
- Body: { name, email, role_id, assigned_gates }
- Returns: user_id, email, role

**PUT /api/v1/users/{userId}**
- Update user role/permissions
- Returns: updated user

### Reporting

**GET /api/v1/reports/revenue**
- Revenue by date, gate, or zone
- Params: start_date, end_date, group_by
- Returns: revenue summary

**GET /api/v1/reports/occupancy**
- Occupancy statistics
- Returns: avg_stay, peak_times, capacity_utilization

**GET /api/v1/reports/ai-accuracy**
- AI detection accuracy (for improvement)
- Returns: color accuracy, vehicle type accuracy, overrides by operators

---

## Authentication & Security

### JWT Token Structure
```json
{
  "sub": "user-uuid",
  "customer_id": "customer-uuid",
  "scopes": ["entry:create", "entry:read", "config:read"],
  "role": "operator",
  "iat": 1647500400,
  "exp": 1647504000
}
```

### Required Headers
```
Authorization: Bearer <jwt_token>
X-Customer-ID: <customer_uuid>
Content-Type: application/json
```

### Scope Examples
- `entry:create` — create new vehicle entry
- `entry:read` — view entries
- `entry:update` — edit entry
- `exit:create` — process vehicle exit
- `config:read` — view configuration
- `config:write` — modify configuration
- `user:manage` — create/update users
- `report:view` — view reports

---

## Error Codes

| Code | HTTP Status | Meaning |
|------|-------------|---------|
| INVALID_PLATE | 400 | Plate number doesn't match format |
| DUPLICATE_ACTIVE_TICKET | 409 | Vehicle already parked (conflict) |
| PHOTO_REQUIRED | 400 | Photo mandatory but missing |
| UNAUTHORIZED | 401 | Invalid/expired token |
| FORBIDDEN | 403 | User lacks permission |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Operation conflicts with state |
| SERVER_ERROR | 500 | Internal error |

---

## Pagination & Filtering

### List Endpoints Support:
```
GET /api/v1/entries?limit=20&offset=0&date_from=2026-03-01&date_to=2026-03-31&plate_number=ABC123
```

### Response:
```json
{
  "success": true,
  "data": [
    { "id": "...", "plate": "..." },
    ...
  ],
  "meta": {
    "total": 150,
    "limit": 20,
    "offset": 0,
    "has_next": true
  }
}
```

---

## Quality Checklist

- [ ] All endpoints have clear HTTP method (GET/POST/PUT/DELETE)
- [ ] All endpoints require X-Customer-ID header
- [ ] Request/response formats are consistent
- [ ] Error codes are documented
- [ ] Example requests/responses provided
- [ ] Rate limiting method is specified
- [ ] Authentication scope per endpoint is clear
- [ ] Multi-tenant isolation is enforced
- [ ] Pagination logic is clear
- [ ] Soft delete strategy for DELETE endpoints

---

## Related Skills

- design-db.md (schema entity mapping)
- create-test-cases.md (API test scenarios)
- backend-scaffolding.md (code generation)

---

## Version Checklist

When API version changes:

- [ ] Update version in all endpoints (/v1/ → /v2/)
- [ ] Document breaking changes
- [ ] Create migration guide
- [ ] Set sunset date for old version
