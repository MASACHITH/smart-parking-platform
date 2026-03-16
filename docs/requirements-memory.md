# Smart Parking Platform Requirements Memory

Last updated: 2026-03-16

## Purpose

This file captures the business-analysis conversation so far for the Smart Parking Platform. It is intended to preserve context for future requirement discovery, PRD creation, epics, user stories, and acceptance criteria.

## Product Goal

The platform should help customers:

- Reduce manual work
- Improve operational accuracy
- Increase revenue control
- Speed up vehicle processing

## Product Vision

Build a modern, configurable, multi-tenant parking ticketing platform that can be sold to different customer types and adapted through configuration and licensed features.

## Core Parking Flow

Target modern flow:

1. Vehicle arrives at entry
2. System captures vehicle details
3. Number plate may be detected and verified, based on configuration
4. Vehicle photo may be captured, based on configuration
5. AI may detect vehicle color and vehicle type, based on configuration
6. Information is saved to the database
7. Parking ticket or parking session is created
8. Vehicle parks
9. On exit, the system identifies the vehicle, ticket, or session
10. Fee is calculated based on configured tariff rules
11. Payment is collected if required
12. Exit is approved automatically or manually, based on configuration

## Platform Model

- Multi-tenant platform
- Suitable for any customer segment that needs parking management
- Customer-specific behavior should be driven by configuration
- Feature access should be controlled by licensing
- Platform admin enables licensed modules for each customer
- Customer admins can use and configure only purchased/licensed features

## Deployment Model

- Cloud SaaS should be supported
- On-premise deployment should also be supported
- Choice depends on customer need

## Data Isolation

- Strict tenant data isolation is required
- Each customer must only access their own sites, users, vehicles, reports, and configurations

## Customer and Site Structure

- A single customer can manage multiple parking sites
- Each site can have its own:
  - Configuration
  - Pricing and tariffs
  - Devices
  - Reports
- Each site may also contain multiple zones or areas if needed, such as:
  - VIP
  - Staff
  - Visitor
  - Reserved
  - Floors or sections

## Roles and Access

- Roles should be configurable per customer
- Example operational roles may include:
  - Entry gate staff
  - Exit or cashier staff
  - Supervisors
  - Security officers
  - Back-office managers
- Customer admins should manage their own site-level configurations, users, tariffs, and reports
- Platform admin retains control over:
  - Tenant creation
  - Feature licensing
  - Global settings

## Configurable Features

The platform should allow customer-specific enablement and configuration for:

- Number plate recognition and verification
- Vehicle photo capture
- AI-based vehicle color detection
- AI-based vehicle type detection
- Automatic ticket or session creation
- Manual staff-confirmed ticket or session creation
- Automatic exit processing
- Manual staff-assisted exit processing
- Supported payment methods
- Hardware and device integrations
- White-label branding
- Customer-specific roles and permissions

## Number Plate Recognition

- Should be configurable per customer or site
- Can be used for:
  - Validation only
  - Ticket or session lookup
  - Entry automation
  - Exit automation
  - Disabled entirely

## Vehicle Photo and AI Detection

- Vehicle photo capture is optional and configurable
- AI color detection is optional and configurable
- AI vehicle type detection is optional and configurable
- These can be enabled independently
- When enabled, detected data may be used for:
  - Record keeping
  - Pricing rules
  - Mismatch alerts
  - Security checks

## Entry and Exit Processing

- Entry ticket or session creation mode should be configurable:
  - Fully automatic
  - Staff-confirmed or manual
- Exit mode should be configurable:
  - Fully automatic
  - Staff-assisted or manual
- Parking session identification should support a configurable combination of:
  - Printed ticket
  - Plate number
  - QR code
- When multiple identifiers are available, exit lookup priority should be customer-configurable
- If plate recognition is enabled but the plate is unreadable, the system should support fallback methods such as:
  - Manual entry
  - Ticket issuance
  - QR-based flow
- Plate mismatch handling at exit should be configurable by customer or site:
  - Block exit
  - Raise alert only
  - Allow manual override
- Similar configurable mismatch handling should apply to AI-based mismatches such as:
  - Vehicle color mismatch
  - Vehicle type mismatch

