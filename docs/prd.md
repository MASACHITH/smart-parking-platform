# Product Requirements Document

## Product Name

Smart Parking Platform

## Document Status

Draft v1

## Document Date

2026-03-16

## 1. Overview

The Smart Parking Platform is a modern, configurable, multi-tenant parking management and ticketing platform that can be sold to multiple customers across different industries. The product will support configurable parking operations, device integrations, billing models, AI-assisted vehicle detection, white-label branding, and licensed feature enablement.

The platform is intended to serve customers with different operational models without requiring a separate product build for each customer. Instead, behavior should be controlled through tenant, site, zone, role, and feature configuration.

## 2. Business Goals

- Reduce manual work at parking sites
- Improve accuracy of vehicle capture and parking records
- Increase revenue control and billing reliability
- Speed up vehicle processing at entry and exit
- Enable the product to be sold to multiple customers using the same core platform
- Support upselling through licensed advanced features

## 3. Product Objectives

- Provide a configurable end-to-end parking flow for entry, stay, payment, and exit
- Support multiple customers with strict tenant isolation
- Allow platform-level licensing of optional modules
- Support both cloud and on-premise deployment models
- Integrate with parking hardware and operational devices
- Provide live operational visibility and reporting
- Support offline-capable site operations with later synchronization

## 4. Target Customers

The platform is intended for a broad set of parking operators and site owners, including but not limited to:

- Shopping malls
- Hospitals
- Hotels
- Office buildings
- Residential complexes
- Airports
- Mixed-use properties
- Any other customer requiring configurable parking operations

The product should be generic enough to support varied customer scenarios through configuration rather than hardcoded workflows.

## 5. Scope

### In Scope

- Multi-tenant parking management
- Multi-site support per customer
- Multi-zone support within a site
- Visitor parking
- Subscription and permit parking
- Configurable entry and exit flow
- Ticket, plate, and QR-based identification
- Payment calculation and collection workflows
- Configurable tariff engine
- Hardware integration framework
- Payment gateway integration
- SMS and email notifications
- Camera and ANPR integration
- Basic barrier or access control integration
- White-label branding
- Reports and dashboards
- Audit trail
- Offline site operations with sync

### Out of Scope for Current Draft

- Multi-language support
- Multi-currency support
- Detailed accounting and ERP integrations for version 1
- Final hardware vendor-specific implementation detail
- Final approval workflow detail for every override scenario

## 6. Product Model

### Multi-Tenant Structure

- One platform instance should support multiple customers
- Each customer should have strict logical data isolation
- Each customer may operate multiple parking sites
- Each site may have multiple zones or parking areas

### Licensing Model

- Platform admin controls tenant creation and feature licensing
- Each customer can access only the features they have purchased
- Customer admins can configure and use licensed features only
- Basic features should support standard parking operations
- Advanced features should be available as add-on modules

## 7. User Types

### Platform-Side Users

- Platform admin

### Customer-Side Users

- Customer admin
- Entry gate staff
- Exit or cashier staff
- Supervisors
- Security officers
- Back-office managers

Note: Role definitions and permission matrices remain to be detailed in later requirement sessions.

## 8. Functional Requirements

### 8.1 Vehicle Entry Management

The system shall support vehicle entry processing with configurable behavior per customer or site.

- Capture vehicle arrival at entry
- Detect and verify number plate if enabled
- Capture vehicle photo if enabled
- Detect vehicle color and type using AI if enabled
- Save captured data to the database
- Create a parking ticket or parking session
- Support automatic or staff-confirmed entry creation
- Support fallback flow when the plate is unreadable

### 8.2 Vehicle Exit Management

The system shall support vehicle exit processing with configurable automation levels.

- Identify the active parking session
- Support session lookup using a configurable combination of ticket, plate number, and QR code
- Allow customer-configured identifier priority order
- Calculate fee based on tariff rules
- Complete payment if required
- Allow automatic exit or staff-assisted exit
- Trigger barrier opening or exit approval after validation

### 8.3 Parking Session Identification

- The platform shall support multiple identifiers for the same session
- Supported identifiers for version 1 should include printed ticket, plate number, and QR code
- Customer configuration shall determine which identifiers are enabled
- Customer configuration shall determine exit lookup priority when multiple identifiers are available

### 8.4 Number Plate Recognition

- The platform shall support ANPR or number plate recognition as an optional feature
- The feature may be configured for validation only, session lookup, entry automation, exit automation, or disabled
- When plate recognition is enabled and the plate is unreadable, fallback handling shall be supported

### 8.5 Vehicle Photo and AI Detection

- Vehicle photo capture shall be independently configurable
- AI vehicle color detection shall be independently configurable
- AI vehicle type detection shall be independently configurable
- AI outputs may be used for record keeping, pricing, alerts, and security checks

### 8.6 Mismatch and Exception Handling

The platform shall support configurable exception handling rules.

- Handle unreadable number plates
- Handle duplicate entries
- Handle lost tickets
- Handle overstays
- Handle blacklist alerts
- Handle barrier and device failures
- Allow configurable actions for plate mismatches at exit
- Allow similar configurable actions for AI mismatches such as color or type mismatch
- Support manual overrides where permitted

