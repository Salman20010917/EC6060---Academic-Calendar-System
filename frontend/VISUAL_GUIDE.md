# 📸 Visual Guide - What You Should See

## 🎯 Quick Navigation
1. [Login Page](#1-login-page)
2. [Calendar Page (Admin)](#2-calendar-page---admin-view)
3. [Top Navigation Bar](#3-top-navigation-bar-features)
4. [Sidebar](#4-sidebar-features)
5. [Role Switching](#5-role-switching-demo)
6. [Student View](#6-student-view)
7. [Staff View](#7-staff-view)

---

## 1. Login Page

### What You Should See:
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              Department Calendar                    │
│     University of Jaffna - Computer Engineering    │
│                                                     │
│     ┌─────────────────────────────────────┐       │
│     │  Email address                      │       │
│     │  [student@eng.jfn.ac.lk          ]  │       │
│     │                                     │       │
│     │  Password                           │       │
│     │  [••••••••                       ]  │       │
│     │                                     │       │
│     │  [      Sign in      ]              │       │
│     │                                     │       │
│     │  Don't have an account? Register   │       │
│     │                                     │       │
│     │  ╔════════════════════════════╗    │       │
│     │  ║ Demo Credentials:          ║    │       │
│     │  ║ Admin: admin@uoj.lk        ║    │       │
│     │  ║        admin123            ║    │       │
│     │  ║ Staff: rajesh@uoj.lk       ║    │       │
│     │  ║        staff123            ║    │       │
│     │  ║ Student: arun@student...   ║    │       │
│     │  ║          student123        ║    │       │
│     │  ╚════════════════════════════╝    │       │
│     └─────────────────────────────────────┘       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Colors:**
- Background: Blue gradient (light to dark)
- Form: White with shadow
- Demo box: Light blue background
- Text: Dark gray/black
- Links: Blue

**Key Elements:**
✅ Email input field
✅ Password input field (shows dots)
✅ Blue "Sign in" button
✅ "Register here" link
✅ Blue demo credentials box

---

## 2. Calendar Page - Admin View

### Full Layout:
```
┌─────────────────────────────────────────────────────────────────────────┐
│ TOP NAVIGATION BAR                                                      │
│ 🗓️ DCE Calendar | [+ New event ▾] | Day Week Month | ◄ Today ► January│
│                                    Search... Filter      👤 Admin User   │
├─────────┬───────────────────────────────────────────────────────────────┤
│ SIDEBAR │ MAIN CONTENT AREA                                             │
│         │                                                               │
│  [◄]    │  Welcome to DCE Calendar, Admin User!                        │
│ Jan2026 │                                                               │
│  [►]    │  You are logged in as: ADMIN                                 │
│         │                                                               │
│ S M T W │  ┌─────────────────────────────────────┐                     │
│ 1 2 3 4 │  │ Current View Settings                │                     │
│ 5 6 ... │  │ 📅 View Type: WEEK                   │                     │
│         │  │ 📆 Current Date: January 12, 2026    │                     │
│ My Cal. │  │ 📊 Total Calendars: 5                │                     │
│ ☑️ Acad. │  │ 📌 Total Events: 13                  │                     │
│ ☑️ Exams │  └─────────────────────────────────────┘                     │
│ ☑️ Semin│                                                               │
│ ☑️ Staff│  ┌─────────────────────────────────────┐                     │
│ ☑️ Labs │  │ ✅ Working Features                  │                     │
│         │  │ • Authentication & Login             │                     │
│ Legend  │  │ • Role-based permissions             │                     │
│ ■ Acad. │  │ • State management with Zustand      │                     │
│ ■ Exams │  │ • LocalStorage persistence           │                     │
│ ■ Semin │  │ • Mock data loaded (13 events)       │                     │
│ ■ Staff │  │ • Top navigation bar                 │                     │
└─────────┴───────────────────────────────────────────────────────────────┘
```

**Layout Breakdown:**

### Top Bar (White background):
- Left: Blue calendar icon + "DCE Calendar" text
- Center: Blue "New event" button, View buttons (Day/Week/Month), Date nav
- Right: Search box, Filter button, User avatar with name

### Sidebar (White, 256px wide):
- Top: Mini calendar (month view)
- Middle: Scrollable calendar list with checkboxes
- Bottom: Color legend

### Main Area (Light gray background):
- White card with welcome message
- Multiple colored info cards

---

## 3. Top Navigation Bar Features

### Detailed View:
```
┌──────────────────────────────────────────────────────────────────────────┐
│ [🗓️] DCE Calendar │ [+ New event ▾] │                                   │
│                                                                           │
│        [Day] [Week] [Month]   [◄] [Today] [►]  January 12, 2026         │
│                                                                           │
│                    [🔍 Search events...]  [Filter]   [👤 Admin User ▾]   │
└──────────────────────────────────────────────────────────────────────────┘
```

**Interactive Elements:**

1. **DCE Calendar** (left)
   - Calendar icon: Blue
   - Text: Bold, gray

2. **New event button**
   - Background: Blue (#2563eb)
   - Text: White
   - Icon: Plus sign
   - Dropdown arrow

3. **View Switcher** (Day/Week/Month)
   - Inactive: Gray text on light gray background
   - Active (Week): White background, blue text, shadow

4. **Date Navigation**
   - Previous/Next: Gray arrows in rounded buttons
   - Today: Gray text button
   - Date: Bold gray text "January 12, 2026"

5. **Search Box**
   - Light gray border
   - Placeholder: "Search events..."
   - Magnifying glass icon

6. **Filter Button**
   - Gray border
   - Filter icon + text

7. **User Menu**
   - Blue avatar circle with user icon
   - Name: Small gray text
   - Role: Small bold text
   - Dropdown arrow

---

## 4. Sidebar Features

### Mini Calendar Section:
```
┌─────────────────┐
│  [◄] Jan 2026[►]│
│                 │
│ S  M  T  W  T  F│S
│ 1  2  3  4  5  6│7
│ 8  9 10 11[12]13│14  ← [12] is selected (blue)
│15 16 17 18 19 20│21
│22 23 24 25 26 27│28
│29 30 31         │
└─────────────────┘
```

**Visual Details:**
- Month/Year: Bold text
- Arrows: Small gray chevrons in hover-able buttons
- Day headers: Small, light gray (S M T W T F S)
- Today: Light blue background (#dbeafe)
- Selected date: Blue background (#2563eb), white text
- Other dates: Gray text, hover shows light gray background

### Calendar List Section:
```
┌─────────────────┐
│ My Calendars    │
│                 │
│ ☑️ ■ Academic    │ ← Blue square
│ ☑️ ■ Exams       │ ← Red square
│ ☑️ ■ Seminars    │ ← Violet square
│ ☑️ ■ Staff Meet. │ ← Orange square
│ ☑️ ■ Lab Booking │ ← Green square
│                 │
│ Legend          │
│ ■ Academic      │
│ ■ Exams         │
│ ■ Seminars      │
│ ■ Staff Only    │
└─────────────────┘
```

**Visual Details:**
- Header: Bold, small caps, gray
- Each calendar row:
  - Checkbox: Standard checkbox (checked)
  - Color square: 12x12px, rounded corners
  - Calendar name: Gray text, truncates if long
  - Calendar icon: Small gray icon on right
- Hover: Light gray background
- Legend: Light gray background section

---

## 5. Role Switching Demo

### User Menu Dropdown (when clicked):
```
┌──────────────────────────┐
│ [👤 Admin User] ADMIN [▾]│ ← Click here
└──────────┬───────────────┘
           │
           └─> ┌────────────────────────┐
               │ Demo: Switch Role      │
               ├────────────────────────┤
               │ STUDENT                │
               │ STAFF                  │
               │ ADMIN ✓                │ ← Checkmark (current)
               ├────────────────────────┤
               │ 🔧 Admin Settings      │
               │ 🚪 Logout              │ ← Red text
               └────────────────────────┘
```

**What Happens When You Switch:**

### Switch to STUDENT:
```
BEFORE (Admin):              AFTER (Student):
Calendars visible:           Calendars visible:
☑️ Academic                   ☑️ Academic
☑️ Exams                      ☑️ Exams
☑️ Seminars                   ☑️ Seminars
☑️ Staff Meetings ←          ☐ (Hidden)
☑️ Lab Bookings               ☑️ Lab Bookings

Role: ADMIN                  Role: STUDENT
```

### Switch to STAFF:
```
Calendars visible:
☑️ Academic
☑️ Exams
☑️ Seminars
☑️ Staff Meetings ← Back!
☑️ Lab Bookings

Role: STAFF
```

---

## 6. Student View

### What's Different:
```
┌────────────────────────────────────────────────┐
│ [👤 Arun Selvam] STUDENT [▾]                   │ ← Name changes
└────────────────────────────────────────────────┘

Sidebar Calendars:
┌─────────────────┐
│ My Calendars    │
│ ☑️ ■ Academic    │ ← Can see
│ ☑️ ■ Exams       │ ← Can see
│ ☑️ ■ Seminars    │ ← Can see
│                 │ ← Staff Meetings HIDDEN
│ ☑️ ■ Lab Booking │ ← Can see
└─────────────────┘

Dropdown Menu:
┌────────────────────────┐
│ Demo: Switch Role      │
│ STUDENT ✓              │ ← Current
│ STAFF                  │
│ ADMIN                  │
├────────────────────────┤
│ (No Admin Settings)    │ ← Hidden for students
│ 🚪 Logout              │
└────────────────────────┘
```

**Key Differences for Students:**
- ❌ Cannot see "Staff Meetings" calendar
- ❌ No "Admin Settings" menu item
- ✅ Can see all public calendars
- ✅ Can toggle calendar visibility
- ✅ Can navigate dates
- ✅ Cannot create events (New event button visible but would show permissions error)

---

## 7. Staff View

### What's Different:
```
┌────────────────────────────────────────────────┐
│ [👤 Dr. Rajesh Kumar] STAFF [▾]                │ ← Name changes
└────────────────────────────────────────────────┘

Sidebar Calendars:
┌─────────────────┐
│ My Calendars    │
│ ☑️ ■ Academic    │ ← Can see
│ ☑️ ■ Exams       │ ← Can see
│ ☑️ ■ Seminars    │ ← Can see
│ ☑️ ■ Staff Meet. │ ← CAN SEE (Staff-only!)
│ ☑️ ■ Lab Booking │ ← Can see
└─────────────────┘

Dropdown Menu:
┌────────────────────────┐
│ Demo: Switch Role      │
│ STUDENT                │
│ STAFF ✓                │ ← Current
│ ADMIN                  │
├────────────────────────┤
│ (No Admin Settings)    │ ← Hidden for staff
│ 🚪 Logout              │
└────────────────────────┘
```

**Key Differences for Staff:**
- ✅ CAN see "Staff Meetings" calendar
- ❌ No "Admin Settings" menu item
- ✅ Can see all public + staff calendars
- ✅ Can create events in managed calendars
- ✅ More permissions than students

---

## 8. Color Reference

### UI Colors Used:

**Primary Blue:**
- Color: `#2563eb` (blue-600)
- Used for: Buttons, selected items, links, icons

**Backgrounds:**
- White: `#ffffff` (main content)
- Light gray: `#f9fafb` (gray-50, main area)
- Blue gradient: `from-blue-50 to-indigo-100` (login page)

**Text:**
- Primary: `#111827` (gray-900)
- Secondary: `#6b7280` (gray-500)
- Light: `#9ca3af` (gray-400)

**Calendar Colors:**
- Academic: `#2563eb` (blue-600)
- Exams: `#dc2626` (red-600)
- Seminars: `#7c3aed` (violet-600)
- Staff Meetings: `#ea580c` (orange-600)
- Lab Bookings: `#059669` (emerald-600)

**Status Cards:**
- Info (Blue): `bg-blue-50 border-blue-200`
- Success (Green): `bg-green-50 border-green-200`
- Warning (Yellow): `bg-yellow-50 border-yellow-200`
- Feature (Purple): `bg-purple-50 border-purple-200`

---

## 9. Browser Console View

### What You Should See in Console:

When you open DevTools (F12) → Console tab:

```javascript
// No errors (some warnings are ok)

// You can run:
localStorage.getItem('dce_calendar_current_user')
// Output:
"{"id":"user-1","name":"Admin User","email":"admin@uoj.lk","role":"ADMIN",...}"

localStorage.getItem('dce_calendar_calendars')
// Output: (long JSON string with 5 calendars)

localStorage.getItem('dce_calendar_events')
// Output: (very long JSON string with 13 events)
```

**Good Signs:**
- No red error messages
- LocalStorage keys exist
- JSON is properly formatted

**Bad Signs:**
- Red errors about "Cannot read property..."
- "Failed to fetch..."
- Blank LocalStorage

---

## 10. Animation & Interaction

### What Should Animate/Change:

**Hover Effects:**
- Buttons: Slight color darkening
- Calendar rows: Light gray background
- Mini calendar dates: Light gray background

**Click Effects:**
- View buttons: Instant switch to white bg + blue text
- Calendar checkboxes: Instant check/uncheck
- Mini calendar dates: Instant blue highlight
- Dropdown: Smooth open/close

**Smooth Transitions:**
- Role switching: Instant sidebar update
- Date changes: Instant display update
- Toggle calendars: Immediate response

**NOT Animated (for now):**
- Page transitions (instant navigation)
- Modal opening (not implemented yet)
- Calendar view switching (just shows in status)

---

## ✅ Verification Checklist

Use this to verify everything looks correct:

### Login Page:
- [ ] Blue gradient background
- [ ] White form with shadow
- [ ] Email field with placeholder
- [ ] Password field (shows dots)
- [ ] Blue "Sign in" button
- [ ] "Register here" link (blue)
- [ ] Light blue demo credentials box
- [ ] All 3 demo accounts listed

### After Login - Top Bar:
- [ ] Blue calendar icon + "DCE Calendar" text
- [ ] Blue "New event" button
- [ ] Day/Week/Month buttons (Week is white/blue)
- [ ] Gray previous/next arrows
- [ ] "Today" text button
- [ ] Current date displayed
- [ ] Search box with icon
- [ ] Gray "Filter" button
- [ ] Blue user avatar circle
- [ ] User name + role displayed

### After Login - Sidebar:
- [ ] Mini calendar showing current month
- [ ] Month/year with nav arrows
- [ ] Today's date highlighted (blue background)
- [ ] "My Calendars" header
- [ ] 5 calendars listed (or 4 for students)
- [ ] Each with colored square
- [ ] All checked by default
- [ ] Legend at bottom

### After Login - Main Area:
- [ ] Light gray background
- [ ] White card with shadow
- [ ] "Welcome" heading with user name
- [ ] "You are logged in as: [ROLE]"
- [ ] 4 colored status cards:
  - [ ] Blue: Current View Settings
  - [ ] Green: Working Features
  - [ ] Yellow: Still To Implement
  - [ ] Purple: Try These

### Interactions:
- [ ] Click user menu → dropdown appears
- [ ] Click role → UI updates
- [ ] Click view button → shows in status
- [ ] Click date → updates display
- [ ] Check/uncheck calendar → instant response
- [ ] All hovers work

---

## 📊 Size Reference

**Screen Dimensions:**
- Minimum width: 1024px recommended
- Works on: Laptop/desktop screens
- Mobile: Not optimized yet (show desktop site)

**Component Sizes:**
- Sidebar: 256px width
- Top bar: 56px height
- Mini calendar: Fits in sidebar width
- Calendar rows: 48px height
- Avatar: 32x32px
- Calendar color squares: 12x12px

---

## 🎨 If Colors Look Wrong

**Check:**
1. Tailwind CSS is loaded (should be automatic)
2. No browser dark mode interfering
3. CSS loaded properly (check Network tab)

**Fix:**
```bash
# Restart dev server
# Press Ctrl+C
npm run dev
```

---

**🎉 That's It!**

If everything above matches what you see, your DCE Calendar is working perfectly!

The foundation is solid and ready for building the remaining features. 🚀
