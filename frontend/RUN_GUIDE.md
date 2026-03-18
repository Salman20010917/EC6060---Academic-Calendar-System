# 🚀 Step-by-Step Guide to Run DCE Calendar

## ✅ Prerequisites Check

Before starting, make sure you have:
- **Node.js** version 18 or higher
- **npm** version 9 or higher

### Check Your Versions
```bash
node --version
# Should show v18.x.x or higher

npm --version
# Should show 9.x.x or higher
```

If you need to install Node.js, download from: https://nodejs.org/

---

## 📦 Step 1: Install Dependencies

Open a terminal/command prompt and navigate to the project folder:

```bash
cd d:\Salman\Calender\department-calendar
```

Install all required packages:
```bash
npm install
```

**What to expect:**
- This will take 30-60 seconds
- You'll see packages being downloaded
- Should end with "added XXX packages"
- No errors (warnings are okay)

**If you see errors:**
```bash
# Try clearing cache and reinstalling
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Step 2: Start the Development Server

Run the development server:
```bash
npm run dev
```

**What to expect:**
You should see output like this:
```
> department-calendar@0.0.0 dev
> vite

  VITE v7.3.0  ready in 227 ms

  ➜  Local:   http://localhost:5174/
  ➜  Network: use --host to expose
```

**Important:** Note the port number! It might be:
- `http://localhost:5173` (default)
- `http://localhost:5174` (if 5173 is in use)
- Or another port

✅ **Server is running!** Keep this terminal window open.

---

## 🌐 Step 3: Open the Application

### Option A: Automatic (Recommended)
The browser might open automatically to the correct URL.

