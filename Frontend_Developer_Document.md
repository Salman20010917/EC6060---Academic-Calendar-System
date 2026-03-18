# EC6060 — Academic Calendar System
## Frontend Developer — Project Documentation

**Developer:** M.M. Salman
**Role:** Frontend Developer
**Module:** EC6060 — Software Engineering Group Project
**Institution:** Department of Computer Engineering, Faculty of Engineering, University of Jaffna

---

> **How to use this document:**
> Lines marked `[SCREENSHOT: ...]` indicate exactly where to paste a screenshot and what to capture.
> All answers are written in first person from the frontend developer's perspective.

---

## 1. Project Overview

**What is the name of your project?**

The project is named **EC6060 Academic Calendar System** — a web-based academic event management platform built for the Department of Computer Engineering, Faculty of Engineering, University of Jaffna.

---

**What problem does the system solve?**

The department previously had no centralised digital system for managing academic events. Schedules for lectures, lab sessions, exams, and meetings were communicated informally, which often caused confusion, double-bookings, and missed events. Our system solves this by providing a single platform where staff can create and manage events, the Head of Department can approve them, and students can view the approved schedule — all in real time.

---

**Who are the target users?**

The system is designed for six user groups within the department:

- **Admin** — Full system control and user management
- **Head of Department (HOD)** — Approves or rejects events submitted by staff
- **Lecturer** — Creates and manages lecture events
- **Instructor** — Creates and manages lab and practical sessions
- **Technical Officer** — Views schedules to coordinate technical resources
- **Student** — Views the approved academic calendar

---

**What are the main features of the system?**

- Role-based authentication with controlled account activation
- Event creation, editing, and deletion with conflict detection
- Approval workflow — Lecturer/Instructor events go to HOD for approval before becoming visible
- Three calendar views: Month, Week, and Day (with drag-and-drop)
- In-app notification centre
- Personal task/to-do list per user
- Role-specific dashboards with live statistics
- Forgot password with OTP-based email verification
- Audit logging for all system actions
- Fully responsive UI across screen sizes

---

**What was the duration of the project?**

The project was developed over approximately **[fill in: e.g., 8 weeks]**, from **[start date]** to **[submission date]**, as part of the EC6060 module in the **[semester/academic year]**.

---

`[SCREENSHOT 1 — Login Page: Capture the full login screen at /login showing the university branding, email and password fields, and the login button.]`

---

## 2. Team Structure

**How many members were in your team?**

Our team had three members, each responsible for a distinct layer of the system.

---

**What were their roles?**

| Member | Role |
|---|---|
| M.M. Salman | Frontend Developer |
| Poojah Yogarasa | Backend Developer |
| Kisothana Bala | QA Engineer |

---

**What was your specific role?**

I was responsible for the **entire frontend** of the application — from the UI design and component architecture to API integration and routing. I built every page, every component, and every user interaction in the browser.

---

**How did your role differ from others?**

The backend developer built the REST API server, the database schema, all the business logic (event conflict detection, approval workflow, notifications, JWT authentication), and the email service. I consumed that API from the frontend.

The QA engineer tested both the frontend and backend together. She filed bug reports across three testing cycles using a structured format, which I then used to identify and fix UI and integration issues on my side.

My role sat at the intersection of both — I had to understand the API contracts from the backend and translate them into a smooth user experience, while also addressing every bug the QA engineer reported on the frontend.

---

`[SCREENSHOT 2 — Dashboard (Student or HOD): Capture the full dashboard page showing the sidebar, today's schedule panel, upcoming events, and notifications panel.]`

---

## 3. Your Responsibilities (Frontend Focus)

**Were you responsible for the entire frontend?**

Yes. I was solely responsible for the entire frontend codebase. Every page, component, state management store, API integration hook, and routing logic was implemented by me.

---

**What parts of the UI did you build?**

I built every section of the frontend, which includes:

