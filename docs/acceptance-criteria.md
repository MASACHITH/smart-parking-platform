# Smart Parking Platform Acceptance Criteria

## Purpose

This document defines acceptance criteria for the Smart Parking Platform based on the PRD, epics, and user stories. Criteria are grouped by functional area so product, engineering, QA, and stakeholders can validate scope consistently.

## Usage

- Use this document with [prd.md](/d:/Development/Web/smart-parking-platform/docs/prd.md), [epics.md](/d:/Development/Web/smart-parking-platform/docs/epics.md), and [user-stories.md](/d:/Development/Web/smart-parking-platform/docs/user-stories.md).
- Detailed test cases can be derived from these criteria later.
- References to user stories are included as coverage pointers, not as exhaustive test cases.

## AC-01 Multi-Tenant Platform Foundation

Related stories: US-001 to US-006

- A platform admin can create a new customer tenant with a unique identity.
- A created tenant has its own isolated data boundary.
- Users from one tenant cannot view or modify data belonging to another tenant.
- A tenant can contain multiple parking sites.
- A site can contain multiple parking zones.
- The product can be deployed in both SaaS and on-premise models without changing core business behavior.

## AC-02 Platform Administration and Feature Licensing

Related stories: US-007 to US-010

- A platform admin can assign licensed modules to a customer.
- A customer can access only modules assigned through licensing.
- Unlicensed modules are hidden, blocked, or otherwise unavailable for use.
- A platform admin can review the current licensed feature set for any customer.
- Global platform settings can be managed separately from customer-level settings.

## AC-03 Customer Administration, Roles, and Permissions

Related stories: US-011 to US-015

- A customer admin can create, update, deactivate, and manage users for their own tenant only.
- A customer admin can create or configure customer-specific roles.
- Permissions can be assigned to roles.
- Users are limited to the functions allowed by their assigned role.
- Unauthorized users cannot perform restricted actions even if they try to access them directly.

## AC-04 Customer Configuration and White-Labeling

Related stories: US-016 to US-022

- Customer admins can configure only licensed features.
- Site-level and zone-level configuration can override broader defaults where allowed.
- Entry and exit workflow behavior can be configured per customer or site.
- Branding settings such as logo, company name, ticket format, and message templates can be stored per customer.
- Customer-facing outputs reflect the configured branding for that customer.

## AC-05 Site, Zone, and Device Setup

Related stories: US-023 to US-027

- A customer admin can create, edit, activate, and deactivate sites.
- A customer admin can create, edit, activate, and deactivate zones within a site.
- Devices can be registered with metadata such as type, model, and assignment.
- Devices can be assigned to a site.
- Devices can be assigned to a zone when zone-level use is needed.
- Site and zone setup data is available for operational workflows.

## AC-06 Vehicle Entry Processing

Related stories: US-028 to US-032

- The system can register a vehicle entry event and start a parking session.
- Entry processing supports fully automatic mode when configured.
- Entry processing supports manual or staff-confirmed mode when configured.
- Entry data is stored against the parking session.
- If number plate reading fails, the system supports configured fallback behavior without blocking normal operation.
- A valid session record is created before the vehicle is considered parked.

## AC-07 Parking Session Identification and Tracking

Related stories: US-033 to US-038

- The system supports session lookup by printed ticket when enabled.
- The system supports session lookup by plate number when enabled.
- The system supports session lookup by QR code when enabled.
- More than one identifier can be enabled for a customer or site.
- Lookup priority can be configured when multiple identifiers are enabled.
- Session state can be tracked from entry to exit.

## AC-08 Number Plate Recognition and Verification

Related stories: US-039 to US-043

- Number plate recognition can be enabled or disabled by customer or site.
- Plate recognition can operate in validation-only mode.
- Plate recognition can be used for session lookup when configured.
- Plate recognition can be used for entry automation when configured.
- Plate recognition can be used for exit automation when configured.
- If ANPR is disabled, related workflows continue using other configured identifiers.

## AC-09 Vehicle Photo Capture and AI Detection

Related stories: US-044 to US-048

- Vehicle photo capture can be enabled independently of AI features.
- AI color detection can be enabled independently.
- AI vehicle type detection can be enabled independently.
- Captured images and AI outputs are stored with the relevant session when enabled.
- AI outputs can be made available for records, pricing logic, mismatch handling, or security rules based on configuration.

## AC-10 Vehicle Exit Processing and Barrier Release

Related stories: US-049 to US-054

- The system can identify an active parking session at exit using configured identifiers.
- Charges are calculated before exit completion when payment is required.
- Exit can run in automatic mode when configured.
- Exit can run in staff-assisted mode when configured.
- Barrier release or equivalent access approval occurs only after configured exit conditions are satisfied.
- The parking session is closed after successful exit completion.