### Option B: Manual
1. Open your web browser (Chrome, Firefox, Edge, or Safari)
2. Go to the URL shown in the terminal (e.g., http://localhost:5174)

---

## 🔐 Step 4: Login to the Application

### What You Should See:
A clean login page with:
- **"Department Calendar"** heading
- **Email** input field
- **Password** input field
- **"Sign in"** button
- **Blue box** with demo credentials at the bottom

### Login Steps:

1. **Enter credentials:**
   - Email: `admin@uoj.lk`
   - Password: `admin123`

2. **Click "Sign in"** button

3. **Wait 1-2 seconds** (simulated API delay)

### What Happens Next:
- You'll be redirected to the calendar page
- If you see an error, double-check the email and password

---

## 🎨 Step 5: Explore the User Interface

After successful login, you should see:

### 📱 Top Navigation Bar (Outlook-style)
```
┌─────────────────────────────────────────────────────────────┐
│ 🗓️ DCE Calendar | [+ New event ▾]  |  [Day|Week|Month]      │
│                                                               │
│  [◄] [Today] [►]  January 2026   | [🔍 Search] [Filter]     │
│                                                     [👤 Menu] │
└─────────────────────────────────────────────────────────────┘
```

**Features to try:**
- Click **Day/Week/Month** buttons → Changes view type (shows in welcome screen)
- Click **Previous (◄)** button → Goes to previous day/week/month
- Click **Next (►)** button → Goes to next day/week/month
- Click **Today** → Jumps back to current date
- Click **your name (top right)** → Opens dropdown menu

### 📋 Left Sidebar
```
┌──────────────────┐
│  Mini Calendar   │ ← Navigate dates by clicking
│  [◄] Jan 2026 [►]│
│  S M T W T F S   │
│  1 2 3 4 5 6 7   │
│  8 9 ...         │
├──────────────────┤
│  My Calendars    │
│  ☑️ Academic      │ ← Toggle calendars
│  ☑️ Exams         │
│  ☑️ Seminars      │
│  ☑️ Staff Meetings│
│  ☑️ Lab Bookings  │
└──────────────────┘
```

**Features to try:**
- Click **dates** in mini calendar → Changes current date
- Click **◄/►** arrows → Navigate months
- **Check/uncheck** calendars → Toggles visibility

### 📊 Main Welcome Dashboard

You'll see colored information cards showing:

**Blue Card - Current View Settings:**
- View Type: WEEK
- Current Date: January 12, 2026
- Total Calendars: 5
- Total Events: 13

**Green Card - Working Features:**
- ✅ Authentication & Login
- ✅ Role-based permissions
- ✅ State management with Zustand
- ✅ LocalStorage persistence
- ✅ Mock data loaded (13 events)
- ✅ Top navigation bar with role switcher
- ✅ Sidebar with calendar list

**Yellow Card - Still To Implement:**
- 🚧 Calendar views (Day, Week, Month)
- 🚧 Event creation modal
- 🚧 Event details modal
- 🚧 Drag-and-drop functionality
- 🚧 Filters drawer
- 🚧 Admin pages

**Purple Card - Try These:**
- Click your name in the top right to switch roles
- Try switching between Day/Week/Month views
- Use Previous/Next buttons to navigate dates
- Toggle calendars on/off in the sidebar
- Check the browser console for any errors

---

## 🎮 Step 6: Test Interactive Features

### 1. Switch User Roles (Demo Mode)

1. Click **your name** in the top right corner ("Admin User")
2. You'll see a dropdown menu:
   ```
   Demo: Switch Role
   ──────────────────
   STUDENT
   STAFF
   ADMIN ✓
   ──────────────────
   🔧 Admin Settings
   🚪 Logout
   ```
3. Click **STUDENT**
4. **Watch what happens:**
   - Your role changes to "STUDENT"
   - Sidebar calendars update (Staff Meetings disappears!)
   - This shows role-based permissions working

5. **Try switching to STAFF:**
   - Click your name again
   - Select **STAFF**
   - Now you see Staff Meetings calendar again

6. **Switch back to ADMIN:**
   - Click your name
   - Select **ADMIN**
   - You see all calendars

### 2. Navigate Dates

**Using Top Bar:**
1. Click **Week** button (if not already selected)
2. Click **Previous (◄)** button
   - Notice the date changes to previous week
3. Click **Next (►)** button twice
   - Notice date advances
4. Click **Today**
   - Jumps back to current date

**Using Mini Calendar:**
1. Look at the mini calendar in sidebar
2. Click **tomorrow's date**
   - Top bar updates to show new date
3. Click the **◄** arrow (left of month name)
   - Goes to previous month
4. Click the **►** arrow
   - Goes to next month

### 3. Toggle Calendars

1. Look at sidebar calendar list
2. **Uncheck "Exams"** calendar
   - Checkbox becomes empty
3. **Uncheck "Academic"** calendar
4. **Check them both again**
   - They become selected

### 4. View Browser Data

Open browser Developer Tools:
- **Chrome/Edge:** Press `F12` or `Ctrl+Shift+I`
- **Firefox:** Press `F12`
- **Safari:** Press `Cmd+Option+I`

Go to **Console** tab and paste:

```javascript
// See current user
console.log(JSON.parse(localStorage.getItem('dce_calendar_current_user')));

// See all calendars
console.log(JSON.parse(localStorage.getItem('dce_calendar_calendars')));

// See all events (will be long!)
console.log(JSON.parse(localStorage.getItem('dce_calendar_events')));
```

You should see the data structure!

---

## 🎯 Step 7: Test Different User Roles

### Test as STUDENT

1. **Logout:**
   - Click your name → **Logout**
   - You're back at login page

2. **Login as student:**
   - Email: `arun@student.uoj.lk`
   - Password: `student123`

3. **What's different?**
   - ❌ No "Staff Meetings" calendar (staff-only)
   - ❌ Role shows as "STUDENT"
   - ✅ Can still see public calendars

### Test as STAFF

1. **Logout** again

2. **Login as staff:**
   - Email: `rajesh@uoj.lk`
   - Password: `staff123`

3. **What's different?**
   - ✅ Can see "Staff Meetings" calendar
   - ✅ Role shows as "STAFF"
   - ✅ More permissions than student

### Test as ADMIN

1. **Logout** again

2. **Login as admin:**
   - Email: `admin@uoj.lk`
   - Password: `admin123`

3. **What you get:**
   - ✅ Full access to all calendars
   - ✅ Admin Settings link in dropdown menu
   - ✅ Role shows as "ADMIN"

---

## ✅ Verification Checklist

Make sure all of these work:

- [ ] **npm run dev** starts without errors
- [ ] Browser opens to login page
- [ ] Can login with admin credentials
- [ ] See welcome dashboard with status cards
- [ ] Top navigation bar displays correctly
- [ ] Can see user name and role in top right
- [ ] Sidebar shows mini calendar
- [ ] Sidebar shows 5 calendars with colored dots
- [ ] Can click dates in mini calendar
- [ ] Can toggle calendars with checkboxes
- [ ] Day/Week/Month buttons are clickable
- [ ] Previous/Next buttons change the date
- [ ] Today button works
- [ ] Can open user dropdown menu
- [ ] Can switch between roles
- [ ] Sidebar calendars change based on role
- [ ] Can logout successfully
- [ ] Can login with different roles

---

## 🐛 Troubleshooting

### Problem: Port Already in Use

**Error message:**
```
Port 5173 is in use, trying another one...
```

**Solution:**
- This is normal! Vite will automatically use port 5174
- Just use the URL Vite shows you

**Or kill the process:**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

### Problem: Blank White Page

**Possible causes:**
1. JavaScript errors
2. Build issues
3. Browser cache

**Solution:**
```bash
# 1. Check browser console for errors (F12)

# 2. Clear browser cache and reload (Ctrl+Shift+R)

# 3. Restart dev server
# Press Ctrl+C in terminal to stop
npm run dev

# 4. Rebuild
rm -rf node_modules
npm install
npm run dev
```

### Problem: Login Doesn't Work

**Symptoms:**
- Click Sign in, nothing happens
- Or see error message

**Solution:**
1. **Check credentials exactly:**
   - Email: `admin@uoj.lk` (not .com!)
   - Password: `admin123` (no spaces!)

2. **Check browser console (F12):**
   - Look for red error messages
   - Should see "login successful" or similar

3. **Clear LocalStorage:**
   ```javascript
   localStorage.clear()
   // Then refresh page (F5)
   ```

### Problem: Calendars Not Showing

**Solution:**
1. Open browser console (F12)
2. Run:
   ```javascript
   localStorage.clear()
   ```
3. Refresh page (F5)
4. Login again

### Problem: TypeScript Errors

**Error message:**
```
Type error: ...
```

**Solution:**
```bash
# Check what's wrong
npx tsc --noEmit

# If it's a minor issue, ignore and run anyway:
npm run dev
```

---

## 📸 Expected Screenshots

### Login Page
- Clean white form on blue gradient
- Email and password fields
- Demo credentials box at bottom
- "Sign in" button

### Calendar Page After Login
- Top bar with "DCE Calendar" and navigation
- Left sidebar with mini calendar
- Main area with welcome dashboard
- Colored status cards (blue, green, yellow, purple)

### User Dropdown Menu
- Shows when you click user name
- Lists: STUDENT, STAFF, ADMIN
- Admin Settings link (for admin only)
- Logout button at bottom

---

## 🎉 Success Criteria

**You've successfully run the project if:**

1. ✅ Server starts on http://localhost:5173 or 5174
2. ✅ Login page appears in browser
3. ✅ Can login with demo credentials
4. ✅ See calendar page with:
   - Outlook-style top bar
   - Sidebar with calendars
   - Welcome dashboard
5. ✅ Can switch roles and see UI update
6. ✅ Can navigate dates
7. ✅ Can toggle calendars
8. ✅ No red errors in browser console

**Congratulations! 🎊**
Your DCE Calendar foundation is working perfectly!

---

## 📚 What's Next?

Now that the foundation is working, you can:

1. **Explore the code:**
   - Check `src/stores/` for state management
   - Look at `src/types/index.ts` for data structures
   - Review `src/utils/permissions.ts` for role logic

2. **Build remaining features:**
   - Read `IMPLEMENTATION_GUIDE.md` for code examples
   - Create calendar views (Day, Week, Month)
   - Add event modals
   - Implement drag-and-drop

3. **Customize:**
   - Edit `src/data/mockData.ts` to add more events
   - Change colors in calendar definitions
   - Add new event categories

---

## 💡 Quick Commands Reference

```bash
# Start development server
npm run dev

# Stop server
# Press Ctrl+C in terminal

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run lint

# Type check
npx tsc --noEmit

# Clear everything and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🆘 Still Having Issues?

1. **Check all files are updated:**
   - src/App.tsx
   - src/pages/auth/LoginPage.tsx
   - src/pages/calendar/CalendarPage.tsx
   - src/components/calendar/Sidebar.tsx
   - src/components/calendar/MiniCalendar.tsx

2. **Verify dependencies installed:**
   ```bash
   npm list zustand date-fns react-router-dom
   ```

3. **Check Node version:**
   ```bash
   node --version
   # Should be v18 or higher
   ```

4. **Try in different browser:**
   - Chrome (recommended)
   - Firefox
   - Edge

5. **Clear everything:**
   ```bash
   # Clear browser data (F12 → Application → Clear storage)
   # Clear npm cache
   npm cache clean --force
   # Reinstall
   rm -rf node_modules
   npm install
   npm run dev
   ```

---

**Remember:** The server must stay running! Keep the terminal open while you use the app.

**Happy Calendar Building! 🗓️**
