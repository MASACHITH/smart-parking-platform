# Smart Parking Platform User Stories

## Purpose

This document translates the PRD and epic backlog into user stories for the Smart Parking Platform. Stories are grouped by epic and written to support backlog planning, estimation, and later acceptance criteria definition.

## Story Format

Each story follows this format:

As a `<user type>`, I want `<capability>`, so that `<business value>`.

## EPIC-01 Multi-Tenant Platform Foundation

### US-001 Create Customer Tenant

As a platform admin, I want to create a new customer tenant, so that a new customer can start using the platform in an isolated workspace.

### US-002 Isolate Tenant Data

As a platform owner, I want each customer’s data to be isolated from all other customers, so that the platform is secure and commercially trustworthy.

### US-003 Manage Multiple Sites Per Customer

As a customer admin, I want to manage multiple parking sites under one customer account, so that my organization can operate all locations from one platform.

### US-004 Manage Multiple Zones Per Site

As a customer admin, I want to define multiple parking zones within a site, so that I can apply different operational rules to different parking areas.

### US-005 Support SaaS Deployment

As a platform owner, I want the platform to support SaaS deployment, so that customers can use a centrally hosted version of the product.

### US-006 Support On-Premise Deployment

As a platform owner, I want the platform to support on-premise deployment, so that customers with local hosting requirements can use the product.

## EPIC-02 Platform Administration and Feature Licensing

### US-007 Assign Licensed Modules to Customer

As a platform admin, I want to enable licensed modules for a customer, so that the customer can access only the features they purchased.

### US-008 Disable Unlicensed Modules

As a platform admin, I want unlicensed modules to remain unavailable to a customer, so that feature access matches the commercial agreement.

### US-009 Manage Global Platform Settings

As a platform admin, I want to manage global platform settings, so that shared platform behavior can be centrally controlled.

### US-010 View Customer Licensing Status

As a platform admin, I want to view the active licenses for each customer, so that I can manage sales, support, and upgrades accurately.

## EPIC-03 Customer Administration, Roles, and Permissions

### US-011 Create Customer Admin Users

As a platform admin, I want to create or authorize customer admin users, so that customers can manage their own operations.

### US-012 Manage Customer Users

As a customer admin, I want to create and manage user accounts for my organization, so that operational staff can access the platform.

### US-013 Configure Customer Roles

As a customer admin, I want to configure roles for my users, so that access can match my operating model.

### US-014 Assign Permissions to Roles

As a customer admin, I want to assign permissions to roles, so that users can perform only the actions they are responsible for.

### US-015 Restrict User Access by Permission

As an operational user, I want to see only the functions I am allowed to use, so that the interface is secure and relevant to my role.

## EPIC-04 Customer Configuration and White-Labeling

### US-016 Configure Enabled Features

As a customer admin, I want to configure the licensed features available to my sites, so that the product matches my operational needs.

### US-017 Configure Entry and Exit Workflow

As a customer admin, I want to configure entry and exit workflow behavior, so that automation and staff involvement match my site process.

### US-018 Configure Site-Level Rules

As a customer admin, I want to configure rules at site level, so that each site can operate differently when needed.

### US-019 Configure Zone-Level Rules

As a customer admin, I want to configure rules at zone level, so that specific parking areas can have separate behavior.

### US-020 Apply Customer Branding

As a customer admin, I want to apply my brand assets and templates, so that customer-facing outputs reflect my organization.

### US-021 Configure Ticket Format

As a customer admin, I want to configure ticket format and presentation, so that printed or displayed tickets meet my business needs.

### US-022 Configure Notification Templates

As a customer admin, I want to configure SMS and email templates, so that customer communications match my brand and tone.

## EPIC-05 Site, Zone, and Device Setup

### US-023 Create Parking Site

As a customer admin, I want to create a parking site in the system, so that physical locations can be managed digitally.

### US-024 Create Parking Zones

As a customer admin, I want to create zones within a site, so that I can structure parking operations by area.

### US-025 Register Devices

As a customer admin, I want to register site devices, so that cameras, barriers, and other hardware can be linked to operations.

### US-026 Assign Devices to Site

As a customer admin, I want to assign devices to a site, so that the system knows where each device belongs.

### US-027 Assign Devices to Zone

As a customer admin, I want to assign devices to a zone where relevant, so that hardware behavior can align with local parking rules.

## EPIC-06 Vehicle Entry Processing

### US-028 Capture Vehicle at Entry

As an entry operator, I want the system to capture vehicle arrival at entry, so that parking can begin with an accurate record.

### US-029 Create Entry Session Automatically

As a customer admin, I want the system to create parking sessions automatically when configured, so that entry processing is faster.