### 8.7 Billing and Tariff Management

The system shall support configurable billing models and tariff rules.

Supported models should include:

- Hourly billing
- Flat fee
- Daily rate
- Lost ticket fee
- Grace periods
- Time-based special rates
- Vehicle-type-based special rates

Supported rule capabilities should include:

- Rate slabs
- Free minutes
- Overnight charges
- Weekend pricing
- Holiday pricing
- Discounts
- Validations

### 8.8 Payments

- The platform shall support prepaid and postpaid parking
- Payment methods shall be configurable per customer or site
- The platform shall support a mix of payment methods based on configuration
- Payment gateway integration shall be included in the first release

### 8.9 Subscription and Permit Management

The platform shall support non-visitor parking products, including:

- Monthly parking
- Staff permits
- Resident permits
- Reserved-slot access

Access credentials may include any configurable combination of:

- Plate number
- QR code
- RFID or card
- Mobile credential

### 8.10 Customer Configuration

The platform shall support customer-specific configuration for:

- Enabled modules
- Site setup
- Zone setup
- Roles and permissions
- Hardware setup
- Tariffs
- Branding
- Identification methods
- Entry and exit workflow options
- Notification settings

### 8.11 Hardware and Device Integration

The platform shall support modular device integration for:

- ANPR cameras
- Overview cameras
- Barrier gates or access control
- Ticket printers
- QR or barcode scanners
- Payment kiosks
- POS devices
- LED displays

The architecture should support different brands and models through modular connectors or adapters.

### 8.12 Notifications

The platform shall support SMS and email notifications for events such as:

- Successful entry
- Payment confirmation
- Subscription expiry
- Lost ticket handling
- Blacklist alerts
- System issues
- Device issues

### 8.13 Reporting and Dashboards

The platform shall provide dashboards and reports for operational and management users.

Priority dashboards:

- Live occupancy
- Live gate activity
- Today's revenue
- Exception alerts
- Device health

Priority reports:

- Current occupancy
- Entry and exit logs
- Revenue summary
- Active vehicles inside
- Cashier collection
- Subscription usage
- Exception logs
- Audit history

Report delivery and export:

- Daily, weekly, and monthly scheduling
- PDF export
- Excel export

### 8.14 White-Label Branding

The platform shall support per-customer branding for:

- Logo
- Company name
- Ticket format
- SMS templates
- Email templates
- Customer-facing screens

### 8.15 Audit Trail

The platform shall maintain an audit trail for:

- Configuration changes
- Tariff updates
- Manual overrides
- Payments
- User actions

### 8.16 Offline Operation

- Site operations shall continue during temporary internet outages
- Offline support shall include vehicle entry, vehicle exit, session lookup, and barrier control
- Data generated offline shall synchronize to the central platform after connectivity is restored

## 9. Integration Requirements

### Version 1 Priority Integrations

- Payment gateway integration
- SMS and email gateway integration
- Camera and ANPR integration
- Basic access control or barrier integration

### Later-Phase Integrations

- Accounting systems
- ERP systems
- Additional ecosystem integrations

## 10. Non-Functional Requirements

### Security

- Strict tenant data isolation is mandatory
- Access shall be role-based
- Sensitive actions should be auditable

### Availability

- Core site operations should continue even during temporary connectivity loss

### Configurability

- The platform should minimize hardcoded customer-specific behavior
- Most business behavior should be managed through configuration

### Scalability

- The product should support onboarding multiple customers and multiple sites per customer

### Deployability

- The product should support both SaaS and on-premise deployment models

## 11. Assumptions

- A modern parking operation may use a mix of manual and automated flows
- Customers will have different hardware vendors and operational policies
- Not every customer will purchase advanced AI, hardware, or automation modules
- Basic visitor parking and subscription parking should both be supported by the product direction

## 12. Dependencies

- Availability of supported camera and ANPR devices
- Availability of barrier or access control hardware APIs or protocols
- Payment gateway provider selection
- SMS and email provider selection
- Final deployment architecture decisions for SaaS and on-premise

## 13. Risks

- Wide configurability may increase product complexity if not modeled carefully
- Hardware vendor variation may increase integration effort
- Offline sync design may become complex if not constrained early
- Tariff flexibility may become difficult to maintain without a clear rule model
- Licensing and configuration boundaries must be clearly separated

## 14. Open Items

- Detailed permission matrix by role
- Detailed workflow for approval-based manual overrides
- Session lifecycle design and ticket format standards
- Detailed payment journey by scenario
- Subscription lifecycle and renewal rules
- Tariff rule precedence and conflict handling
- Offline sync conflict rules
- Device vendor priorities
- Notification template rules
- Detailed report fields and filters
- Data retention and compliance requirements

## 15. Recommended Version 1 Focus

For the first implementation phase, prioritize:

- Core visitor and subscription parking flow
- Entry and exit management
- Configurable tariff and payment support
- Payment gateway integration
- SMS and email notifications
- Camera and ANPR integration
- Basic access control or barrier integration
- Essential reports and dashboards
- Tenant, site, and licensing foundations
- Offline-capable site operation
