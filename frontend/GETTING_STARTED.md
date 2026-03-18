# Getting Started - DCE Calendar

## ✅ What's Working Now

After running `npm run dev`, you should see:

1. **Login Page** at http://localhost:5173/login
2. **Working Authentication** with demo credentials
3. **Main Calendar Page** with:
   - Outlook-style top navigation bar
   - Sidebar with calendar list and mini calendar
   - Welcome dashboard showing what's working

## 🚀 Quick Start

```bash
cd department-calendar
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## 🔑 Login Credentials

Use any of these to test different roles:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@uoj.lk | admin123 |
| **Staff** | rajesh@uoj.lk | staff123 |
| **Student** | arun@student.uoj.lk | student123 |

## 🎯 What to Try

### 1. Login & Authentication
- Try logging in with each role
- Notice the login persists even after page refresh
- Check the browser's LocalStorage to see stored data

### 2. Top Navigation Bar
- Click your name in top right to open role menu
- **Switch roles** to see how permissions change
- Try clicking Day/Week/Month buttons
- Use Previous/Next buttons to navigate dates
- Click "Today" to jump back to current date

### 3. Sidebar
- See the mini calendar
- Navigate months using arrows
- Click dates to change the main view
- Toggle calendars on/off with checkboxes
- Notice different calendars for different roles

### 4. Check the Data
Open browser console and try:
```javascript
// See all stored events
localStorage.getItem('dce_calendar_events')

// See current user
localStorage.getItem('dce_calendar_current_user')

// See all calendars
localStorage.getItem('dce_calendar_calendars')
```

## 📊 Current Features

✅ **Working:**
- Login/Logout
- Role-based authentication
- State management (Zustand)
- LocalStorage persistence
- Mock data (13 events, 5 calendars, 6 users)
- Top command bar
- Sidebar with mini calendar
- Calendar list with visibility toggle
- Date navigation
- Role switching (demo mode)

🚧 **Still To Build:**
- Calendar views (Day/Week/Month grid)
- Event creation modal
- Event details modal
- Drag-and-drop
- Filters drawer
- Admin pages

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173

# Or change port in vite.config.ts
```

### Blank Page / Errors
1. Check browser console for errors
2. Make sure you ran `npm install`
3. Try clearing LocalStorage:
   ```javascript
   localStorage.clear()
   ```
4. Refresh the page

### Login Not Working
- Make sure you're using the exact credentials above
- Check browser console for errors
- Try clearing LocalStorage and refreshing

### TypeScript Errors
```bash
# Run type check
npx tsc --noEmit

# Check for import errors
```

## 📁 Key Files Updated

These files have been updated to work with the new stores:

1. `src/App.tsx` - Routing with new auth store
2. `src/pages/auth/LoginPage.tsx` - Login with new auth
3. `src/pages/calendar/CalendarPage.tsx` - Main page with stores
4. `src/components/calendar/Sidebar.tsx` - Uses event store
5. `src/components/calendar/MiniCalendar.tsx` - Uses calendar store
6. `src/components/calendar/TopCommandBar.tsx` - Complete Outlook style

## 🔍 Verify Everything Works

### Test Checklist:
- [ ] Login page appears at http://localhost:5173
- [ ] Can login with admin credentials
- [ ] After login, see welcome dashboard
- [ ] Top bar shows user name and role
- [ ] Can click role dropdown and switch roles
- [ ] Mini calendar appears in sidebar
- [ ] Can see list of calendars in sidebar
- [ ] Can toggle calendars with checkboxes
- [ ] Day/Week/Month buttons work
- [ ] Previous/Next buttons work
- [ ] Today button works
- [ ] Logout works and returns to login page

## 🎨 Visual Check

You should see:

**Login Page:**
- Clean white form on gradient background
- Email and password fields
- "Sign in" button
- Demo credentials box with all login info
- Link to register page

**Calendar Page:**
- **Top bar:** App name, New event button, view switcher, date navigation, search, filter, user menu
- **Left sidebar:** Mini calendar + list of 5 calendars with colored dots
- **Main area:** Welcome dashboard with status cards showing:
  - Your role
  - Current view settings (Week, current date, 5 calendars, 13 events)
  - Green box with working features
  - Yellow box with features to build
  - Purple box with things to try

## 📝 Next Steps

To continue building:

1. **Read IMPLEMENTATION_GUIDE.md** for code examples
2. **Create missing components** (views, modals, admin pages)
3. **Test with all three roles** to verify permissions
4. **Add drag-and-drop** for event scheduling

## 💡 Understanding the Architecture

### State Flow:
```
User Login → useAuthStore → LocalStorage
     ↓
Calendar Page → useEventStore (events, calendars)
                useCalendarStore (view, date)
     ↓
Components → Read from stores
     ↓
User Actions → Update stores → LocalStorage
```

### Permission Flow:
```
Event + User + Calendar → getEventPermissions()
     ↓
Returns: { canView, canEdit, canDelete, viewMode }
     ↓
UI shows/hides based on permissions
```

## 🎓 Learning Resources

**To understand the code:**
1. Start with `src/types/index.ts` to see all data structures
2. Look at `src/stores/` to understand state management
3. Check `src/utils/permissions.ts` for role logic
4. Review `src/data/mockData.ts` for sample data

**To add features:**
1. Read IMPLEMENTATION_GUIDE.md for component examples
2. Check QUICK_REFERENCE.md for code snippets
3. See FILE_TREE.md for project structure

## ✨ Success!

If you can:
- Login with any role ✅
- See the welcome dashboard ✅
- Switch roles and see UI update ✅
- Toggle calendars in sidebar ✅
- Navigate dates ✅

Then the foundation is working perfectly! 🎉

The hard part (stores, types, data, permissions) is done. Now it's just building the remaining UI components.

---

**Need Help?** Check the other documentation files:
- `README.md` - Full project overview
- `IMPLEMENTATION_GUIDE.md` - Code for remaining components
- `QUICK_REFERENCE.md` - Code snippets
- `SUMMARY.md` - Project status
