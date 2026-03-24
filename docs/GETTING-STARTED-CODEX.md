# Getting Started with Codex — Smart Parking Platform

**Date:** 2026-03-17  
**Project Phase:** Foundation Complete - Ready for Agent Workflow

---

## What Was Just Set Up

Your Smart Parking Platform project is now structured for **Codex-driven multi-agent development**:

### ✅ Completed

1. **Product Documentation** (docs/)
   - `product-vision.md` — What we're building
   - `scope-v1.md` — What's in V1
  - `config-model.md` — What customers configure
   - `architecture.md` — (existing, will be updated by Developer Agent)

2. **Agent Instructions** (agents/)
   - `ba-agent.md` — Business Analyst behaviors
   - `developer-agent.md` — Tech Lead / Architect behaviors
   - `qa-agent.md` — QA Strategist behaviors
   - `project-orchestrator.md` — Coordinator behaviors

3. **Reusable Skills** (skills/)
   - `design-db.md` — Database schema design methodology
   - `design-api.md` — REST API design methodology
   - `create-test-cases.md` — Test case creation methodology
   - `smart-parking-bootstrap/` — existing bootstrap skill

4. **Project Structure**
   - README.md — complete guide
   - Folder structure for backend, frontend, AI services, infra
   - .gitignore configured

---

## What Happens Next

### Step 1: Run BA Agent (Today)

**Purpose:** Create business analysis (epics, stories, rules)

**Copy this prompt to Codex chat:**

```
Create business analysis for the Smart Parking Platform.

Context:
This is a modern, configurable parking ticketing system that will be sold 
to multiple customers. Each customer can customize the system to their needs 
(required plate verification, photo requirements, AI detection toggles, 
billing models, etc.). The platform must support vehicle entry, photo 
capture, AI-based vehicle color/type detection, and flexible billing.

Files to reference:
- docs/product-vision.md
- docs/scope-v1.md
- docs/config-model.md

Please create:
1. V1 Feature Epics (major feature areas)
2. User Stories for each epic (from customer/operator perspective)
3. Acceptance Criteria for each user story (testable)
4. Business Rules that govern operations
5. Key Assumptions
6. Open Questions needing clarification

Output format:
- Save epics to: docs/epics.md
- Save user stories to: docs/user-stories.md  
- Save acceptance criteria to: docs/acceptance-criteria.md
- Save business rules to: docs/business-rules.md
- Include open questions in each file
```

**Expected Output:** 
- 8-10 epics
- 30-40 user stories (with acceptance criteria)
- Business rules document
- Open questions list

**Time:** ~30 minutes

---

### Step 2: Run Developer Agent (After Step 1)

**Purpose:** Create technical design (architecture, DB, APIs)

**Copy this prompt to Codex:**

```
Design the technical foundation for the Smart Parking Platform.

You have completed BA analysis. Now create the technical design.

Reference files (created by BA Agent):
- docs/epics.md
- docs/user-stories.md
- docs/acceptance-criteria.md
- docs/business-rules.md

Also reference:
- docs/product-vision.md
- docs/config-model.md

Please create:
1. System Architecture (components, flow diagrams)
2. Multi-Tenant Database Schema (entities, relationships)
3. REST API Contracts (endpoints, request/response)
4. Backend Module Structure (folder layout)
5. Frontend Folder Structure (component layout)
6. Technology Stack Recommendations
7. Implementation Roadmap (phases, weeks)
8. Technical Risks & Mitigations

Output format:
- System architecture: docs/architecture.md (update existing)
- Database design: docs/database-design.md
- API contracts: docs/api-design.md
- Backend scaffold: backend/ (folder structure)
- Frontend scaffold: frontend/ (folder structure)
- Tech stack: docs/tech-stack.md
- Roadmap: docs/implementation-roadmap.md
- Risks: docs/technical-risks.md
```

**Expected Output:**
- Complete architecture diagram
- 15-20 database entities defined
- 25-30 API endpoints designed
- Scaffolded folder structures
- 12-week phased roadmap

**Time:** ~1 hour

---

### Step 3: Run QA Agent (After Step 2)

**Purpose:** Create test strategy (scenarios, matrix, UAT)

**Copy this prompt to Codex:**

```
Create comprehensive test strategy for the Smart Parking Platform V1.

Reference completed work:
- docs/epics.md
- docs/user-stories.md
- docs/acceptance-criteria.md
- docs/architecture.md
- docs/database-design.md
- docs/api-design.md
- docs/config-model.md

Please create:
1. Test Plan (scope, categories, approach)
2. Detailed Test Cases (60+, organized by feature)
3. Configuration Test Matrix (all combinations)
4. Regression Checklist (what must pass before release)
5. UAT Plan (user acceptance testing approach)
6. Edge Cases & Error Scenarios
7. Non-Functional Tests (performance, security)
8. Quality Risks & Mitigations

Test format:
Each test case should have:
- ID (TC-CATEGORY-###)
- Title
- Priority (High/Medium/Low)
- Pre-conditions
- Steps
- Expected results
- Acceptance criteria

Output format:
- Test plan: docs/qa-test-plan.md
- Test cases: tests/test-cases.md
- Config matrix: docs/qa-config-matrix.md
- UAT plan: docs/qa-uat-plan.md
- Risks: docs/qa-risks.md
```

**Expected Output:**
- 60+ documented test cases
- Configuration matrix (all combinations)
- UAT checklist
- Regression test suite definition
- Edge case documentation

**Time:** ~45 minutes

---

