# Skill: Design Database Schema

**Version:** 1.0  
**Last Updated:** 2026-03-17

---

## Purpose

Convert product requirements, scope documents, and business rules into a scalable, normalized, multi-tenant database schema that supports configurable parking ticketing across customers.

---

## When to Use

- Creating the initial database entity structure
- Adding new entities to support a feature
- Refactoring schema for scaling
- Defining relationships between transactional and configuration tables
- Adding audit/compliance fields

---

## Inputs Required

1. **Product vision** — what the product does
2. **Scope document** — what's in V1
3. **Business rules** — operational constraints
4. **Config model** — what customers can configure
5. **Arch sketch** — high-level module breakdown

---

## Output Format

### Primary Artifact: `docs/database-design.md`

Should contain:

1. **Entity-Relationship Diagram** (ASCII or reference to diagram tool)
2. **Entity Catalog** — one per table, with:
   - Table name
   - Purpose
   - Columns (name, type, constraints)
   - Primary key
   - Foreign keys
   - Indexes
   - Notes
3. **Relationships** — list of FK relationships and cardinality
4. **Configuration Tables** — which tables hold per-customer rules
5. **Audit Tables** — which tables track changes
6. **Sample Queries** — key queries the app will run
7. **Assumptions & Constraints**

---

## Core Tables (Minimum V1 Set)

### Identity & Multi-Tenancy
- `customers` — companies using the platform
- `sites` — parking lots (per customer can have many)
- `gates` — entry/exit gates (per site can have many)

### Configuration
- `parking_configs` — rules per customer/site
- `rate_plans` — pricing models
- `user_roles` — permission definitions
- `role_permissions` — which role has which permission

### Users & Access
- `users` — operators, managers, admins
- `user_roles_assigned` — which roles assigned to which user
- `audit_logs` — who did what and when

### Parking Operations
- `vehicle_entries` — entry records (one per vehicle entry)
- `vehicle_exits` — exit records (one per vehicle exit)
- `tickets` — issued tickets (references entry)
- `vehicle_images` — uploaded photos (references entry)
- `vehicle_ai_analysis` — AI results (references image)

### Billing
- `billing_rules` — how to calculate charges
- `charges` — calculated fees per ticket

---

## Design Rules for This Project

1. **Multi-tenant isolation** — All tables must have `customer_id` (except global config)
2. **Configurability** — Separateconfig from transactions
3. **Auditability** — Every transactional table has `created_at`, `updated_at`, `created_by`, `updated_by`
4. **Idempotency** — Use natural keys where possible; avoid duplicates
5. **Referential integrity** — All FKs should be enforced
6. **Soft deletes for audit** — Use `is_deleted` flags instead of hard delete
7. **Normalization** — Tables should be at least 3NF; avoid repeating data
8. **Performance** — Index foreign keys, date ranges, customer lookup

---

## Entity Definition Template

```markdown
### TableName

**Purpose:**
Brief description

**Columns:**
| Name | Type | Null | Key | Notes |
|------|------|------|-----|-------|
| id | UUID | N | PK | System-generated |
| customer_id | UUID | N | FK | References customers.id |
| ... | ... | ... | ... | ... |

**Indexes:**
- PRIMARY KEY (id)
- (customer_id, created_at)  -- for listing recent

**Notes:**
- Multi-tenant: yes
- Auditable: yes
```

---

## Quality Checklist

- [ ] All tables have `id` (primary key)
- [ ] All transactional tables have `customer_id`
- [ ] All transactional tables have `created_at`, `updated_at`
- [ ] Foreign keys are defined and indexed
- [ ] No repeating groups (normalized)
- [ ] Configuration tables are separate from operational tables
- [ ] Audit fields on every transactional table
- [ ] Sample queries work without joins > 3 tables
- [ ] Assumptions are documented
- [ ] Soft delete logic is clear (`is_deleted` vs. hard delete)

---

## Common Mistakes to Avoid

1. **Hardcoding customer data** — must be in `parking_configs`, not in schema
2. **Missing audit fields** — always add `created_at`, `created_by`, etc.
3. **Weak foreign keys** — use UUIDs, not integers
4. **Bad indexing** — index customer_id, date ranges, status
5. **Mixing config and transactions** — keep separate tables
6. **No soft delete strategy** — decide upfront whether to hard or soft delete

---

## Success Criteria

- Schema supports multi-customer deployment
- Any two customers can have completely different configurations
- Database can answer: "What happened in entry X?" (audit trail)
- Database can answer: "How much should customer Y pay?" (config + entry)
- Same schema works for small lot (1 site) and large operator (20 sites)

---

## Related Skills

- design-api.md (APIs read/write schema)
- design-db-indexes.md (performance tuning)
- write-user-stories.md (entity requirements)

---

## Refactoring Checklist

When updating schema after feedback:

- [ ] Update entity catalog
- [ ] Update ER diagram
- [ ] Update sample queries
- [ ] Update assumptions
- [ ] Document backward compatibility (if applicable)
- [ ] Version the schema document
