# DCE Calendar - Quick Reference Card

## 🚀 Installation & Running

```bash
cd department-calendar
npm install
npm run dev
```
Open: http://localhost:5173

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@uoj.lk | admin123 |
| Staff | rajesh@uoj.lk | staff123 |
| Student | arun@student.uoj.lk | student123 |

## 📂 Key File Locations

### Core Logic
- `src/types/index.ts` - All TypeScript types
- `src/data/mockData.ts` - Sample users, events, calendars
- `src/utils/permissions.ts` - Permission checking
- `src/utils/storage.ts` - LocalStorage operations

### State (Zustand)
- `src/stores/useAuthStore.ts` - Authentication
- `src/stores/useCalendarStore.ts` - Calendar view
- `src/stores/useEventStore.ts` - Events & resources

### Components
- `src/components/calendar/TopCommandBar.tsx` ✅
- `src/components/calendar/Sidebar.tsx` (update needed)
- `src/components/calendar/EventModal.tsx` (update needed)
- `src/components/calendar/FiltersDrawer.tsx` (create)
- `src/components/calendar/EventDetailsModal.tsx` (create)
- `src/components/calendar/views/DayView.tsx` (create)
- `src/components/calendar/views/WeekView.tsx` (create)
- `src/components/calendar/views/MonthView.tsx` (create)

## 💡 Quick Code Snippets

### Get Current User
```typescript
import { useAuthStore } from '../stores/useAuthStore';

function MyComponent() {
  const { user, isAuthenticated } = useAuthStore();
  // user.role: 'STUDENT' | 'STAFF' | 'ADMIN'
}
```

### Check Permissions
```typescript
import { getEventPermissions } from '../utils/permissions';
import { useAuthStore } from '../stores/useAuthStore';

const { user } = useAuthStore();
const permissions = getEventPermissions(event, user, calendar);
// permissions.canEdit, permissions.canDelete, permissions.viewMode
```

### Get Events
```typescript
import { useEventStore } from '../stores/useEventStore';

const { events, calendars, getEventsByDateRange } = useEventStore();
const todayEvents = getEventsByDateRange(startOfDay(new Date()), endOfDay(new Date()));
```

### Add Event
```typescript
import { useEventStore } from '../stores/useEventStore';
import { useAuthStore } from '../stores/useAuthStore';

const { addEvent } = useEventStore();
const { user } = useAuthStore();

const eventId = addEvent({
  calendarId: 'cal-1',
  title: 'New Event',
  start: new Date(),
  end: addHours(new Date(), 1),
  allDay: false,
  visibility: 'PUBLIC',
  category: 'LECTURE',
  createdBy: user!.id,
});
```

### Check Conflicts
```typescript
const { checkEventConflicts } = useEventStore();

const conflicts = checkEventConflicts({
  start: new Date(),
  end: addHours(new Date(), 2),
  resourceId: 'res-1',
});

if (conflicts.length > 0) {
  console.warn('Conflicts detected:', conflicts);
}
```

### Calendar Navigation
```typescript
import { useCalendarStore } from '../stores/useCalendarStore';

const {
  currentDate,
  viewType,
  setViewType,
  goToToday,
  goToNext,
  goToPrevious
} = useCalendarStore();

goToToday(); // Jump to today
setViewType('WEEK'); // Switch to week view
```

### Filter Calendars
```typescript
const { selectedCalendars, toggleCalendar } = useCalendarStore();

toggleCalendar('cal-1'); // Toggle calendar visibility

// Check if calendar is visible
const isVisible = selectedCalendars.size === 0 || selectedCalendars.has('cal-1');
```

## 🎨 Tailwind Utilities

### Colors
- Primary: `bg-blue-600`, `text-blue-600`, `border-blue-600`
- Success: `bg-green-600`, `text-green-600`
- Danger: `bg-red-600`, `text-red-600`
- Gray: `bg-gray-50` to `bg-gray-900`

### Common Patterns
```jsx
// Button Primary
<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
  Click me
</button>

// Button Secondary
<button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50">
  Cancel
</button>

// Input Field
<input
  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

// Modal Backdrop
<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
  <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4">
    {/* Modal content */}
  </div>
</div>
```