## Billing and Tariffs

The system should support configurable billing models, including:

- Hourly billing
- Flat fee
- Daily rate
- Lost ticket fee
- Grace period
- Special rates by vehicle type
- Special rates by time of day

Customers should also be able to customize tariff rules such as:

- Rate slabs
- Free minutes
- Overnight charges
- Weekend pricing
- Holiday pricing
- Discounts
- Validations

## Payments

- Payment methods should be configurable per customer or site
- Platform should support a mix of payment methods as needed
- Prepaid parking should be supported
- Postpaid parking should be supported

## Hardware and Device Support

The platform should support configurable hardware combinations, including:

- ANPR cameras
- Vehicle overview cameras
- Barrier gates or access control
- Ticket printers
- QR or barcode scanners
- Payment kiosks
- POS devices
- LED displays

Hardware integration approach:

- Modular connectors or adapters
- Support different brands and models by customer need

## Priority Integrations for First Release

These were identified as first-phase integrations:

- Payment gateway integration
- SMS and email notifications
- Camera and ANPR device integration
- Basic access control or barrier integration

Later-phase integrations may include:

- Accounting systems
- ERP systems
- Additional third-party ecosystem integrations

## Parking Products to Support

Version planning direction:

- Support short-term visitor parking
- Support subscription and permit parking

## Subscription and Permit Support

The platform should support:

- Monthly parking
- Staff permits
- Resident permits
- Reserved-slot access

Access credentials should support any configurable combination of:

- Plate number
- QR code
- RFID or card
- Mobile app credential

## Exception Handling

System should handle:

- Unreadable number plates
- Duplicate entries
- Lost tickets
- Overstays
- Manual overrides
- Blacklist alerts
- Barrier failures
- Device failures

## Offline Operation

- Site-level operations should continue during internet outages
- Essential offline capabilities should include:
  - Vehicle entry
  - Vehicle exit
  - Ticket or session lookup
  - Barrier control
- Data should sync back to the central platform after connectivity is restored

## Notifications

The platform should support notifications for:

- Successful entry
- Payment confirmation
- Subscription expiry
- Lost ticket handling
- Blacklist alert
- System issues
- Device issues

Delivery channels discussed:

- SMS
- Email

## Branding and White-Labeling

Per-customer white-labeling should be supported for:

- Logo
- Company name
- Ticket format
- SMS templates
- Email templates
- Customer-facing screens

## Reporting and Dashboards

Important reports and analytics to support:

- Current occupancy
- Entry and exit logs
- Revenue summary
- Active vehicles currently inside
- Cashier collection
- Subscription usage
- Exception logs
- Audit history

Priority dashboards:

- Live occupancy
- Live gate activity
- Today's revenue
- Exception alerts
- Device health

Report capabilities:

- Scheduled reports
- Exportable reports
- Daily, weekly, and monthly delivery
- PDF export
- Excel export

## Audit and Compliance

The system should keep a full audit trail for:

- Configuration changes
- Tariff updates
- Manual overrides
- Payments
- User actions

Sensitive manual override scenarios identified so far:

- Plate mismatch handling
- Lost ticket handling
- Fee waivers
- Forced barrier opening

## Language and Currency

- Multi-language support is not needed for now
- Multi-currency support is not needed for now

## Current Assumptions

- The platform is intended to be highly configurable rather than hardcoded for one parking business model
- Default or basic features will be included for normal parking operations
- Advanced or complex features should be licensable add-ons sold by the platform owner
- Customer needs may vary widely, so modular architecture is important

## Open Questions for Later Requirement Sessions

- Detailed user role definitions and permission matrix
- Exact ticket format and session model
- Payment journey details by scenario
- Subscription lifecycle rules
- Tariff builder behavior and rule precedence
- Detailed offline sync and conflict rules
- Hardware vendor priorities and integration protocols
- Notification triggers, templates, and delivery rules
- Report field definitions and filters
- Customer onboarding flow
- White-label limits and branding rules
- Security, compliance, and data retention requirements
- Integration priority split between version 1 and later phases
- Approval workflow for sensitive manual overrides