### US-030 Create Entry Session Manually

As an entry operator, I want to confirm or create a parking session manually when required, so that the process can continue in assisted workflows.

### US-031 Continue Entry When Plate Is Unreadable

As an entry operator, I want fallback options when a plate cannot be read, so that vehicles are not blocked unnecessarily.

### US-032 Save Entry Data to Parking Record

As the system, I want to store all captured entry data with the parking session, so that later lookup and validation are possible.

## EPIC-07 Parking Session Identification and Tracking

### US-033 Identify Session by Ticket

As an exit operator, I want to look up a parking session using a ticket, so that I can process exit for ticket-based customers.

### US-034 Identify Session by Plate Number

As an exit operator, I want to look up a parking session using a plate number, so that plate-based operations can move quickly.

### US-035 Identify Session by QR Code

As an exit operator, I want to look up a parking session using a QR code, so that QR-enabled flows are supported.

### US-036 Configure Session Identifier Combination

As a customer admin, I want to enable one or more session identifiers, so that the system can match my preferred process.

### US-037 Configure Exit Lookup Priority

As a customer admin, I want to configure lookup priority among session identifiers, so that the system follows my preferred matching order.

### US-038 Track Active Parking Session Lifecycle

As a supervisor, I want to track session state from entry to exit, so that I can monitor active parking activity accurately.

## EPIC-08 Number Plate Recognition and Verification

### US-039 Enable Plate Recognition by Site

As a customer admin, I want to enable or disable number plate recognition by site, so that I can control where ANPR is used.

### US-040 Use Plate Recognition for Validation

As a customer admin, I want to use plate recognition for validation only, so that operators can verify vehicle identity without full automation.

### US-041 Use Plate Recognition for Entry Automation

As a customer admin, I want to use plate recognition to automate entry, so that entry processing is faster and less manual.

### US-042 Use Plate Recognition for Exit Automation

As a customer admin, I want to use plate recognition to automate exit, so that customers can leave with less friction.

### US-043 Use Plate for Session Lookup

As an operational user, I want plate number lookup for parking sessions, so that I can find records quickly.

## EPIC-09 Vehicle Photo Capture and AI Detection

### US-044 Capture Vehicle Photo at Entry

As a customer admin, I want vehicle photos captured at entry when enabled, so that parking records include visual evidence.

### US-045 Detect Vehicle Color

As a customer admin, I want AI to detect vehicle color when enabled, so that records and validations can be enhanced.

### US-046 Detect Vehicle Type

As a customer admin, I want AI to detect vehicle type when enabled, so that records and pricing rules can be enhanced.

### US-047 Enable AI Features Independently

As a customer admin, I want to enable photo capture, color detection, and type detection independently, so that I can buy and use only what I need.

### US-048 Use AI Results in Operations

As a customer admin, I want AI results to support alerts, security checks, and pricing rules, so that advanced automation adds business value.

## EPIC-10 Vehicle Exit Processing and Barrier Release

### US-049 Process Vehicle Exit

As an exit operator, I want to process a vehicle exit against the active parking session, so that the vehicle can leave correctly.

### US-050 Calculate Charges Before Exit

As the system, I want to calculate all applicable parking fees before exit approval, so that revenue is collected accurately.

### US-051 Support Automatic Exit

As a customer admin, I want exit to be processed automatically when configured, so that traffic flow is faster.

### US-052 Support Manual Exit

As an exit operator, I want to process exit manually when required, so that the system supports assisted operation.

### US-053 Trigger Barrier Release

As the system, I want to trigger barrier opening after successful exit validation, so that the physical exit matches the system decision.

### US-054 Close Parking Session on Exit

As the system, I want to close the parking session after successful exit, so that active occupancy remains accurate.

## EPIC-11 Exception Handling and Manual Overrides

### US-055 Handle Duplicate Entry Attempt

As the system, I want to detect possible duplicate entries, so that invalid or conflicting parking records are prevented.

### US-056 Handle Lost Ticket Scenario

As an exit operator, I want to process lost-ticket cases, so that vehicles can still exit under controlled rules.

### US-057 Handle Overstay Scenario

As the system, I want to identify overstays, so that extra rules, fees, or alerts can be applied when required.

### US-058 Raise Blacklist Alert

As a security user, I want the system to flag blacklisted vehicles, so that suspicious or restricted vehicles can be handled properly.

### US-059 Configure Plate Mismatch Response

As a customer admin, I want to configure how plate mismatches are handled at exit, so that the response matches my security policy.

### US-060 Configure AI Mismatch Response

As a customer admin, I want to configure how AI mismatches are handled, so that operational actions match my risk tolerance.