## 🔐 Permission Checks

### Can User Create Event?
```typescript
import { canCreateEvent } from '../utils/permissions';

if (canCreateEvent(user, calendar)) {
  // Show create button
}
```

### Filter Visible Calendars
```typescript
import { getVisibleCalendars } from '../utils/permissions';

const visibleCalendars = getVisibleCalendars(calendars, user);
```

### Is Admin?
```typescript
import { isAdmin } from '../utils/permissions';

if (isAdmin(user)) {
  // Show admin features
}
```

## 🗓️ Date Utilities (date-fns)

```typescript
import {
  format,
  addDays,
  addWeeks,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isSameDay,
  isWithinInterval
} from 'date-fns';

// Format date
format(new Date(), 'MMMM d, yyyy'); // "January 12, 2026"
format(new Date(), 'h:mm a'); // "3:45 PM"

// Add time
const tomorrow = addDays(new Date(), 1);
const nextWeek = addWeeks(new Date(), 1);

// Get boundaries
const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday
const weekEnd = endOfWeek(new Date(), { weekStartsOn: 0 });

// Compare
if (isSameDay(date1, date2)) { /* same day */ }
```

## 📊 Calendar Data Structure

### Event
```typescript
{
  id: string;
  calendarId: string;
  title: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
  allDay: boolean;
  visibility: 'PUBLIC' | 'STAFF_ONLY' | 'PRIVATE' | 'BUSY_ONLY';
  category: 'LECTURE' | 'LAB' | 'EXAM' | 'SEMINAR' | 'MEETING' | 'OTHER';
  createdBy: string; // User ID
  resourceId?: string; // Room/Lab ID
  courseCode?: string;
  courseYear?: number;
  courseGroup?: string;
  recurrence?: RecurrenceRule;
}
```

### Calendar
```typescript
{
  id: string;
  name: string;
  color: string; // hex color
  visibility: 'PUBLIC' | 'STAFF_ONLY' | 'PRIVATE';
  managers: string[]; // User IDs who can manage
  description?: string;
  isActive: boolean;
}
```

### User
```typescript
{
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'STAFF' | 'ADMIN';
  department?: string;
  year?: number; // For students
  semester?: number;
  group?: string; // 'A', 'B', etc.
}
```

## 🐛 Debugging

### View LocalStorage
```javascript
// In browser console
localStorage.getItem('dce_calendar_events')
localStorage.getItem('dce_calendar_current_user')
```

### Clear All Data
```javascript
localStorage.clear();
// Then refresh page
```

### Reset to Mock Data
```typescript
import { resetStorage } from '../utils/storage';
resetStorage();
```

### Export All Data
```typescript
import { exportAllData } from '../utils/storage';
const data = exportAllData();
console.log(data);
```

## 🎯 Common Tasks

### Create New Event Category
1. Edit `src/types/index.ts`
2. Add to `EventCategory` type union
3. Update EventModal dropdown

### Add New Calendar
1. Edit `src/data/mockData.ts`
2. Add to `mockCalendars` array
3. Set color, visibility, managers

### Change Theme Colors
1. Edit `tailwind.config.js`
2. Update color palette
3. Or change individual calendar colors in mockData

### Add Custom Permission
1. Edit `src/utils/permissions.ts`
2. Create new permission check function
3. Use in components

## 📦 Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Clean build
rm -rf dist node_modules
npm install
npm run build
```

## 🔗 Useful Links

- [React Docs](https://react.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [date-fns Docs](https://date-fns.org/docs/Getting-Started)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [dnd-kit Docs](https://docs.dndkit.com/)

---

**Pro Tips:**

1. Check `IMPLEMENTATION_GUIDE.md` for complete component code
2. See `SUMMARY.md` for project status and architecture
3. Always test with all three roles (student, staff, admin)
4. Use browser DevTools to inspect LocalStorage
5. Mock data resets on first run if storage is empty

**Quick Test:** Login as student → switch role to admin in UI → verify admin features appear

Happy coding! 🚀