**Authentication Pages (7 screens):**
- Login page
- Account activation / Register page
- Forgot Password page
- OTP Verification (Verify Code) page
- Reset Password page
- Password Success confirmation page
- Verification Error page

**Core Application Pages (9 pages):**
- Dashboard — role-specific views for Student/HOD/Admin, Lecturer/Instructor, and Technical Officer
- Calendar — with fully functional Day View, Week View, and Month View
- Add Event page
- Edit Event page
- Event Details page
- Approvals page (restricted to HOD and Admin)
- Notifications page
- Tasks page (personal to-do list)
- Profile page
- Settings page
- Help & Support page

**Reusable Components:**
- `Layout`, `Header`, `Sidebar` — shared across all authenticated pages
- `DayView`, `WeekView`, `MonthView`, `MiniCalendar` — the four calendar components
- `EventModal`, `EventDetailsModal`, `CancelEventModal`, `ExportModal` — modal dialogs
- `InstructorDashboard`, `TODashboard` — role-specific dashboard variants
- `ErrorBoundary` — catches and displays runtime errors gracefully

---

**Did you handle API integration from the backend?**

Yes. I implemented the full API layer on the frontend side:

- Created an **Axios HTTP client** (`src/api/client.ts`) configured with the base URL and automatic JWT header injection from the auth store.
- Defined an **API contract** using Zodios (`src/api/contract.ts`) that mirrors the backend endpoints with full Zod type validation.
- Wrote **TanStack Query hooks** (`src/api/hooks.ts`) for all data fetching — events, dashboard summary, notifications, todos — with built-in caching and background refetching.
- Managed **Zustand stores** (`useAuthStore`, `useCalendarStore`, `useEventStore`, `useSettingsStore`) for all global client state.

---

**Did you work with QA for bug fixing?**

Yes. Our QA engineer, Kisothana, conducted three rounds of testing and submitted detailed bug reports (stored in `QA_1/`, `QA_2/`, `QA_3/`). She filed a total of **35+ bugs** across all cycles. I reviewed each report, reproduced the issue, and fixed the frontend-side bugs. Examples of bugs I resolved include:

- The "+ New" button being incorrectly shown to Students (BUG_007)
- The Export button not downloading anything (BUG_008) — I implemented CSV export logic
- The notification bell count not updating after marking as read (BUG_021)
- Profile section being inconsistent between Dashboard and Settings (BUG_033)
- Settings toggles (Dark Mode, 24-Hour Clock) not applying changes (BUG_027–029)
- The second sidebar appearing unnecessarily in the Tasks module (BUG_024)

---

**Did you participate in design decisions?**

Yes. Since there was no dedicated UI/UX designer on the team, I was responsible for the overall visual design as well. I made decisions on the layout structure, colour scheme, typography, component hierarchy, and spacing system. I used **Tailwind CSS** utility classes to implement a consistent design language across all pages, and followed a card-based layout with a fixed left sidebar that matches common academic software patterns.

---

`[SCREENSHOT 3 — Calendar Month View: Capture the calendar at /calendar in Month view, showing events with color-coded badges and the mini calendar in the sidebar.]`

`[SCREENSHOT 4 — Add Event Page: Capture the /add-event form showing all input fields — title, type, location, date/time, course fields.]`

---

## 4. Collaboration

**How did you communicate with the backend developer?**

We primarily communicated through **GitHub** — the backend developer maintained a separate repository for the API, and we used it as the source of truth for endpoint contracts. Whenever new endpoints were added or changed, I reviewed the route files and updated my Axios client and Zodios contract accordingly. We also communicated directly to resolve data format mismatches, such as discussing the structure of the event object (including fields like `course_code`, `course_year`, `course_group`) and the expected JWT payload shape.

---

**How did you coordinate with QA during testing?**

Kisothana submitted her bug reports as structured Markdown files in the `QA_1/`, `QA_2/`, and `QA_3/` folders with bug IDs, reproduction steps, severity levels, and comments. I treated each bug ID as a task, reproduced the issue on my machine, fixed it, and we would verify together in the next cycle. The three rounds of QA testing — covering Student, Lecturer, and HOD roles — allowed us to systematically catch and resolve issues across all user flows.