## AC-11 Exception Handling and Manual Overrides

Related stories: US-055 to US-062

- The system can detect duplicate entry attempts.
- The system can support a lost-ticket process.
- The system can flag overstays when configured rules are met.
- The system can raise alerts for blacklisted vehicles.
- Plate mismatch behavior can be configured to block exit, raise an alert, or allow manual override.
- AI mismatch behavior can be configured similarly.
- Manual overrides are available only to authorized users.
- Manual overrides require reason capture for auditability where configured.

## AC-12 Tariff Management and Billing Rules

Related stories: US-063 to US-070

- The system supports hourly, flat-fee, daily, and lost-ticket pricing models.
- Grace periods can be configured and applied.
- Special rates by time and by vehicle type can be configured.
- Rate slabs, free minutes, overnight pricing, weekend pricing, holiday pricing, discounts, and validations can be configured.
- The system applies tariff rules automatically during fee calculation.
- Fee calculation results are consistent with the active tariff rules.

## AC-13 Payments and Revenue Collection

Related stories: US-071 to US-077

- The system supports prepaid and postpaid parking scenarios.
- Payment methods can be configured by customer or site.
- A payment can be linked to the correct parking session.
- Exit users can view payment status before approving exit.
- Payment gateway integration supports digital payment confirmation.
- Revenue data is available for operational and reporting use.

## AC-14 Subscription and Permit Parking

Related stories: US-078 to US-084

- Customer admins can create subscription or permit products.
- A subscription can be assigned to a user, vehicle, or equivalent customer record.
- Access can be granted through one or more supported credentials:
  - Plate number
  - QR code
  - RFID or card
  - Mobile credential
- Subscription status and usage can be tracked.
- Subscription parking can coexist with visitor parking on the same platform.

## AC-15 Hardware and Device Integration Framework

Related stories: US-085 to US-091

- The system supports a modular connector approach for hardware integration.
- ANPR cameras can be integrated through the connector framework.
- Overview cameras can be integrated through the connector framework.
- Barrier or access control devices can be integrated through the connector framework.
- Ticket printers, scanners, payment devices, and LED displays can be integrated as supported device types.
- Device integration failures can be surfaced for operational handling.

## AC-16 Notifications and Customer Communications

Related stories: US-092 to US-097

- SMS and email are supported notification channels for version 1.
- Notifications can be triggered for configured business and operational events.
- Entry confirmation and payment confirmation can be sent when enabled.
- Subscription expiry reminders can be sent when enabled.
- Alerts can be sent for blacklist, system, and device issues when enabled.
- Customer communication templates can be branded per customer.

## AC-17 Reporting, Dashboards, and Exports

Related stories: US-098 to US-108

- The platform provides dashboards for live occupancy, live gate activity, today's revenue, exception alerts, and device health.
- The platform provides reports for occupancy, entry and exit logs, revenue, active vehicles, cashier collection, subscription usage, exception logs, and audit history.
- Reports can be exported in PDF format.
- Reports can be exported in Excel format.
- Reports can be scheduled for daily, weekly, or monthly delivery.
- Report access follows user role permissions.

## AC-18 Audit Trail and Operational Compliance

Related stories: US-109 to US-113

- The system records audit entries for configuration changes.
- The system records audit entries for tariff changes.
- The system records audit entries for manual overrides.
- The system records audit entries for payment events.
- The system records audit entries for key user actions.
- Audit records are available for authorized review.

## AC-19 Offline Operations and Data Synchronization

Related stories: US-114 to US-118

- Site operations can continue during temporary internet loss for essential functions:
  - Vehicle entry
  - Vehicle exit
  - Session lookup
  - Barrier control
- Offline-created operational records are retained locally until connectivity returns.
- The system synchronizes offline records back to the central platform after reconnection.
- Offline synchronization does not create silent data loss.

## AC-20 Security, Access Boundaries, and Platform Resilience

Related stories: US-119 to US-122

- Tenant boundaries are enforced across all supported operations.
- Role-based access control is enforced consistently.
- Sensitive operations are protected and auditable.
- The platform supports reliable operation across multiple customer sites and connected devices.

## Version 1 Exit Criteria

Version 1 can be considered functionally ready when:

- Core multi-tenant foundations are complete
- Customer licensing and configuration are working
- Site, zone, and device setup are available
- Entry and exit processing are operational
- Tariff and payment flows are working
- Payment gateway, SMS or email, ANPR or camera, and barrier integrations are available at the basic supported level
- Essential reporting, audit, and offline operations are available
- Tenant isolation and role-based access are enforced

