Smart Parking Platform Configuration Model

Document Date: 2026-03-17
Status: Draft

1. Purpose

This document defines how configuration should be structured for the Smart Parking Platform so the product can support many customer scenarios without hardcoded behavior.

2. Configuration Principles

- Configuration should drive customer behavior wherever practical
- Licensing and configuration must remain separate concerns
- Configuration should support inheritance from broader scope to narrower scope
- Safe defaults should exist for standard parking operations
- Advanced configuration should be available only when the related feature is licensed
- Configuration changes should be auditable

3. Conceptual Hierarchy

The recommended hierarchy is:

1. Platform level
2. Tenant or customer level
3. Site level
4. Zone level
5. Device level
6. Role level

This hierarchy allows broad defaults while still supporting local exceptions.

4. Separation of Licensing and Configuration

Licensing answers:

- Is the feature purchased?
- Is the feature available to this customer?

Configuration answers:

- How should the enabled feature behave?
- Where should it apply?
- Who can use it?

Example:

- A customer may purchase ANPR
- The customer can then configure ANPR for one site only
- One zone may use ANPR for validation only
- Another zone may use ANPR for automated entry and exit

5. Configuration Layers

5.1 Platform-Level Configuration

Used by platform admin for global defaults and platform behavior.

Examples:

- Supported deployment mode settings
- Global feature catalog
- Default role templates
- Global branding rules if any
- Integration provider definitions
- Default notification provider settings

5.2 Customer-Level Configuration

Used to define how a specific customer uses the platform.

Examples:

- Licensed modules available to the customer
- Customer branding
- Customer default workflow rules
- Customer default tariff settings
- Customer default notification settings
- Customer user roles and permissions

5.3 Site-Level Configuration

Used where each parking site needs different behavior.

Examples:

- Enabled identifiers at the site:
  - Ticket
  - Plate
  - QR
- Entry mode:
  - Automatic
  - Manual
- Exit mode:
  - Automatic
  - Manual
- Enabled payment methods
- Enabled hardware at the site
- Site-specific tariffs
- Site-specific notification rules

5.4 Zone-Level Configuration

Used when one site contains parking areas with distinct rules.

Examples:

- VIP zone pricing
- Reserved zone restrictions
- Visitor zone behavior
- Staff zone access rules
- Zone-specific device assignment
- Zone-specific automation settings

5.5 Device-Level Configuration

Used to manage device-specific behavior and mapping.

Examples:

- Device type
- Vendor or model
- Device status
- Site assignment
- Zone assignment
- Connector type
- Device-specific operational parameters

5.6 Role-Level Configuration

Used to control access and operational permissions.

Examples:

- Role name
- Allowed screens
- Allowed actions
- Approval rights
- Override rights
- Report access

6. Configuration Domains

The configuration model should be organized into the following domains.

6.1 Feature Configuration

Controls feature behavior after licensing.

Examples:

- Enable or disable number plate recognition
- Enable or disable photo capture
- Enable or disable AI color detection
- Enable or disable AI vehicle type detection
- Enable or disable subscriptions
- Enable or disable white-label branding

6.2 Workflow Configuration

Controls operational flow.

Examples:

- Automatic or manual entry
- Automatic or manual exit
- Staff confirmation required or not
- Fallback flow for unreadable plates
- Exit action for mismatches

6.3 Identifier Configuration

Controls how parking sessions are identified.

Examples:

- Enable ticket lookup
- Enable plate lookup
- Enable QR lookup
- Define lookup priority order
- Define mandatory versus optional identifier rules

6.4 Tariff Configuration

Controls billing behavior.

Examples:

- Tariff type
- Rate slabs
- Grace period
- Free minutes
- Overnight pricing
- Weekend pricing
- Holiday pricing
- Discounts
- Validation rules

6.5 Payment Configuration

Controls supported payment scenarios.

Examples:

- Prepaid enabled or disabled
- Postpaid enabled or disabled
- Cash enabled or disabled
- Card enabled or disabled
- Digital payments enabled or disabled
- Gateway provider mapping

6.6 Notification Configuration

Controls communication behavior.

Examples:

- SMS enabled or disabled
- Email enabled or disabled
- Trigger events
- Template selection
- Recipient rules

6.7 Hardware Configuration

Controls connected devices and automation behavior.

Examples:

- Camera enabled or disabled
- ANPR enabled or disabled
- Barrier enabled or disabled
- Ticket printer enabled or disabled
- Scanner enabled or disabled
- Device-to-gate mapping

6.8 Security and Access Configuration

Controls access and sensitive operations.

Examples:

- Role permission rules
- Manual override rights
- Audit requirements
- Sensitive action controls

7. Suggested Inheritance Model

Recommended rule:

- Platform default can be overridden by customer
- Customer default can be overridden by site
- Site default can be overridden by zone
- Device settings apply only to that device
- Role permissions apply only to users assigned to that role

Recommended precedence:

1. Device-specific setting if relevant
2. Zone setting
3. Site setting
4. Customer setting
5. Platform default

8. Example Configuration Scenarios

8.1 Basic Customer

- Ticket enabled
- Plate recognition disabled
- AI features disabled
- Manual entry and manual exit
- Flat fee billing
- Basic reports only

8.2 Automated Mall Customer

- Ticket, plate, and QR enabled
- Plate lookup priority first
- ANPR enabled for entry and exit
- Vehicle photo capture enabled
- AI color and type enabled
- Hourly tariff with grace period
- Payment gateway enabled
- Barrier automation enabled

8.3 Mixed Site Customer

- Customer has ANPR licensed
- Site A uses ANPR and barrier automation
- Site B uses ticket and manual entry
- VIP zone has special pricing
- Staff zone uses permit access only

9. Recommended Configuration Entities

The product should likely maintain separate configuration entities for:

- Tenant configuration
- Site configuration
- Zone configuration
- Device configuration
- Role configuration
- Tariff configuration
- Notification configuration
- Branding configuration
- Integration configuration
- Feature license mapping

10. Audit Requirements for Configuration

Configuration changes should record:

- Who changed the value
- When it was changed
- What changed
- Old value
- New value
- Scope of the change:
  - Customer
  - Site
  - Zone
  - Device

11. Guardrails

- Users must not configure features they have not licensed
- Invalid combinations should be blocked where possible
- Dangerous changes should require appropriate permissions
- Defaults should support a minimal working parking setup
- Configuration should remain understandable to non-technical customer admins

12. Open Design Questions

- Which settings can be changed live versus requiring maintenance mode?
- Which settings require approval workflows?
- How should conflicting tariff rules be resolved?
- Which configuration changes should trigger immediate notifications?
- How should offline sites receive and apply configuration updates?

13. Recommendation

The platform should use a layered configuration model with licensing gates, inheritance, and clear override rules. This will allow the same product to support simple customers and advanced customers without branching the codebase into many custom versions.

