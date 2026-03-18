# DCE UoJ Calendar - Department of Computer Engineering, University of Jaffna

A production-quality, **frontend-only** web application with an Outlook-inspired Calendar UI for managing department events, schedules, and resources.

## ✨ Features

- **Outlook-style Calendar UI** with Day, Week, and Month views
- **Role-based Access Control** (Student, Staff, Admin)
- **Event Management** with drag-and-drop support
- **Multiple Calendars** with color coding and visibility settings
- **Resource Booking** with conflict detection
- **Advanced Filtering** by calendar, category, course year/group
- **Audit Logging** for all administrative actions
- **Responsive Design** with Tailwind CSS
- **LocalStorage Persistence** for offline-first experience

## 🚀 Tech Stack

- **React 19** with **TypeScript**
- **Vite** for blazing-fast builds
- **Zustand** for state management
- **React Router** for routing
- **date-fns** for date manipulation
- **@dnd-kit** for drag-and-drop
- **Tailwind CSS** for styling
- **Lucide React** for icons

## 📦 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher

### Installation

```bash
# Navigate to project directory
cd department-calendar

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Demo Credentials

| Role        | Email                 | Password     | Access Level                  |
| ----------- | --------------------- | ------------ | ----------------------------- |
| **Admin**   | `admin@uoj.lk`        | `admin123`   | Full system access            |
| **Staff**   | `rajesh@uoj.lk`       | `staff123`   | Create/edit managed calendars |
| **Student** | `arun@student.uoj.lk` | `student123` | Read-only access              |

## 📁 Project Structure

```
department-calendar/
├── src/
│   ├── components/
│   │   └── calendar/
│   │       ├── TopCommandBar.tsx    # Outlook-style top navigation
│   │       ├── Sidebar.tsx           # Calendar list & mini calendar
│   │       ├── MiniCalendar.tsx      # Month picker
│   │       ├── CalendarGrid.tsx      # Main calendar container
│   │       ├── EventModal.tsx        # Create/edit event form
│   │       ├── EventDetailsModal.tsx # View event details
│   │       ├── FiltersDrawer.tsx     # Advanced filters
│   │       └── views/
│   │           ├── DayView.tsx       # Day view with time grid
│   │           ├── WeekView.tsx      # Week view with columns
│   │           └── MonthView.tsx     # Month grid view
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx         # Login page
│   │   │   └── RegisterPage.tsx      # Registration
│   │   ├── calendar/
│   │   │   └── CalendarPage.tsx      # Main calendar
│   │   └── admin/
│   │       ├── CalendarsPage.tsx     # Calendar management
│   │       ├── UsersPage.tsx         # User management
│   │       └── AuditPage.tsx         # Audit logs
│   ├── stores/
│   │   ├── useAuthStore.ts           # Authentication state
│   │   ├── useCalendarStore.ts       # Calendar view state
│   │   └── useEventStore.ts          # Events & resources
│   ├── types/
│   │   └── index.ts                  # TypeScript types
│   ├── data/
│   │   └── mockData.ts               # Mock data
│   ├── utils/
│   │   ├── permissions.ts            # Permission logic
│   │   └── storage.ts                # LocalStorage
│   ├── App.tsx                       # Root component
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Tailwind styles
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 Role-Based Permissions

### Student

- ✅ View public events (full details)
- ✅ View staff events (limited - shows "Staff Event")
- ✅ View busy events (shows "Busy" only)
- ❌ Cannot see private events
- ❌ Cannot create/edit/delete
- ✅ Toggle calendar visibility

### Staff

- ✅ All student permissions
- ✅ View staff-only events (full details)
- ✅ Create/edit/delete in managed calendars
- ✅ Resource conflict detection
- ❌ No admin panel access

### Admin

- ✅ Full access to everything
- ✅ Create/edit/delete all events
- ✅ Manage calendars and users
- ✅ View audit logs
- ✅ System configuration

## 🗓️ Calendar Views

### Day View

- Hourly time grid (8 AM - 6 PM, scrollable)
- Drag-and-drop scheduling
- Resize events for duration
- Click empty slot to create

### Week View

- 7-day column layout
- Time gutter on left
- Drag events between days
- Resize vertically

### Month View

- Standard month grid
- Multiple events per day
- Event badges with colors
- Click day to create event

## 🎨 Event Properties

- **Basic:** Title, description, location
- **Time:** Start/end date, all-day toggle
- **Organization:** Calendar, category
- **Access:** Visibility (Public/Staff/Private/Busy)
- **Recurrence:** None, Daily, Weekly, Monthly
- **Resources:** Room/lab booking with conflicts

## 🔧 Admin Features

### Calendar Management

- Create/edit/delete calendars
- Set colors and visibility
- Assign calendar managers
- Cascade delete events

### User Management

- View all users
- Assign roles
- View user details
- Deactivate accounts

### Audit Log

- Track all changes
- Filter by action/entity
- See who and when
- View change details

## 💾 Data Persistence

All data stored in **LocalStorage**:

- Events
- Calendars
- Users (demo)
- Audit logs
- Resources

Auto-initializes with mock data on first run.

## 🛠️ Development

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## 🎨 Customization

### Add Event Categories

Edit `src/types/index.ts`:

```typescript
export type EventCategory = "LECTURE" | "LAB" | "EXAM" | "YOUR_TYPE" | "OTHER";
```

### Add Calendars

Edit `src/data/mockData.ts` in `mockCalendars` array.

### Change Colors

Edit calendar colors in `mockData.ts` or theme in `tailwind.config.js`.

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## ⚠️ Known Limitations

1. **No backend** - All data is client-side
2. **Single device** - No data sync
3. **Mock auth** - Demo credentials only
4. **Basic recurrence** - Simple patterns only
5. **No email** - Would need backend

## 🚀 Future Enhancements

- [ ] iCal export
- [ ] Print views
- [ ] Email reminders
- [ ] Event attachments
- [ ] Calendar sharing
- [ ] Mobile app
- [ ] Backend integration
- [ ] Real-time sync

## 🐛 Troubleshooting

### Port in use

Change port in `vite.config.ts`:

```typescript
server: {
  port: 3000;
}
```

### Clear data

```javascript
localStorage.clear();
```

### Reinstall dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

MIT License - Free for educational use

## 👥 Credits

Built for the Department of Computer Engineering, University of Jaffna

---

**Note:** This is a frontend-only demo. For production, implement proper backend with authentication and database.

# se-department-calendar-backend

Backend service for the SE Department Calendar System