### US-061 Perform Manual Override

As an authorized user, I want to perform manual overrides in exceptional cases, so that operations can continue without system deadlock.

### US-062 Record Override Reason

As an authorized user, I want to record a reason for a manual override, so that the action is accountable and auditable.

## EPIC-12 Tariff Management and Billing Rules

### US-063 Configure Hourly Tariff

As a customer admin, I want to configure hourly billing rules, so that time-based parking can be charged correctly.

### US-064 Configure Flat Fee Tariff

As a customer admin, I want to configure flat parking fees, so that simple charging models are supported.

### US-065 Configure Daily Rate Tariff

As a customer admin, I want to configure daily pricing, so that long-stay parking can be billed correctly.

### US-066 Configure Lost Ticket Fee

As a customer admin, I want to configure a lost-ticket fee, so that exceptions can be charged consistently.

### US-067 Configure Grace Period

As a customer admin, I want to configure grace periods, so that short stays can be treated according to business policy.

### US-068 Configure Special Rates

As a customer admin, I want to configure special rates by time or vehicle type, so that pricing can reflect operational strategy.

### US-069 Configure Tariff Rule Details

As a customer admin, I want to define rate slabs, free minutes, overnight rates, weekend rules, holiday rules, discounts, and validations, so that pricing matches my full business model.

### US-070 Apply Tariff Rules Automatically

As the system, I want to apply tariff rules automatically to each parking session, so that billing is consistent and efficient.

## EPIC-13 Payments and Revenue Collection

### US-071 Support Prepaid Parking

As a customer admin, I want to support prepaid parking flows, so that customers who pay before exit can be served.

### US-072 Support Postpaid Parking

As a customer admin, I want to support postpaid parking flows, so that customers who pay on exit can be served.

### US-073 Configure Payment Methods

As a customer admin, I want to configure available payment methods by site, so that payment choices match local operations.

### US-074 Record Payment Against Session

As the system, I want to attach each payment to the correct parking session, so that financial records stay accurate.

### US-075 Confirm Payment Status

As an exit operator, I want to see payment status clearly, so that I can allow exit only when the required payment condition is met.

### US-076 Integrate With Payment Gateway

As the platform, I want to integrate with payment gateways, so that digital payment collection is supported.

### US-077 Report Revenue Totals

As a manager, I want revenue totals reported accurately, so that I can monitor business performance.

## EPIC-14 Subscription and Permit Parking

### US-078 Create Subscription Product

As a customer admin, I want to create subscription and permit products, so that non-visitor parking can be managed in the same platform.

### US-079 Assign Subscription to User or Vehicle

As a customer admin, I want to assign a subscription to an eligible user or vehicle, so that recurring access can be controlled.

### US-080 Grant Access by Plate

As a customer admin, I want subscriptions to support plate-based access, so that approved vehicles can enter easily.

### US-081 Grant Access by QR

As a customer admin, I want subscriptions to support QR-based access, so that credential options are flexible.

### US-082 Grant Access by RFID or Card

As a customer admin, I want subscriptions to support RFID or card credentials, so that physical access tokens can be used.

### US-083 Grant Access by Mobile Credential

As a customer admin, I want subscriptions to support mobile credentials, so that digital access can be offered.

### US-084 Track Subscription Usage and Status

As a customer admin, I want to track subscription status and usage, so that I can manage renewals and valid access.

## EPIC-15 Hardware and Device Integration Framework

### US-085 Integrate ANPR Cameras

As a platform owner, I want to integrate ANPR cameras through a modular connector model, so that different customer hardware can be supported.

### US-086 Integrate Overview Cameras

As a platform owner, I want to integrate overview cameras, so that vehicle imagery can be captured from supported devices.

### US-087 Integrate Barrier Devices

As a platform owner, I want to integrate barrier or access control devices, so that system decisions can control physical access.

### US-088 Integrate Ticket Printers

As a platform owner, I want to integrate ticket printers, so that printed tickets are supported where required.

### US-089 Integrate QR or Barcode Scanners

As a platform owner, I want to integrate QR or barcode scanners, so that ticket and credential scanning workflows are supported.

### US-090 Integrate Payment Kiosks and POS Devices

As a platform owner, I want to integrate kiosks and POS devices, so that different payment collection setups can be supported.

### US-091 Integrate LED Displays

As a platform owner, I want to integrate LED displays, so that customer-facing parking information can be shown where needed.

## EPIC-16 Notifications and Customer Communications

### US-092 Send Entry Notification

As a customer, I want to receive an entry confirmation when configured, so that I know my parking session has started.

### US-093 Send Payment Confirmation

As a customer, I want to receive payment confirmation, so that I have proof of successful payment.