### Step 4: Run Project Orchestrator (After Step 3)

**Purpose:** Unify all outputs and create execution plan

**Copy this prompt to Codex:**

```
Orchestrate the Smart Parking Platform project foundation.

Consolidate all BA, Developer, and QA work into unified project plan.

Reference files (created by previous agents):
- docs/epics.md
- docs/user-stories.md
- docs/acceptance-criteria.md
- docs/architecture.md
- docs/database-design.md
- docs/api-design.md
- docs/qa-test-plan.md
- tests/test-cases.md
- docs/config-model.md

Please create:
1. Project Foundation Summary
   - What we're building (consolidated)
   - In scope / Out of scope
   - Team roles
   - Success criteria

2. Implementation Roadmap
   - Phase breakdown (weeks 1-12)
   - Dependencies between phases
   - Team allocation

3. Task Backlog
   - All work items from all epics
   - Priority (High/Medium/Low)
   - Dependencies
   - Estimated effort
   - Owner

4. Dependency Graph
   - Visual map of dependencies
   - Blockers identified
   - Critical path

5. Decision Log
   - Major decisions made
   - Rationale
   - Trade-offs

6. Risk Register
   - Consolidated from all teams
   - Impact, likelihood, mitigation

7. Go / No-Go Checklist
   - What must be true before development starts
   - Who approves what

Output format:
- Foundation summary: docs/project-foundation-v1.md
- Roadmap: docs/implementation-roadmap.md
- Task backlog: docs/task-backlog.md
- Decision log: docs/decision-log.md
- Risk register: docs/risk-register.md
- Go/no-go checklist: docs/go-no-go-checklist.md
```

**Expected Output:**
- Unified project foundation document
- 12-week phased roadmap
- 80+ prioritized tasks
- Dependency graph
- Decision log
- Risk register

**Time:** ~30 minutes

---

## Summary of Workflow

```
┌─────────────────────────────┐
│   Product Vision Complete   │
│   (What to build)           │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│  BA Agent: Analyze          │ ← Run this first
│  Output: Epics, Stories     │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│  Developer Agent: Design    │ ← Run this second
│  Output: Architecture, DB   │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│  QA Agent: Strategy         │ ← Run this third
│  Output: Test Plan, Cases   │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│  Orchestrator: Unite        │ ← Run this fourth
│  Output: Roadmap, Backlog   │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│  Development Ready!         │
│  Start building features    │
└─────────────────────────────┘
```

---

## How to Run Agents in Codex

1. **Open Codex Chat** in ChatGPT or VS Code
2. **Paste the prompt** from above (Step 1, 2, 3, or 4)
3. **Add context** if needed ("We're in week 1", "Focus on MVP", etc.)
4. **Monitor output** — agent will create/update files
5. **Review output** — check generated documents
6. **Iterate** — ask for changes if needed
7. **Move to next agent** — when previous one is done

---

## File Locations

All files will be created in your workspace:

```
d:\Development\Web\smart-parking-platform\
├── docs/
│   ├── product-vision.md       ✅ Done
│   ├── scope-v1.md             ✅ Done  
│   ├── config-model.md         ✅ Done
│   ├── epics.md                ⏳ BA Agent
│   ├── user-stories.md         ⏳ BA Agent
│   ├── acceptance-criteria.md  ⏳ BA Agent
│   ├── business-rules.md       ⏳ BA Agent
│   ├── architecture.md         ⏳ Developer Agent
│   ├── database-design.md      ⏳ Developer Agent
│   ├── api-design.md           ⏳ Developer Agent
│   ├── implementation-roadmap.md ⏳ Developer Agent
│   ├── qa-test-plan.md         ⏳ QA Agent
│   ├── qa-config-matrix.md     ⏳ QA Agent
│   ├── qa-uat-plan.md          ⏳ QA Agent
│   ├── project-foundation-v1.md ⏳ Orchestrator
│   ├── task-backlog.md         ⏳ Orchestrator
│   └── decision-log.md         ⏳ Orchestrator
├── agents/ ✅ (all complete)
├── skills/ ✅ (all complete)
└── backend/, frontend/, ai-services/, infra/, tests/
    ⏳ (scaffolded by Developer Agent)
```

---

## Success Metrics

After all agents complete:

- [ ] 8+ epics documented
- [ ] 30+ user stories with acceptance criteria
- [ ] 10+ business rules documented
- [ ] System architecture designed
- [ ] 15+ database entities defined
- [ ] 25+ API endpoints designed
- [ ] 60+ test cases documented
- [ ] Configuration test matrix created
- [ ] 12-week implementation roadmap
- [ ] 80+ prioritized tasks with dependencies
- [ ] All risks identified and mitigated
- [ ] Team aligned on goals and approach

---

## Next Action

**Ready to start?**

1. Copy the **Step 1 prompt** (BA Agent)
2. Paste into **Codex chat**
3. Wait for output (~30 minutes)
4. Review generated files
5. Copy **Step 2 prompt** and repeat

**The entire foundation should be ready in ~3 hours.**

---

## Questions?

Each agent file has detailed guidance:
- `agents/ba-agent.md` — Business analysis
- `agents/developer-agent.md` — Technical design
- `agents/qa-agent.md` — Testing strategy
- `agents/project-orchestrator.md` — Project coordination

Each skill file has detailed methodology:
- `skills/design-db.md` — Database design
- `skills/design-api.md` — API design
- `skills/create-test-cases.md` — Test cases

---

**Good luck! Your project foundation is ready. Start with BA Agent!** 🚀