---

**Did you use any tools for collaboration?**

- **Git / GitHub** — Version control and code sharing. All code was pushed to a shared GitHub repository.
- **Structured bug reports** — QA used a consistent bug report format with ID, module, severity, and steps.
- **Direct communication** — For quick decisions, we communicated directly as a small team.

---

**How did you handle conflicts or misunderstandings?**

Since the team was small (three people), conflicts were minimal and resolved through direct discussion. The main source of confusion was API response format — for example, the backend returning event data in a slightly different shape than expected. I handled this by writing Zod schemas that validated and transformed the API responses at the boundary, which made the rest of the frontend code independent of backend format changes.

---

`[SCREENSHOT 5 — Approvals Page: Capture the /approvals page showing the list of pending events with approve and reject buttons (log in as HOD).]`

---

## 5. Technologies Used (Frontend Only)

**What languages did you use?**

I used **TypeScript** as the primary language throughout the frontend. TypeScript allowed me to define strict types for all data models — users, events, notifications, tasks, permissions — which significantly reduced runtime bugs and made refactoring safer. I also used a small amount of vanilla **JavaScript** in utility helper files.

---

**What framework/library did you use?**

- **React 19** — The core UI library for building the component tree.
- **React Router DOM v6** — Client-side routing with protected and role-restricted route components.
- **TanStack Query v5** — Server state management, API caching, and background refetching.
- **Axios** — HTTP client for all API calls.
- **Zodios** — Type-safe API client that ties Zod schemas to Axios requests.
- **Zod** — Runtime schema validation for API request and response data.
- **date-fns** — Date manipulation and formatting (used heavily in the calendar views).
- **@dnd-kit** — Drag-and-drop library used in the Day View calendar for repositioning events.
- **Lucide React** — Consistent icon library used across all UI components.
- **clsx** — Utility for conditionally composing Tailwind class names.
- **Vite** — Build tool and development server; significantly faster than CRA.

---

**What styling approach did you follow?**

I used **Tailwind CSS** (v3) throughout the project. I followed a utility-first approach — all styling is applied directly via class names, with no custom CSS files except for the global `index.css` which sets base Tailwind directives and a few custom component classes (`.btn-primary`, `.btn-outline`, `.card`, `.badge`). This approach enforced visual consistency and made responsive design straightforward using Tailwind's breakpoint prefixes (`lg:`, `md:`, `sm:`).

---

**Did you use any state management tools?**

Yes. I used **Zustand** for all global state management. I created four stores:

| Store | Purpose |
|---|---|
| `useAuthStore` | Logged-in user, JWT token, authentication status, login/logout actions |
| `useCalendarStore` | Current date, active view (Day/Week/Month), calendar filters |
| `useEventStore` | Events list, calendars, resources, conflict detection, audit logs |
| `useSettingsStore` | User preferences — dark mode, time format, first day of week |

I chose Zustand over Redux because of its minimal boilerplate and straightforward API, which suited the scope of the project.

---

**What tools did you use for development?**

- **VS Code** — Primary code editor
- **Vite dev server** — Hot module replacement, fast rebuild
- **React Developer Tools** (browser extension) — Inspecting component state and props
- **Git** — Version control
- **Browser DevTools** — Network tab for API debugging, console for runtime errors

---

`[SCREENSHOT 6 — Week View Calendar: Capture the calendar in Week view at /calendar showing time slots and at least one event in the grid.]`

`[SCREENSHOT 7 — Day View Calendar: Capture the calendar in Day view showing the hourly time grid.]`

---

## 6. Features You Developed

**What pages or modules did you implement?**

I implemented every page in the frontend application. The full list:

