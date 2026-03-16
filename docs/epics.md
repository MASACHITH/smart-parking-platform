# Smart Parking Platform Epics

## Purpose

This document breaks the PRD into a complete set of implementation epics for the Smart Parking Platform. The epics are ordered to support practical delivery planning, starting with platform foundations and then moving into operational capabilities, integrations, reporting, and advanced controls.

## Epic Ordering Logic

The epic order is based on delivery dependency:

1. Platform and tenant foundations
2. Customer configuration and licensing
3. Site and operational setup
4. Core parking operations
5. Payments and tariffs
6. Hardware and automation
7. Cross-cutting controls, reporting, and resilience

## EPIC-01 Multi-Tenant Platform Foundation

### Goal

Establish the core platform architecture required to support multiple customers, strict data isolation, and flexible deployment models.

### Business Value

This enables the product to be sold as a reusable platform instead of a one-off project for a single customer.

### Scope

- Multi-tenant architecture
- Tenant data isolation
- Tenant provisioning model
- Customer account structure
- Support for multiple sites per customer
- Support for multiple zones within a site
- SaaS deployment support
- On-premise deployment support

### Outcomes

- Each customer has isolated access to its own data
- One customer can operate multiple sites
- One site can operate multiple parking zones
- Platform deployment supports both SaaS and on-premise scenarios

## EPIC-02 Platform Administration and Feature Licensing

### Goal

Provide platform-level administration capabilities to create customers, assign licensed features, and control what each customer can use.

### Business Value

This supports the commercial model where standard features are included and advanced features are sold as add-ons.

### Scope

- Platform admin account capabilities
- Customer or tenant creation
- Feature licensing and module enablement
- Global settings management
- Control of purchased versus non-purchased features

### Outcomes

- Platform admins can onboard a new customer
- Platform admins can enable or disable licensed modules by customer
- Customers can use only the features they purchased

## EPIC-03 Customer Administration, Roles, and Permissions

### Goal

Enable each customer to manage their own operational users, role setup, and site-level administration within licensed boundaries.

### Business Value

Customers need to operate the product independently without depending on the platform owner for daily administration.

### Scope

- Customer admin management
- Configurable customer roles
- Permission assignment by role
- Site-level user administration
- Access control for operational users

### Outcomes

- Customers can manage their own users
- Roles can be configured per customer
- Users can access only permitted functions

## EPIC-04 Customer Configuration and White-Labeling

### Goal

Allow each customer to configure product behavior, enabled workflows, branding, and operational settings according to their business model and purchased features.

### Business Value

This makes the platform adaptable across many customer types without custom development for every implementation.

### Scope

- Feature-level configuration
- Workflow configuration
- Site-specific configuration
- Zone-specific configuration
- Branding configuration
- Ticket format configuration
- SMS template configuration
- Email template configuration
- Customer-facing screen branding

### Outcomes

- Customers can tailor licensed features to their sites
- White-label branding is supported per customer
- Operational behavior can vary by customer, site, or zone

## EPIC-05 Site, Zone, and Device Setup

### Goal

Enable setup of physical parking locations, operational zones, and device assignments needed for real-world parking operations.

### Business Value

Customers need a structured way to model their parking estate and connect it to site hardware.

### Scope

- Site creation and management
- Zone creation and management
- Device registration
- Device-to-site mapping
- Device-to-zone mapping
- Site-specific configuration
- Zone-specific rules

### Outcomes

- A customer can set up multiple sites
- Each site can contain multiple parking zones
- Devices can be assigned to the correct operational location

## EPIC-06 Vehicle Entry Processing

### Goal

Support configurable vehicle entry workflows that capture vehicle details and create a valid parking session.

### Business Value

This is one of the core operational capabilities needed for a working parking platform.

### Scope

- Vehicle arrival detection
- Vehicle detail capture
- Parking session creation
- Automatic entry flow
- Manual or staff-confirmed entry flow
- Fallback handling for unreadable plate scenarios

### Outcomes

- Vehicles can be admitted into parking through configured workflows
- A valid parking session is created at entry
- Entry can continue even when some automated data is unavailable

## EPIC-07 Parking Session Identification and Tracking

### Goal

Provide a flexible session identity model so the system can consistently find and manage active parking sessions across entry, stay, and exit.

### Business Value

Parking operations depend on reliable lookup of a vehicle’s active session regardless of the customer’s preferred identifier.

### Scope

- Session creation and lifecycle tracking
- Printed ticket support
- Plate number support
- QR code support
- Configurable identifier combinations
- Configurable lookup priority at exit

