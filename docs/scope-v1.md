Smart Parking Platform Version 1 Scope

Document Date: 2026-03-17
Status: Draft

1. Purpose

This document defines what should be included in Version 1 of the Smart Parking Platform and what should be left for later phases. The goal is to keep the first release commercially useful, operationally complete, and realistically deliverable.

2. Version 1 Objective

Version 1 should deliver a usable, sellable parking platform with:

- Multi-tenant foundation
- Customer licensing and configuration
- Core entry and exit operations
- Visitor and subscription parking support
- Configurable tariff and payment support
- Priority hardware and communication integrations
- Essential reporting, audit, and offline capability

3. In Scope for Version 1

3.1 Platform Foundation

- Multi-tenant architecture
- Tenant data isolation
- SaaS deployment support
- On-premise deployment support
- Multiple sites per customer
- Multiple zones per site

3.2 Administration and Licensing

- Platform admin management of customers
- Feature licensing by customer
- Customer admin access
- Customer user and role management
- Role-based permission control

3.3 Configuration

- Customer-level configuration
- Site-level configuration
- Zone-level configuration
- Workflow configuration
- Branding and white-label basics
- Ticket format configuration
- Notification template configuration

3.4 Core Parking Operations

- Vehicle entry processing
- Vehicle exit processing
- Automatic and manual entry modes
- Automatic and manual exit modes
- Parking session creation and closure
- Session lookup by configurable combination of:
  - Ticket
  - Plate number
  - QR code
- Customer-configured lookup priority
- Fallback handling for unreadable plates

3.5 Number Plate and AI Features

- Number plate recognition as an optional configurable feature
- Plate-based validation
- Plate-based session lookup
- Plate-based entry automation
- Plate-based exit automation
- Vehicle photo capture as an optional configurable feature
- AI color detection as an optional configurable feature
- AI vehicle type detection as an optional configurable feature

3.6 Exception and Override Handling

- Duplicate entry handling
- Lost ticket handling
- Overstay handling
- Blacklist alerts
- Barrier failure handling
- Device failure handling
- Configurable plate mismatch handling
- Configurable AI mismatch handling
- Manual override support for authorized users
- Override reason capture

3.7 Tariffs and Billing

- Hourly pricing
- Flat fee pricing
- Daily rate pricing
- Lost ticket fee
- Grace periods
- Rate slabs
- Free minutes
- Overnight pricing
- Weekend pricing
- Holiday pricing
- Discounts
- Validations
- Special rates by time
- Special rates by vehicle type

3.8 Payments

- Prepaid parking support
- Postpaid parking support
- Configurable payment methods
- Payment status tracking
- Payment linked to parking sessions
- Payment gateway integration

3.9 Subscription and Permit Parking

- Monthly parking
- Staff permits
- Resident permits
- Reserved-slot access
- Access by configurable combination of:
  - Plate number
  - QR code
  - RFID or card
  - Mobile credential

3.10 Integrations

Priority version 1 integrations:

- Payment gateway integration
- SMS notification integration
- Email notification integration
- Camera and ANPR integration
- Basic barrier or access control integration

3.11 Reporting and Monitoring

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
- PDF export
- Excel export
- Scheduled report delivery

3.12 Audit and Security

- Audit trail for configuration changes
- Audit trail for tariff changes
- Audit trail for manual overrides
- Audit trail for payments
- Audit trail for user actions
- Strict tenant isolation
- Role-based access control

3.13 Offline Operation

- Continue site entry during internet outage
- Continue site exit during internet outage
- Continue session lookup during internet outage
- Continue barrier control during internet outage
- Synchronize offline records after reconnection

4. Out of Scope for Version 1

- Multi-language support
- Multi-currency support
- Advanced accounting integrations
- ERP integrations
- Large third-party ecosystem integrations beyond listed priorities
- Finalized vendor-specific support for every hardware brand
- Highly advanced approval workflow engine
- Deep analytics beyond core dashboards and operational reports

5. Version 1 Quality Bar

Version 1 should be considered acceptable when:

- The product can onboard and isolate multiple customers
- A customer can configure a site and start live parking operations
- Vehicles can enter, be tracked, charged, paid, and exit successfully
- Priority integrations function at a practical production-ready baseline
- Essential reporting, audit, and offline continuity are available

6. Version 1 Risks to Manage

- Too much configurability may slow delivery if not limited carefully
- Hardware variation may expand integration effort
- Offline behavior may become complex if sync rules are not constrained early
- Tariff complexity may increase testing effort significantly

7. Recommendation

Version 1 should focus on delivering a strong configurable operational core rather than trying to support every advanced enterprise workflow at launch.