- 7 authentication pages (login, activation, forgot password, OTP verify, reset password, success, error)
- Role-specific Dashboard (with 3 different views based on user role)
- Calendar page with three views (Month, Week, Day) and a Mini Calendar sidebar
- Add Event, Edit Event, and Event Details pages
- Approvals page (for HOD and Admin)
- Notifications page
- Tasks (to-do) page
- Profile page
- Settings page with Display, Calendar Preferences, and Notification sections
- Help & Support page
- Admin-only User Roles page
- Admin/HOD Calendar Management page
- Placeholder pages for Documents, Attendance, Venues, Announcements, Reports (coming soon)

---

**Which features were fully handled by you?**

- The entire routing architecture — `PrivateRoute`, `PublicRoute`, and `RoleRoute` components that guard routes based on authentication status and user role.
- All four calendar views — Month, Week, Day, and Mini Calendar — including their event rendering logic, date navigation, and time grid calculations.
- The event permission system — `getEventPermissions()` utility that determines what each role can view, edit, and delete based on event visibility and ownership.
- Role-specific dashboard rendering — the same `/` route renders a completely different layout depending on whether the user is a Student, Lecturer/Instructor, Technical Officer, HOD, or Admin.
- CSV export functionality on the Dashboard.
- The multi-step password reset flow (Forgot Password → OTP entry → Reset Password → Success screen).

---

**Did you implement authentication UI?**

Yes. I implemented the complete authentication user interface:

- **Login page** — Email/password form with validation feedback, connected to `POST /api/auth/login`.
- **Account Activation page** — New users who have been pre-registered by Admin enter their email and set a password here, connected to `POST /api/auth/activate`.
- **Forgot Password** → **Verify OTP** → **Reset Password** → **Password Success** — A four-step flow with state passed between pages, connected to the backend OTP email system.
- After login, the JWT token is stored in `useAuthStore` (Zustand + localStorage persistence) and injected as a Bearer header on all subsequent API requests.

---

**What reusable components did you create?**

- `Layout` / `Header` / `Sidebar` — Shell components wrapping every authenticated page with consistent navigation.
- `EventModal` — A form modal for creating a new event, used from the Dashboard and Calendar pages.
- `EventDetailsModal` — A read-only details modal with role-aware edit/delete buttons.
- `CancelEventModal` — A confirmation dialog for event deletion.
- `ExportModal` — A modal for exporting calendar data.
- `MonthView` / `WeekView` / `DayView` / `MiniCalendar` — Standalone calendar view components.
- `InstructorDashboard` / `TODashboard` — Role-specific dashboard variants.
- `ErrorBoundary` — Wraps the entire application to prevent blank screens on runtime errors.

---

**Did you implement navigation and routing?**

Yes. I designed and implemented the complete routing system in `App.tsx` using React Router v6:

- **`PublicRoute`** — Redirects already-authenticated users away from auth pages to the dashboard.
- **`PrivateRoute`** — Redirects unauthenticated users to `/login` before they can access protected pages.
- **`RoleRoute`** — Extends `PrivateRoute` with role-based access. The `/approvals` route, for example, is only accessible to `ADMIN` and `HOD` roles. Any other authenticated user attempting to access it is silently redirected to the dashboard.
- All routes are defined centrally in `App.tsx` with clear groupings for public, private, role-restricted, and event pages.

---

`[SCREENSHOT 8 — Notifications Page: Capture the /notifications page showing notification items with read/unread states.]`

`[SCREENSHOT 9 — Tasks Page: Capture the /tasks page showing the to-do list with task items.]`

---

## 7. UI/UX Contributions

**Did you design the UI or follow a given design?**

I both followed an approved base design and extended it with my own design decisions. The team agreed on a general layout — sidebar navigation, card-based content areas — and I was responsible for translating that into actual working UI. For components and pages not fully specified in the design, such as the calendar views and the approval workflow screens, I made the design decisions independently based on the overall visual language I established.

---

**How did you ensure responsiveness?**

