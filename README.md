# EC6060 — Academic Calendar System

A full-stack academic calendar management system built for the **Department of Computer Engineering, Faculty of Engineering, University of Jaffna, Sri Lanka**.

The system supports role-based event management, a structured approval workflow, in-app and email notifications, personal task management, and a full audit trail — all within a modern, responsive web interface.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [User Roles & Permissions](#user-roles--permissions)
- [Key Features](#key-features)
- [API Reference](#api-reference)
- [Frontend Routes](#frontend-routes)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Security](#security)
- [QA & Bug Reports](#qa--bug-reports)
- [Team](#team)

---

## Project Overview

The EC6060 Academic Calendar System provides a centralised platform where department staff can create and manage academic events (lectures, labs, exams, meetings), while students can view the approved schedule. All events created by Lecturers or Instructors go through an approval workflow managed by the Head of Department (HOD) or Admin before becoming visible to the wider audience.

The system is built as two separate services:

- **Frontend** — A single-page application (SPA) built with React 19 + TypeScript, served via Vite.
- **Backend** — A RESTful API server built with Node.js + Express 5, connected to a MySQL database.

---

## Project Structure

```
EC6060---Academic-Calendar-System/
|
+-- backend/
|   +-- migrations/
|   |   +-- add_course_fields.sql       # Adds course_code, course_year, course_group to events
|   |   +-- create_audit_logs.sql       # Creates audit_logs table
|   +-- src/
|   |   +-- config/
|   |   |   +-- db.js                   # MySQL connection pool
|   |   +-- controllers/
|   |   |   +-- adminController.js      # Admin dashboard, user management
|   |   |   +-- auditController.js      # Audit log write/read
|   |   |   +-- authController.js       # Login, activate, forgot/reset password, profile
|   |   |   +-- dashboardController.js  # Role-specific dashboard summary stats
|   |   |   +-- eventController.js      # Event CRUD with conflict detection
|   |   |   +-- hodController.js        # Pending events, approve/reject
|   |   |   +-- lecturerController.js   # Lecturer-specific operations
|   |   |   +-- notificationController.js
|   |   |   +-- studentController.js
|   |   |   +-- todoController.js       # Personal task management
|   |   +-- middlewares/
|   |   |   +-- authMiddleware.js       # JWT verification, role-based authorization
|   |   |   +-- errorMiddleware.js      # Global error handler
|   |   |   +-- rateLimiter.js          # Auth and event route rate limiting
|   |   |   +-- validationMiddleware.js # express-validator error formatter
|   |   +-- routes/
|   |   |   +-- adminRoutes.js
|   |   |   +-- auditRoutes.js
|   |   |   +-- authRoutes.js
|   |   |   +-- dashboardRoutes.js
|   |   |   +-- eventRoutes.js
|   |   |   +-- hodRoutes.js
|   |   |   +-- lecturerRoutes.js
|   |   |   +-- notificationRoutes.js
|   |   |   +-- studentRoutes.js
|   |   |   +-- toRoutes.js             # Technical Officer routes
|   |   |   +-- todoRoutes.js
|   |   +-- services/
|   |   |   +-- approvalService.js
|   |   |   +-- emailService.js         # Nodemailer OTP and notification emails
|   |   |   +-- eventService.js
|   |   |   +-- notificationService.js
|   |   +-- utils/
|   |       +-- constants.js
|   |       +-- responseHandler.js
|   |       +-- validators.js
|   +-- schema.sql                      # Full database schema (run first)
|   +-- seed.js                         # Inserts demo users with hashed passwords
|   +-- server.js                       # Entry point
|   +-- package.json
|
+-- frontend/
|   +-- public/
|   |   +-- university-logo.png
|   +-- src/
|   |   +-- api/
|   |   |   +-- client.ts               # Axios instance with base URL and auth headers
|   |   |   +-- contract.ts             # Zodios API contract definition
|   |   |   +-- hooks.ts                # TanStack Query hooks
|   |   |   +-- schemas.ts              # Zod validation schemas
|   |   +-- components/
|   |   |   +-- calendar/
|   |   |   |   +-- DayView.tsx
|   |   |   |   +-- WeekView.tsx
|   |   |   |   +-- MonthView.tsx
|   |   |   |   +-- MiniCalendar.tsx
|   |   |   +-- dashboard/
|   |   |   |   +-- InstructorDashboard.tsx
|   |   |   |   +-- TODashboard.tsx
|   |   |   +-- layout/
|   |   |   |   +-- Header.tsx
|   |   |   |   +-- Sidebar.tsx
|   |   |   |   +-- Layout.tsx
|   |   |   +-- modals/
|   |   |       +-- EventModal.tsx
|   |   |       +-- EventDetailsModal.tsx
|   |   |       +-- CancelEventModal.tsx
|   |   |       +-- ExportModal.tsx
|   |   +-- pages/
|   |   |   +-- auth/          # Login, Register, Forgot Password, OTP, Reset Password
|   |   |   +-- dashboard/
|   |   |   +-- calendar/
|   |   |   +-- events/        # Add, Edit, Details pages
|   |   |   +-- approvals/     # HOD/Admin approval queue
|   |   |   +-- notifications/
|   |   |   +-- tasks/
|   |   |   +-- profile/
|   |   |   +-- settings/
|   |   +-- stores/
|   |   |   +-- useAuthStore.ts
|   |   |   +-- useCalendarStore.ts
|   |   |   +-- useEventStore.ts
|   |   |   +-- useSettingsStore.ts
|   |   +-- types/
|   |   |   +-- index.ts               # All TypeScript interfaces and enums
|   |   +-- utils/
|   |       +-- permissions.ts         # Role-based permission helpers
|   |       +-- storage.ts
|   |       +-- validators.js
|   +-- index.html
|   +-- vite.config.ts
|   +-- tailwind.config.js
|   +-- package.json
|
+-- QA_1/bug-report.md                  # QA cycle 1 bug reports
+-- QA_2/bug-report.md                  # QA cycle 2 bug reports
+-- QA_3/bug-report.md                  # QA cycle 3 bug reports
+-- README.md
```

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | UI framework |
| TypeScript | 5.9.x | Type safety |
| Vite | 7.x | Build tool and dev server |
| React Router DOM | 6.x | Client-side routing |
| Zustand | 4.x | Global state management |
| TanStack Query | 5.x | Server state, caching, data fetching |
| Axios | 1.x | HTTP client |
| Zodios | 10.x | Type-safe API client via Zod contracts |
| Zod | 3.x | Runtime schema validation |
| Tailwind CSS | 3.x | Utility-first styling |
| date-fns | 2.x | Date manipulation and formatting |
| @dnd-kit | 6.x | Drag-and-drop for calendar events |
| Lucide React | 0.454.x | Icon library |
| clsx | 2.x | Conditional class name utility |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18.x+ | JavaScript runtime |
| Express | 5.x | REST API framework |
| MySQL2 | 3.x | MySQL database driver with connection pooling |
| jsonwebtoken | 9.x | JWT authentication (2-hour expiry) |
| bcryptjs | 3.x | Password hashing (10 salt rounds) |
| Nodemailer | 8.x | Email delivery for OTP and notifications |
| express-validator | 7.x | Request body validation |
| express-rate-limit | 8.x | Rate limiting for auth and event routes |
| dotenv | 17.x | Environment variable management |
| nodemon | 3.x | Auto-restart in development |

---

## Database Schema

The database is named `department_calendar`. Run `schema.sql` first, then the migrations.

### Tables

#### `users`
Stores all system users. New users are pre-registered by an admin with `is_active = 0`. They activate their account via the `/api/auth/activate` endpoint.

| Column | Type | Description |
|---|---|---|
| `id` | INT (PK) | Auto-increment |
| `first_name` | VARCHAR(100) | |
| `last_name` | VARCHAR(100) | |
| `email` | VARCHAR(150) | Unique |
| `password` | VARCHAR(255) | bcrypt hash; NULL until activated |
| `role` | ENUM | `ADMIN`, `HOD`, `LECTURER`, `INSTRUCTOR`, `TECHNICAL_OFFICER`, `STUDENT` |
| `department` | VARCHAR(150) | |
| `is_active` | TINYINT(1) | `0` = not activated, `1` = active |
| `created_at` | DATETIME | |

#### `events`
Core event records created by staff.

| Column | Type | Description |
|---|---|---|
| `event_id` | INT (PK) | |
| `title` | VARCHAR(255) | |
| `description` | TEXT | |
| `event_type` | VARCHAR(100) | e.g., Lecture, Lab, Exam, Meeting |
| `start_datetime` | DATETIME | |
| `end_datetime` | DATETIME | |
| `location` | VARCHAR(255) | Used for conflict detection |
| `course_code` | VARCHAR(20) | Optional (migration) |
| `course_year` | VARCHAR(10) | Optional (migration) |
| `course_group` | VARCHAR(20) | Optional (migration) |
| `status` | ENUM | `PENDING`, `APPROVED`, `REJECTED` |
| `created_by` | INT (FK) | References `users.id` |
| `created_at` | DATETIME | |

#### `approval_status`
Tracks the approval decision for each event.

| Column | Type | Description |
|---|---|---|
| `id` | INT (PK) | |
| `event_id` | INT (FK, UNIQUE) | References `events.event_id` |
| `status` | ENUM | `PENDING`, `APPROVED`, `REJECTED` |
| `reason` | TEXT | Rejection reason (optional) |
| `updated_at` | DATETIME | Auto-updates on change |

#### `notifications`
In-app notifications sent to users.

| Column | Type | Description |
|---|---|---|
| `notification_id` | INT (PK) | |
| `event_id` | INT (FK) | |
| `user_id` | INT (FK) | Recipient |
| `message` | TEXT | |
| `notification_type` | ENUM | `APPROVAL_REQUEST`, `APPROVED`, `REJECTED` |
| `sent_at` | DATETIME | |
| `is_read` | TINYINT(1) | `0` = unread |

#### `password_reset_tokens`
Stores 4-digit OTPs for password reset. Expiry is 5 minutes from creation.

#### `todo_items`
Personal task list per user with title, description, due date, and completion status.

#### `audit_logs` (migration)
Tracks all system actions for accountability.

| Column | Type | Description |
|---|---|---|
| `log_id` | INT (PK) | |
| `actor_id` | VARCHAR(100) | User who performed the action |
| `actor_name` | VARCHAR(200) | |
| `action` | ENUM | `CREATE`, `UPDATE`, `DELETE`, `APPROVE`, `REJECT` |
| `entity_type` | VARCHAR(50) | e.g., `EVENT`, `USER` |
| `entity_id` | VARCHAR(100) | |
| `entity_name` | VARCHAR(255) | |
| `diff_summary` | TEXT | Human-readable change summary |
| `details` | JSON | Full change details |
| `created_at` | DATETIME | |

---

## User Roles & Permissions

| Role | Create Events | Approve Events | View Events | Admin Access |
|---|---|---|---|---|
| `ADMIN` | Yes (auto-approved) | Yes | All events | Full |
| `HOD` | Yes (auto-approved) | Yes | All events | Full |
| `LECTURER` | Yes (goes to PENDING) | No | Own + approved | No |
| `INSTRUCTOR` | Yes — lab/practical only (goes to PENDING) | No | Own + approved | No |
| `TECHNICAL_OFFICER` | No | No | Public + staff events | No |
| `STUDENT` | No | No | Approved events only | No |

### Event Visibility Rules

- **ADMIN / HOD** — Full access to all events regardless of status or visibility.
- **LECTURER** — Can view all approved events and their own events (any status). Can edit/delete only events they created.
- **INSTRUCTOR** — Same as Lecturer, scoped to lab/practical events.
- **TECHNICAL_OFFICER** — Can view public and staff-only events. Cannot modify.
- **STUDENT** — Can only view events with status `APPROVED`. Private and staff-only events are hidden or shown as "Staff Event".

### Account Activation Flow

Users **cannot self-register**. The Admin pre-registers users in the database. Users then visit the system and activate their account by providing their email and choosing a password via `POST /api/auth/activate`. Accounts with `is_active = 0` cannot log in.

---

## Key Features

### Authentication & Security
- **Controlled registration** — Admin pre-registers users; users activate their own accounts.
- **JWT authentication** — Bearer token with 2-hour expiry issued on login.
- **Password hashing** — bcrypt with 10 salt rounds.
- **Forgot password** — 4-digit OTP sent to registered email, valid for 5 minutes.
- **Rate limiting** — Auth routes and event creation routes are rate-limited to prevent abuse.
- **Role-based middleware** — Every protected route enforces role authorization server-side.

### Event Management
- Create, edit, and delete events with full field validation.
- Event types: `Lecture`, `Lab`, `Exam`, `Seminar`, `Meeting`, `Other`.
- Optional course metadata per event: `course_code`, `course_year`, `course_group`.
- **Location conflict detection** — Rejects new events that overlap at the same location.
- **Lecturer double-booking detection** — Prevents the same lecturer from having two events at the same time.
- Events edited by a Lecturer after approval are automatically reset to `PENDING`.

### Approval Workflow
1. Lecturer or Instructor creates an event — status is set to `PENDING`.
2. A notification is automatically sent to the HOD.
3. HOD (or Admin) views pending events at `/approvals` or `GET /api/hod/pending-events`.
4. HOD approves or rejects with an optional reason.
5. Event status updates and a notification is sent back to the creator.
6. Admin-created events are directly set to `APPROVED`.

### Calendar Views
- **Month View** — Standard calendar grid with event badges.
- **Week View** — 7-day column layout with hourly time slots.
- **Day View** — Detailed hourly grid with drag-and-drop event repositioning.
- **Mini Calendar** — Compact date picker in the sidebar for quick navigation.

### Dashboard (Role-specific)
| Role | Stats Shown |
|---|---|
| ADMIN | Total users, total events, pending / approved / rejected counts |
| HOD | Total events, pending / approved / rejected counts |
| LECTURER | Own events total, own pending / approved / rejected, unread notifications |
| STUDENT | Total approved events, upcoming events count |
| TECHNICAL_OFFICER | System status |

### Notifications
- In-app notification centre with unread count badge.
- Notification types: `APPROVAL_REQUEST`, `APPROVED`, `REJECTED`.
- Email notifications via Nodemailer (SMTP) for password reset OTPs.

### Task Management
- Personal to-do list per user.
- Fields: title, description, due date, completion status.
- Stored per user in `todo_items` table.

### Audit Logging
- Every `CREATE`, `UPDATE`, `DELETE`, `APPROVE`, and `REJECT` action is recorded in `audit_logs`.
- Logs include actor ID, actor name, entity type, entity ID, a human-readable diff summary, and full JSON details.
- Audit log retrieval is restricted to Admin users.

### Profile Management
- Any authenticated user can update their `first_name`, `last_name`, and `department`.
- Available at `PUT /api/auth/profile`.

---

## API Reference

All endpoints are prefixed with `/api`. Protected routes require the header:
```
Authorization: Bearer <token>
```

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/activate` | No | Activate a pre-registered account |
| POST | `/auth/login` | No | Login and receive JWT token |
| POST | `/auth/forgot-password` | No | Send 4-digit OTP to email |
| POST | `/auth/verify-otp` | No | Verify the OTP |
| POST | `/auth/reset-password` | No | Set a new password after OTP verification |
| PUT | `/auth/profile` | Yes | Update first name, last name, department |
| GET | `/auth/users?roles=ROLE1,ROLE2` | Yes | Get users filtered by role(s) |

### Events — `/api/events`

| Method | Endpoint | Auth | Roles | Description |
|---|---|---|---|---|
| GET | `/events` | Yes | All | Get events (role-filtered); supports `?start=&end=&limit=&offset=` |
| GET | `/events/:id` | Yes | All | Get a single event |
| POST | `/events` | Yes | ADMIN, HOD, LECTURER, INSTRUCTOR | Create an event |
| PUT | `/events/:id` | Yes | ADMIN, HOD, LECTURER, INSTRUCTOR | Update an event |
| DELETE | `/events/:id` | Yes | ADMIN, HOD, LECTURER, INSTRUCTOR | Delete an event |

### HOD — `/api/hod`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/hod/dashboard` | Yes (HOD) | HOD welcome dashboard |
| GET | `/hod/pending-events` | Yes (HOD) | List all pending events |
| PUT | `/hod/approve/:eventId` | Yes (HOD) | Approve an event |
| PUT | `/hod/reject/:eventId` | Yes (HOD) | Reject an event with reason |
| GET | `/hod/notifications` | Yes (HOD) | HOD-specific notifications |

### Admin — `/api/admin`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/admin/dashboard` | Yes (ADMIN) | Admin dashboard stats |
| GET | `/admin/users` | Yes (ADMIN) | List all users |
| DELETE | `/admin/users/:id` | Yes (ADMIN) | Delete a user |

### Dashboard — `/api/dashboard`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/dashboard/summary` | Yes | Role-specific stats summary |

### Notifications — `/api/notifications`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/notifications` | Yes | Get notifications for current user |
| PUT | `/notifications/:id/read` | Yes | Mark a notification as read |

### Todos — `/api/todos`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/todos` | Yes | Get all tasks for current user |
| POST | `/todos` | Yes | Create a new task |
| PUT | `/todos/:id` | Yes | Update a task |
| DELETE | `/todos/:id` | Yes | Delete a task |

### Audit — `/api/audit`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/audit` | Yes | Record an audit log entry |
| GET | `/audit` | Yes (ADMIN) | Retrieve audit logs (supports `?limit=&offset=`) |

### Technical Officer — `/api/to`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/to/dashboard` | Yes (TECHNICAL_OFFICER) | TO welcome dashboard |

---

## Frontend Routes

| Path | Access | Description |
|---|---|---|
| `/login` | Public | Login page |
| `/register` | Public | Account activation page |
| `/forgot-password` | Public | Request OTP for password reset |
| `/verify-code` | Public | Enter OTP |
| `/reset-password` | Public | Set new password |
| `/password-success` | Public | Confirmation page |
| `/verification-error` | Public | Error page |
| `/` | All roles | Role-specific dashboard |
| `/calendar` | All roles | Calendar with Day/Week/Month views |
| `/tasks` | All roles | Personal task list |
| `/notifications` | All roles | Notification centre |
| `/approvals` | ADMIN, HOD only | Event approval queue |
| `/add-event` | Staff only | Create new event form |
| `/edit-event/:id` | Staff only | Edit event form |
| `/event/:id` | All roles | Event details page |
| `/profile` | All roles | Update profile information |
| `/settings` | All roles | Application settings |
| `/help` | All roles | Help and support page |
| `/user-roles` | ADMIN only | Role permission overview |
| `/calendar-management` | ADMIN, HOD | Calendar policies overview |
| `/documents` | All roles | Coming soon |
| `/attendance` | All roles | Coming soon |
| `/venues` | All roles | Coming soon |
| `/announcements` | All roles | Coming soon |
| `/reports` | All roles | Coming soon |

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- MySQL 8.x

---

### 1. Clone the Repository

```bash
git clone https://github.com/Salman20010917/EC6060---Academic-Calendar-System.git
cd EC6060---Academic-Calendar-System
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=department_calendar
JWT_SECRET=your_strong_jwt_secret_here
JWT_EXPIRES_IN=2h
FRONTEND_URL=http://localhost:5173
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
NODE_ENV=development
```

Start the backend server:

```bash
npm run dev      # development with nodemon (auto-restart)
npm start        # production
```

API runs at: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

**Production build:**

```bash
npm run build
npm run preview
```

---

## Database Setup

Run these steps in order:

**Step 1 — Create schema and tables:**
```bash
mysql -u root -p < backend/schema.sql
```

**Step 2 — Run migrations** (adds course fields and audit log table):
```bash
mysql -u root -p department_calendar < backend/migrations/add_course_fields.sql
mysql -u root -p department_calendar < backend/migrations/create_audit_logs.sql
```

**Step 3 — Seed demo users:**
```bash
cd backend
node seed.js
```

The seed script inserts demo users for each role with properly bcrypt-hashed passwords. See `backend/seed.js` for the credentials. All seeded users have `is_active = 1`.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Backend port (default: `5000`) |
| `DB_HOST` | Yes | MySQL host |
| `DB_PORT` | No | MySQL port (default: `3306`) |
| `DB_USER` | Yes | MySQL username |
| `DB_PASSWORD` | Yes | MySQL password |
| `DB_NAME` | Yes | Database name (`department_calendar`) |
| `JWT_SECRET` | Yes | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | No | Token expiry (default: `2h`) |
| `FRONTEND_URL` | No | Allowed CORS origin (default: `http://localhost:5173`) |
| `EMAIL_HOST` | Yes | SMTP host (e.g., `smtp.gmail.com`) |
| `EMAIL_PORT` | Yes | SMTP port (e.g., `587`) |
| `EMAIL_USER` | Yes | Sender email address |
| `EMAIL_PASS` | Yes | SMTP password or Gmail App Password |
| `NODE_ENV` | No | `development` or `production` |

> For Gmail, generate an **App Password** from your Google Account security settings. Do not use your actual Gmail password.

---

## Security

- **JWT Bearer tokens** — All protected routes validate the `Authorization: Bearer <token>` header. Tokens expire after 2 hours.
- **Role-based authorization** — The `authorizeRoles()` middleware enforces which roles can access each route server-side. Frontend role guards are a UX enhancement only.
- **bcrypt password hashing** — Passwords are hashed with 10 salt rounds. Plain-text passwords are never stored.
- **OTP-based password reset** — 4-digit OTPs are valid for 5 minutes and deleted after a successful reset.
- **Rate limiting** — Auth routes and event creation are rate-limited to prevent brute-force and abuse.
- **Input validation** — All request bodies are validated with `express-validator` before reaching controllers.
- **CORS** — Only the configured `FRONTEND_URL` origin is permitted.
- **Conflict detection** — The backend prevents location double-booking and lecturer time conflicts at the database level within a transaction.

---

## QA & Bug Reports

The `QA_1/`, `QA_2/`, and `QA_3/` directories contain bug reports filed during QA cycles.

### Summary of Known Issues

| Bug ID | Module | Severity | Description |
|---|---|---|---|
| BUG_007 | Student Dashboard | Medium | "+ New" button incorrectly visible for students |
| BUG_008 | Dashboard | Medium | Export button has no functionality |
| BUG_009 | Dashboard – Help & Support | Low | Help & Support sidebar link not navigating |
| BUG_010 | User Profile / Settings | Medium | Incorrect initials shown in Settings page header |
| BUG_011 | User Profile Menu | Low | Profile avatar not clickable in Settings page |
| BUG_012 | Settings – Notification Icon | Low | Notification bell icon not functional in Settings |
| BUG_013 | Settings – Calendar Management | Low | "Calendar Management" option not in approved design |
| BUG_014 | Settings – Event Defaults | Low | "Event Defaults" option not in approved design |
| BUG_015 | Settings – User Roles | Low | "User Roles" option not in approved design |
| BUG_016 | Settings – Integrations | Low | "Integrations" option not in approved design |
| BUG_017 | Calendar – Week View | Low | "12 AM" time label partially hidden |
| BUG_018 | Calendar View | Medium | Filter button not functional |
| BUG_019 | Calendar – Month View | Low | Help (?) icon not functional |
| BUG_025 | Notifications | Medium | "Mark as read" status does not persist after navigation |

---

## Team

Built by the **EC6060 Software Engineering Group Project** team.

**Department of Computer Engineering**
Faculty of Engineering, University of Jaffna, Sri Lanka

| Name | Role |
|---|---|
| M.M. Salman | Project Lead / Admin |
| Pravar Sines | HOD |
| Kisothana Bala | Developer / QA |
| Ajanthan WC | Technical Officer |
| Pooja Yogarasa | Developer / Student Tester |
| Poojah Yogarasa | Student Tester |

---

## License

MIT License — Free for educational use.