### Outcomes

- Sessions can be identified by one or more configured methods
- Exit lookup follows customer-defined priority rules
- The system can reliably trace a vehicle’s active parking record

## EPIC-08 Number Plate Recognition and Verification

### Goal

Support configurable number plate recognition and verification across entry and exit operations.

### Business Value

ANPR improves speed, accuracy, and automation for customers who purchase it.

### Scope

- Plate detection
- Plate verification
- Validation-only mode
- Session lookup by plate
- Entry automation by plate
- Exit automation by plate
- Disabled mode when not licensed or not needed

### Outcomes

- Customers can enable plate recognition in different operational modes
- Plate recognition can be used to speed up entry and exit
- Plate-based session lookup is supported when configured

## EPIC-09 Vehicle Photo Capture and AI Detection

### Goal

Support optional capture and AI enrichment of vehicle data during parking operations.

### Business Value

This improves record quality and enables advanced checks, pricing, and security features for customers who require them.

### Scope

- Vehicle photo capture
- AI vehicle color detection
- AI vehicle type detection
- Independent enablement of photo and AI features
- Use of AI results for record keeping
- Use of AI results for security and pricing rules

### Outcomes

- Vehicle photos can be stored with parking sessions
- AI-derived vehicle attributes can be captured when enabled
- Customers can choose whether and how to use AI results

## EPIC-10 Vehicle Exit Processing and Barrier Release

### Goal

Support configurable exit workflows that validate the parking session, confirm payment status, and release the vehicle.

### Business Value

Exit processing is essential for customer satisfaction, security, and revenue control.

### Scope

- Session lookup at exit
- Exit validation
- Automatic exit flow
- Manual or staff-assisted exit flow
- Barrier release or access approval
- Final session closure

### Outcomes

- Vehicles can exit through configured automated or manual flows
- Exit is tied to validation and payment rules
- Barriers can be opened when exit conditions are satisfied

## EPIC-11 Exception Handling and Manual Overrides

### Goal

Handle abnormal parking scenarios safely while preserving operational continuity and auditability.

### Business Value

Real parking sites encounter exceptions every day, so the system must handle them without breaking operations.

### Scope

- Unreadable number plates
- Duplicate entries
- Lost tickets
- Overstays
- Plate mismatches
- AI mismatches
- Blacklist alerts
- Barrier failures
- Device failures
- Manual override support

### Outcomes

- The system can handle common operational exceptions
- Customers can configure how certain mismatches are treated
- Manual interventions remain available where permitted

## EPIC-12 Tariff Management and Billing Rules

### Goal

Provide a configurable tariff framework that supports multiple parking billing models and customer-specific pricing rules.

### Business Value

Flexible pricing is required to support different business models and customer contracts.

### Scope

- Hourly pricing
- Flat fee pricing
- Daily pricing
- Lost ticket fees
- Grace periods
- Special rates by time
- Special rates by vehicle type
- Rate slabs
- Free minutes
- Overnight pricing
- Weekend pricing
- Holiday pricing
- Discounts
- Validations

### Outcomes

- Customers can configure tariffs to match their business model
- Fees are calculated consistently according to configured rules
- The platform supports both simple and more complex parking charges

## EPIC-13 Payments and Revenue Collection

### Goal

Support parking payment workflows and revenue capture across different customer operating models.

### Business Value

Revenue collection is central to parking operations and must be reliable, flexible, and auditable.

### Scope

- Prepaid parking support
- Postpaid parking support
- Multiple payment method configuration
- Payment status tracking
- Payment confirmation handling
- Revenue recording
- Payment gateway integration

### Outcomes

- Customers can support different payment models
- Payment can be collected and linked to the correct session
- Revenue data is available for audit and reporting

## EPIC-14 Subscription and Permit Parking

### Goal

Support recurring and non-visitor parking products alongside short-term visitor parking.

### Business Value

Many customers require staff, resident, or monthly parking products in addition to normal visitor parking.

### Scope

- Monthly parking
- Staff permits
- Resident permits
- Reserved-slot access
- Subscription credential management
- Access through plate, QR, RFID or card, and mobile credentials

### Outcomes

- Customers can manage subscription-based parking products
- Subscription users can be identified using configured credentials
- Visitor and permit parking can coexist on the same platform

## EPIC-15 Hardware and Device Integration Framework

### Goal

Provide a modular integration layer for parking hardware and related operational devices.

### Business Value

Customers use different vendors and device models, so the platform must integrate in a reusable and extensible way.

### Scope