I used Tailwind CSS's responsive breakpoint system throughout. The layout uses CSS Grid with `grid-cols-1 lg:grid-cols-3` patterns, so on mobile screens panels stack vertically, and on desktop they sit side by side. The sidebar collapses appropriately on smaller screens. All modals are viewport-aware and scroll correctly on small devices.

---

**What steps did you take to improve user experience?**

- **Role-aware UI** — Buttons and options that a user cannot use are hidden entirely rather than being shown disabled. For example, the "+ New" button is not rendered at all for Students.
- **Loading and empty states** — Every list (today's events, notifications, tasks) has an explicit empty state with an icon and message rather than just a blank space.
- **Instant feedback** — Form validation errors appear inline without requiring a page reload.
- **Seamless navigation** — After login, users land directly on their role-specific dashboard. After creating an event, users are redirected back to the calendar.
- **Colour-coded events** — Each event category (Lecture, Lab, Exam, Meeting, etc.) has a distinct colour badge to allow quick visual scanning.
- **Conflict warnings** — The event creation form provides immediate visual feedback if location or time conflicts are detected by the backend.

---

**Did you maintain consistency in design?**

Yes. I maintained consistency by:

- Using a shared `Layout` wrapper for all authenticated pages, ensuring the same header and sidebar appear everywhere.
- Defining reusable Tailwind component classes (`.card`, `.btn-primary`, `.btn-outline`, `.badge`, `.status-pending`) in `index.css` to avoid repeating style definitions.
- Using Lucide React as the sole icon library throughout the project — no mixing of icon sets.
- Keeping the same colour palette (primary blue, success green, warning yellow, error red) across all pages and components.

---

`[SCREENSHOT 10 — Settings Page: Capture the /settings page showing the Display & Appearance section with the toggles.]`

`[SCREENSHOT 11 — Profile Page: Capture the /profile page showing the user's details and the edit form.]`

---

## 8. Integration with Backend

**How did you connect frontend with backend APIs?**

I built a layered API integration:

1. **Axios Client** (`src/api/client.ts`) — A pre-configured Axios instance pointing to `http://localhost:5000`. It automatically reads the JWT token from the `useAuthStore` Zustand store and attaches it as the `Authorization: Bearer <token>` header on every request.

2. **Zodios Contract** (`src/api/contract.ts`) — I defined the full API contract using Zodios, which combines Zod schemas with Axios. This gave me end-to-end type safety from API response to TypeScript component props.

3. **TanStack Query Hooks** (`src/api/hooks.ts`) — I wrapped all data fetching in `useQuery` and `useMutation` hooks, which handle caching, background refetching, loading states, and error states automatically.

---

**Did you face issues with API responses or data formats?**

Yes. The main issues I encountered were:

- **Field naming differences** — The backend uses `snake_case` (e.g., `event_id`, `start_datetime`, `created_by`) while the frontend TypeScript types use `camelCase` (e.g., `id`, `start`, `createdBy`). I handled this by writing transformation logic in the API hooks to map between the two formats.
- **Date formats** — The backend returns datetime strings in MySQL `DATETIME` format (`2026-03-04 10:00:00`) while `date-fns` expects JavaScript `Date` objects. I normalised all dates at the API boundary.
- **Role enum casing** — Early in development, the backend and frontend used different casing for role names. We standardised on uppercase (`ADMIN`, `HOD`, `LECTURER`, etc.) after discussing it together.

---

**How did you handle loading states and errors?**

- **Loading states** — TanStack Query provides `isLoading` and `isFetching` flags that I used to show skeleton loaders or spinner indicators on data-heavy pages like the Calendar and Approvals pages.
- **Error states** — API errors are caught in the TanStack Query `onError` callback and displayed as inline error messages or toast notifications.
- **Empty states** — Every page that displays a list (events, notifications, tasks) has a dedicated empty state UI so the user is never shown a blank or broken layout.
- **Global error handling** — The `ErrorBoundary` component at the root of `App.tsx` catches unexpected runtime errors and displays a user-friendly fallback screen.

---

`[SCREENSHOT 12 — Event Details Page: Capture the /event/:id page showing the full event information with the edit and delete buttons (for a role that can edit).]`

---

## 9. Working with QA

**How did QA report bugs to you?**

Kisothana used a structured Markdown bug report format, stored in `QA_1/bug-report.md`, `QA_2/bug-report.md`, and `QA_3/bug-report.md` in the project repository. Each bug report included:

- A unique Bug ID (e.g., `BUG_007`)
- Module name
- Bug type (UI, Functional, Design Mismatch, Enhancement)
- Date of discovery
- Clear title
- Detailed description
- Step-by-step reproduction steps
- Expected vs actual result
- Severity (High, Medium, Low)
- Status (Open/Closed)
- Additional comments

This format made it very easy for me to reproduce and prioritise each issue.

---

**What types of bugs did you fix?**

Across the three QA cycles, I fixed frontend-side bugs in the following categories:

- **Role permission bugs** — UI elements being shown to roles that should not see them (e.g., the "+ New" button visible to Students).
- **Functional bugs** — Buttons with no click handlers wired up (e.g., "Create Event" button on Lecturer dashboard).
- **State synchronisation bugs** — Notification read status not persisting after page navigation; unread bell count not updating after marking notifications as read.
- **UI consistency bugs** — Profile section header appearing differently between Dashboard and Settings pages; toggle buttons having inconsistent styling.
- **Design mismatch bugs** — Features present in the UI that were not in the approved design (extra settings menu items, second sidebar on Tasks page).
- **Settings bugs** — Dark Mode, 24-Hour Clock, Show Event Descriptions, and First Day of Week toggles not applying their changes.

---

**How did you ensure issues were resolved properly?**

After fixing a bug, I would test it myself against the exact reproduction steps listed in the bug report. For bugs that involved the backend (such as notification read status not persisting), I would also coordinate with the backend developer to ensure the API call was being made correctly and the database was being updated. The QA engineer would then re-test in the next cycle and confirm the fix.

---

`[SCREENSHOT 13 — Bug Example (before or after fix): If you have a before/after screenshot of a bug fix — such as the Student dashboard without the "+ New" button — include it here.]`

---

## 10. Challenges Faced

**What frontend-specific challenges did you face?**

1. **Building all three calendar views from scratch** — The Day, Week, and Month views required complex date arithmetic, rendering overlapping events correctly in the time grid, and implementing drag-and-drop using `@dnd-kit`. This was the most technically demanding part of the frontend.

2. **Role-based UI complexity** — The same Dashboard route (`/`) needed to render completely different layouts for six different user roles. Managing this cleanly without a mess of conditionals required careful component decomposition.

3. **State synchronisation** — Keeping the notification badge in the Header in sync with the Notifications page state (both reading from the same store) required careful Zustand store design.

4. **Type safety across API boundaries** — Bridging the `snake_case` backend responses with the `camelCase` TypeScript types while maintaining end-to-end type safety required a deliberate mapping layer.

---

**Were there any issues with backend integration?**

Yes. Early in development, some backend endpoints were not yet complete when I needed to start building the frontend pages that depended on them. I handled this by building the UI against **mock data** first (`src/data/mockData.ts`) and then replacing the mock calls with the real API hooks once the backend endpoints were ready. This decoupled our development and kept me unblocked.

---

**Did team coordination ever become difficult?**

With a three-person team, coordination was generally smooth. The most challenging coordination point was during the QA cycles — when QA found bugs, it was sometimes unclear whether the issue was in the frontend or the backend. For example, the notification read status bug involved both sides: the frontend was calling the mark-as-read API correctly, but the backend state and frontend local state were getting out of sync on navigation. Resolving this required both the backend developer and me to trace the issue together.

---

## 11. Solutions Implemented

**How did you solve those challenges?**

- **Calendar views** — I used `date-fns` extensively for all date calculations (start of week, end of day, hour ranges) and built each view as an independent component that receives events as props and handles its own rendering. `@dnd-kit` provided the drag-and-drop infrastructure for the Day View.

- **Role-based rendering** — I created utility functions in `src/utils/permissions.ts` (`canCreateEvent`, `canApproveEvents`, `isStaffOrAdmin`, `getEventPermissions`) that the components call to decide what to render. This centralised the permission logic in one place rather than scattering role checks across components.

- **API integration gap** — The `mockData.ts` file allowed me to build fully interactive UI before the backend was ready, by populating the Zustand stores with realistic test data.

- **State sync** — I restructured the notification store to be the single source of truth for unread counts, so both the Header badge and the Notifications page read from the same Zustand slice.

---

**Did you improve any existing implementation?**

Yes. After the QA rounds I made several improvements:

- Rewired the Export button on the Dashboard to generate and download a proper CSV file (BUG_008).
- Fixed the `RoleRoute` component to silently redirect unauthorised users to the dashboard instead of showing a blank page.
- Added the `ErrorBoundary` component to prevent the entire app from crashing on unexpected errors.
- Standardised the Header component across all pages to ensure consistent profile information display (addressing BUG_033).

---

**Did you optimize performance or code structure?**

- Used TanStack Query's caching to prevent redundant API calls when navigating between pages that share the same data (e.g., events data shared between Dashboard and Calendar).
- Used `React.lazy` code-splitting opportunities where appropriate to reduce initial bundle size.
- Extracted reusable Tailwind classes into `index.css` components to reduce HTML verbosity and keep templates readable.
- Organised the codebase into a clear `pages/` (route-level) vs `components/` (reusable) separation.

---

## 12. Testing & Debugging

**How did you test your UI before QA testing?**

Before handing over to QA, I performed manual testing by logging in as each of the six user roles and checking every page and interaction. I specifically verified:

- All routes redirect correctly for unauthenticated and unauthorised users.
- Role-specific UI elements appear only for the correct roles.
- The full event creation and approval flow works end-to-end (Lecturer creates → HOD approves → Student sees it).
- The forgot-password OTP flow completes successfully.
- Forms show appropriate validation errors on invalid input.
- The calendar correctly navigates between days, weeks, and months.

---

**What tools did you use for debugging?**

- **Browser Developer Tools** — The Network tab to inspect API request/response payloads and HTTP status codes; the Console for JavaScript errors; the Application tab to inspect localStorage for the auth token.
- **React Developer Tools** — To inspect component state trees and Zustand store values in real time.
- **Vite error overlay** — Vite displays a full-screen error overlay in the browser for TypeScript and runtime errors during development, which made catching build-time issues very fast.

---

**Did you fix cross-browser or device issues?**

I primarily developed and tested in Chrome, and verified the UI in Firefox and Edge. The main cross-browser consideration was the date/time input styling, which varies between browsers. I handled this by using controlled React inputs with `date-fns` for formatting, so the UI is consistent regardless of browser defaults. Responsive behaviour was tested at mobile (375px), tablet (768px), and desktop (1280px+) breakpoints.

---

## 13. Conclusion & Learning

**What did you learn as a frontend developer in a team?**

Working as the sole frontend developer in a team taught me the importance of clear **API contracts**. When the backend and frontend are developed in parallel by different people, misunderstandings about data shapes and endpoint behaviour can cause significant integration delays. Using Zodios and Zod schemas to define the contract explicitly — and validating it at runtime — caught these mismatches early and saved considerable debugging time.

---

**How did this project improve your skills?**

- **React architecture** — I significantly improved my ability to design a scalable React component tree, separating route-level pages from reusable components, and managing global state cleanly with Zustand.
- **TypeScript** — The strict typing I applied throughout the project — including complex union types for roles, event statuses, and permission modes — made me much more confident with advanced TypeScript patterns.
- **Calendar/date logic** — Building the three calendar views from scratch gave me deep experience with date arithmetic using `date-fns`.
- **API integration patterns** — TanStack Query, Axios interceptors, and Zodios contracts are now tools I understand at a production level.

---

**What did you learn about teamwork?**

I learned that communication overhead in a small team can be minimised by making deliverables explicit — the structured QA bug reports, for example, removed ambiguity about what needed to be fixed. I also learned to design the frontend to be as decoupled from the backend timeline as possible (mock data strategy), which allowed both sides to work in parallel without blocking each other.

---

`[SCREENSHOT 14 — Help & Support Page: Capture the /help page showing the four support cards.]`

`[SCREENSHOT 15 — Mobile Responsive View: If possible, capture the dashboard or calendar on a narrow screen (browser dev tools mobile simulation) to demonstrate responsiveness.]`

---

## 14. Future Improvements

**What would you improve in the frontend?**

1. **Complete the Settings functionality** — The Display & Appearance settings (Dark Mode, 24-Hour Clock, First Day of Week, Show Event Descriptions) are wired up in the `useSettingsStore` Zustand store but not fully applied to the calendar rendering and theme. I would complete this binding so every setting has a real effect.

2. **Fix notification state synchronisation** — The unread notification count in the header and the read/unread state on the Notifications page need to share a single reactive source of truth so they always stay in sync.

3. **Improve the Tasks module layout** — Remove the second sidebar from the Tasks page to match the approved design, and simplify the layout to show only the main navigation sidebar.

4. **Add toast notifications** — Currently, success and error feedback after API calls (e.g., "Event created", "Event approved") is shown only through page state. A toast notification system would give immediate, non-blocking feedback.

---

**What additional features would you add?**

1. **Documents, Attendance, Venues, Announcements, Reports modules** — These pages currently show a "coming soon" placeholder. Implementing them would make the system a complete department management tool.

2. **Real-time updates** — Replace polling with WebSocket connections so new events and approvals appear in real time without requiring a page refresh.

3. **Calendar export** — Export the calendar to `.ics` (iCalendar) format so users can import events into Google Calendar or Outlook.

4. **Push notifications** — Browser push notifications for upcoming events and approval status changes.

5. **Dark Mode** — Complete the dark theme implementation so the toggle actually applies a system-wide dark colour scheme.

---

**How can collaboration be improved in future projects?**

1. **Define API contracts upfront** — In the next project, the backend developer and I would agree on all endpoint structures and response formats before writing any code, documented as a shared OpenAPI specification.

2. **Use a project management tool** — Tools like GitHub Issues or Trello would give the team a shared view of tasks and bug status rather than relying on standalone Markdown files.

3. **Set up CI/CD early** — Automated build checks on every pull request would catch integration issues before they reach the QA stage, reducing the number of bugs found in late testing cycles.

---

## Screenshot Placement Summary

For quick reference, here is the list of all screenshots to insert, in order:

| No. | Page/URL | What to Show |
|---|---|---|
| 1 | `/login` | Full login screen with university branding |
| 2 | `/` (Dashboard) | Full dashboard — sidebar, today's schedule, upcoming, notifications |
| 3 | `/calendar` (Month) | Month view calendar with events and mini calendar sidebar |
| 4 | `/add-event` | Add Event form with all fields |
| 5 | `/approvals` | Approvals queue with pending event cards (log in as HOD) |
| 6 | `/calendar` (Week) | Week view showing time slots and events |
| 7 | `/calendar` (Day) | Day view showing hourly time grid |
| 8 | `/notifications` | Notifications page with read/unread items |
| 9 | `/tasks` | Tasks page with to-do list items |
| 10 | `/settings` | Settings page — Display & Appearance section |
| 11 | `/profile` | Profile page with user details |
| 12 | `/event/:id` | Event Details page |
| 13 | Bug fix example | Before/after of a fixed bug (optional) |
| 14 | `/help` | Help & Support page |
| 15 | Mobile view | Responsive layout on narrow screen (DevTools simulation) |

---

*Document prepared by M.M. Salman — Frontend Developer, EC6060 Academic Calendar System*