### US-094 Send Subscription Expiry Reminder

As a subscription holder, I want expiry reminders, so that I can renew before access lapses.

### US-095 Send Lost Ticket Notification

As an operator, I want lost-ticket events to trigger notifications when configured, so that relevant teams stay informed.

### US-096 Send Blacklist Alert Notification

As a security user, I want blacklist alerts to trigger notifications, so that rapid action can be taken when needed.

### US-097 Send System and Device Issue Alerts

As an operations user, I want alerts for system and device issues, so that failures can be addressed quickly.

## EPIC-17 Reporting, Dashboards, and Exports

### US-098 View Live Occupancy Dashboard

As a supervisor, I want a live occupancy dashboard, so that I can monitor how full the parking area is.

### US-099 View Live Gate Activity

As a supervisor, I want to view live gate activity, so that I can monitor current operational flow.

### US-100 View Today's Revenue

As a manager, I want to view today's revenue, so that I can track current financial performance.

### US-101 View Exception Alerts Dashboard

As a supervisor, I want to view exception alerts in one place, so that I can respond quickly to issues.

### US-102 View Device Health Dashboard

As a technical or operations user, I want to monitor device health, so that I can identify hardware problems early.

### US-103 Export Reports to PDF

As a manager, I want to export reports to PDF, so that I can share formatted summaries easily.

### US-104 Export Reports to Excel

As a manager, I want to export reports to Excel, so that I can perform further analysis outside the platform.

### US-105 Schedule Reports

As a manager, I want reports to be scheduled daily, weekly, or monthly, so that stakeholders receive regular updates automatically.

### US-106 View Occupancy and Vehicle Reports

As a manager, I want occupancy, active vehicle, and movement reports, so that I can review parking usage patterns.

### US-107 View Revenue and Cashier Reports

As a manager, I want revenue and cashier collection reports, so that I can monitor money handling and performance.

### US-108 View Subscription and Exception Reports

As a manager, I want subscription usage, exception, and audit-related reports, so that I can oversee non-standard operations.

## EPIC-18 Audit Trail and Operational Compliance

### US-109 Audit Configuration Changes

As an auditor or supervisor, I want configuration changes logged, so that I can trace who changed operational behavior.

### US-110 Audit Tariff Changes

As an auditor or supervisor, I want tariff updates logged, so that pricing changes are traceable.

### US-111 Audit Manual Overrides

As an auditor or supervisor, I want manual overrides logged, so that exceptional actions can be reviewed later.

### US-112 Audit Payments

As an auditor or finance user, I want payment events logged, so that financial activity is traceable.

### US-113 Audit User Actions

As an auditor or supervisor, I want key user actions logged, so that accountability is maintained across operations.

## EPIC-19 Offline Operations and Data Synchronization

### US-114 Continue Entry While Offline

As an entry operator, I want to continue vehicle entry during internet outages, so that site operations do not stop.

### US-115 Continue Exit While Offline

As an exit operator, I want to continue vehicle exit during internet outages, so that vehicles are not trapped by connectivity issues.

### US-116 Look Up Sessions Offline

As an operational user, I want essential session lookup to work offline, so that I can continue processing vehicles.

### US-117 Control Barrier Offline

As an operational user, I want barrier control to continue offline where supported, so that site flow remains functional.

### US-118 Synchronize Offline Records After Reconnection

As the system, I want offline records to synchronize after connectivity returns, so that the central platform remains complete and accurate.

## EPIC-20 Security, Access Boundaries, and Platform Resilience

### US-119 Enforce Tenant Access Boundaries

As the platform owner, I want tenant access boundaries enforced, so that no customer can access another customer’s data.

### US-120 Enforce Role-Based Access

As the platform owner, I want role-based access enforced consistently, so that users can access only what they are authorized to use.

### US-121 Protect Sensitive Operations

As the platform owner, I want sensitive operations handled securely, so that financial, security, and operational risks are reduced.

### US-122 Support Reliable Multi-Site Operations

As a customer, I want the platform to remain dependable across multiple sites and devices, so that operations remain stable as usage grows.

## Recommended Prioritization

### Phase 1 Must-Have Stories

- US-001 to US-038
- US-049 to US-077
- US-085 to US-087
- US-092 to US-093
- US-098 to US-105
- US-109 to US-120

### Phase 2 Should-Have Stories

- US-039 to US-048
- US-078 to US-084
- US-088 to US-091
- US-094 to US-097
- US-106 to US-108
- US-121 to US-122

### Phase 3 Detail and Expansion Stories

- Remaining refinement items that depend on final hardware vendor selection, approval workflows, and tariff rule depth