- Modular connector architecture
- ANPR camera integration
- Overview camera integration
- Barrier integration
- Ticket printer integration
- QR or barcode scanner integration
- Payment kiosk integration
- POS device integration
- LED display integration

### Outcomes

- Device integration can be implemented per type and vendor
- Customers can use different device combinations
- Hardware support can grow without redesigning the entire platform

## EPIC-16 Notifications and Customer Communications

### Goal

Provide configurable operational and customer-facing notifications through supported communication channels.

### Business Value

Notifications improve transparency, reduce confusion, and help customers and operators react quickly to important events.

### Scope

- SMS notifications
- Email notifications
- Entry confirmation events
- Payment confirmation events
- Subscription expiry reminders
- Lost ticket events
- Blacklist alerts
- System issue alerts
- Device issue alerts

### Outcomes

- Important events can trigger customer or staff notifications
- Notification behavior can be aligned with customer needs
- Communication templates can be branded per customer

## EPIC-17 Reporting, Dashboards, and Exports

### Goal

Provide operational visibility and business reporting for customer teams and platform stakeholders.

### Business Value

Parking operators need real-time monitoring and historical insight to manage operations and revenue effectively.

### Scope

- Live occupancy dashboard
- Live gate activity dashboard
- Today's revenue dashboard
- Exception alerts dashboard
- Device health dashboard
- Occupancy reports
- Entry and exit logs
- Revenue reports
- Active vehicle reports
- Cashier collection reports
- Subscription usage reports
- Exception reports
- Audit history reports
- Scheduled report delivery
- PDF export
- Excel export

### Outcomes

- Users can monitor live operations
- Managers can review historical performance
- Reports can be exported or scheduled for delivery

## EPIC-18 Audit Trail and Operational Compliance

### Goal

Record important user and system actions for traceability, accountability, and compliance needs.

### Business Value

Auditability is essential for financial control, operational governance, and dispute handling.

### Scope

- Audit logging for configuration changes
- Audit logging for tariff updates
- Audit logging for manual overrides
- Audit logging for payments
- Audit logging for user actions

### Outcomes

- Sensitive changes and actions are traceable
- Customers can review critical operational events
- Disputes can be investigated with evidence

## EPIC-19 Offline Operations and Data Synchronization

### Goal

Ensure essential parking operations continue during connectivity loss and synchronize correctly when service is restored.

### Business Value

Parking sites cannot stop operating simply because internet access is temporarily unavailable.

### Scope

- Offline entry operation
- Offline exit operation
- Offline session lookup
- Offline barrier control
- Deferred synchronization to the central platform

### Outcomes

- Sites can continue core operations while offline
- Operational continuity is maintained during outages
- Records are synchronized back after reconnection

## EPIC-20 Security, Access Boundaries, and Platform Resilience

### Goal

Protect data, enforce access boundaries, and ensure the platform remains dependable across customers and deployment models.

### Business Value

Security and resilience are necessary for commercial trust and safe multi-customer operation.

### Scope

- Tenant access isolation
- Role-based access enforcement
- Protection of customer data boundaries
- Secure handling of sensitive operations
- Resilience considerations for distributed parking operations

### Outcomes

- Customers cannot access each other’s data
- Users can access only permitted functions
- Core platform trust and operational safety are strengthened

## Delivery Recommendation

Recommended implementation waves:

### Wave 1 Foundations

- EPIC-01 Multi-Tenant Platform Foundation
- EPIC-02 Platform Administration and Feature Licensing
- EPIC-03 Customer Administration, Roles, and Permissions
- EPIC-04 Customer Configuration and White-Labeling
- EPIC-05 Site, Zone, and Device Setup

### Wave 2 Core Operations

- EPIC-06 Vehicle Entry Processing
- EPIC-07 Parking Session Identification and Tracking
- EPIC-10 Vehicle Exit Processing and Barrier Release
- EPIC-11 Exception Handling and Manual Overrides
- EPIC-12 Tariff Management and Billing Rules
- EPIC-13 Payments and Revenue Collection

### Wave 3 Integrations and Extensions

- EPIC-08 Number Plate Recognition and Verification
- EPIC-09 Vehicle Photo Capture and AI Detection
- EPIC-14 Subscription and Permit Parking
- EPIC-15 Hardware and Device Integration Framework
- EPIC-16 Notifications and Customer Communications

### Wave 4 Operations, Trust, and Scale

- EPIC-17 Reporting, Dashboards, and Exports
- EPIC-18 Audit Trail and Operational Compliance
- EPIC-19 Offline Operations and Data Synchronization
- EPIC-20 Security, Access Boundaries, and Platform Resilience
