# DCE Calendar - Complete Implementation Guide

This document contains all the remaining code needed to complete the frontend-only calendar application.

## Files Already Created ✅

1. `src/types/index.ts` - Complete TypeScript types
2. `src/data/mockData.ts` - Mock data (users, calendars, events, resources)
3. `src/utils/permissions.ts` - Permission logic
4. `src/utils/storage.ts` - LocalStorage persistence
5. `src/stores/useAuthStore.ts` - Authentication store
6. `src/stores/useCalendarStore.ts` - Calendar view store
7. `src/stores/useEventStore.ts` - Events and resources store
8. `src/components/calendar/TopCommandBar.tsx` - Outlook-style top bar
9. `package.json` - Updated with all dependencies
10. `README.md` - Complete documentation

## Files to Create/Update

### 1. Update Sidebar Component

**File:** `src/components/calendar/Sidebar.tsx`

```typescript
import { useState } from 'react';
import { Calendar, Plus, ChevronRight } from 'lucide-react';
import { useEventStore } from '../../stores/useEventStore';
import { useCalendarStore } from '../../stores/useCalendarStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { getVisibleCalendars } from '../../utils/permissions';
import clsx from 'clsx';
import MiniCalendar from './MiniCalendar';

export default function Sidebar() {
  const { calendars } = useEventStore();
  const { selectedCalendars, toggleCalendar } = useCalendarStore();
  const { user } = useAuthStore();
  const [showAll, setShowAll] = useState(true);

  const visibleCalendars = getVisibleCalendars(calendars, user);

  // Group calendars
  const myCalendars = visibleCalendars.filter(cal =>
    cal.managers.includes(user?.id || '')
  );
  const deptCalendars = visibleCalendars.filter(cal =>
    cal.visibility === 'PUBLIC' && !myCalendars.includes(cal)
  );
  const staffCalendars = visibleCalendars.filter(cal =>
    cal.visibility === 'STAFF_ONLY'
  );

  const isCalendarVisible = (calId: string) => {
    return selectedCalendars.size === 0 || selectedCalendars.has(calId);
  };

  const CalendarGroup = ({ title, calendars: cals, collapsible = false }: any) => {
    const [collapsed, setCollapsed] = useState(false);

    if (cals.length === 0) return null;

    return (
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase">{title}</h3>
          {collapsible && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRight
                className={clsx('w-4 h-4 transition-transform', !collapsed && 'rotate-90')}
              />
            </button>
          )}
        </div>
        {!collapsed && (
          <div className="space-y-1">
            {cals.map((cal: any) => (
              <label
                key={cal.id}
                className="flex items-center space-x-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={isCalendarVisible(cal.id)}
                  onChange={() => toggleCalendar(cal.id)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: cal.color }}
                />
                <span className="text-sm text-gray-700 flex-1 truncate">
                  {cal.name}
                </span>
                {cal.isActive && (
                  <div className="w-2 h-2 bg-green-500 rounded-full" title="Active" />
                )}
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        {/* Mini Calendar */}
        <MiniCalendar />

        <div className="mt-6">
          {/* Add Calendar Button */}
          {user?.role === 'ADMIN' && (
            <button className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded text-sm font-medium text-gray-700 transition-colors mb-4">
              <Plus className="w-4 h-4" />
              <span>Add calendar</span>
            </button>
          )}

          {/* Calendar Lists */}
          <CalendarGroup title="My Calendars" calendars={myCalendars} />
          <CalendarGroup title="Department Calendars" calendars={deptCalendars} collapsible />
          {staffCalendars.length > 0 && (
            <CalendarGroup title="Staff Calendars" calendars={staffCalendars} collapsible />
          )}

          {/* Show All Toggle */}
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full text-left px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded"
          >
            {showAll ? 'Hide some' : 'Show all'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

### 2. Create FiltersDrawer Component

**File:** `src/components/calendar/FiltersDrawer.tsx`

```typescript
import { X } from 'lucide-react';
import { useCalendarStore } from '../../stores/useCalendarStore';
import { EventCategory } from '../../types';

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FiltersDrawer({ isOpen, onClose }: FiltersDrawerProps) {
  const { filters, setFilters } = useCalendarStore();

  const categories: EventCategory[] = ['LECTURE', 'LAB', 'EXAM', 'SEMINAR', 'MEETING', 'OTHER'];
  const years = [1, 2, 3, 4];
  const groups = ['A', 'B', 'C'];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-25 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.categories.has(category)}
                    onChange={() => {
                      const newCategories = new Set(filters.categories);
                      if (newCategories.has(category)) {
                        newCategories.delete(category);
                      } else {
                        newCategories.add(category);
                      }
                      setFilters({ categories: newCategories });
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Course Years */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Course Year</h3>
            <div className="space-y-2">
              {years.map((year) => (
                <label key={year} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.courseYears.has(year)}
                    onChange={() => {
                      const newYears = new Set(filters.courseYears);
                      if (newYears.has(year)) {
                        newYears.delete(year);
                      } else {
                        newYears.add(year);
                      }
                      setFilters({ courseYears: newYears });
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Year {year}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Course Groups */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Course Group</h3>
            <div className="space-y-2">
              {groups.map((group) => (
                <label key={group} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filters.courseGroups.has(group)}
                    onChange={() => {
                      const newGroups = new Set(filters.courseGroups);
                      if (newGroups.has(group)) {
                        newGroups.delete(group);
                      } else {
                        newGroups.add(group);
                      }
                      setFilters({ courseGroups: newGroups });
                    }}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Group {group}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setFilters({
                categories: new Set(),
                courseYears: new Set(),
                courseGroups: new Set(),
              });
            }}
            className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
}
```

### 3. Create EventDetailsModal Component

**File:** `src/components/calendar/EventDetailsModal.tsx`

```typescript
import { X, Edit2, Trash2, MapPin, Calendar, Clock } from 'lucide-react';
import { Event, Calendar as CalendarType } from '../../types';
import { format } from 'date-fns';
import { useAuthStore } from '../../stores/useAuthStore';
import { getEventPermissions, getEventDisplayText } from '../../utils/permissions';

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  calendar: CalendarType;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function EventDetailsModal({
  isOpen,
  onClose,
  event,
  calendar,
  onEdit,
  onDelete,
}: EventDetailsModalProps) {
  const { user } = useAuthStore();

  if (!isOpen) return null;

  const permissions = getEventPermissions(event, user, calendar);
  const displayText = getEventDisplayText(event, permissions.viewMode);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl m-4" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: calendar.color }} />
              <h2 className="text-lg font-semibold text-gray-900">{displayText.title}</h2>
            </div>
            <div className="flex items-center space-x-2">
              {permissions.canEdit && onEdit && (
                <button
                  onClick={onEdit}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                  title="Edit"
                >
                  <Edit2 className="w-5 h-5 text-gray-600" />
                </button>
              )}
              {permissions.canDelete && onDelete && (
                <button
                  onClick={onDelete}
                  className="p-2 hover:bg-red-50 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {permissions.viewMode === 'FULL' ? (
              <>
                {/* Time */}
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {event.allDay ? (
                        format(new Date(event.start), 'EEEE, MMMM d, yyyy')
                      ) : (
                        <>
                          {format(new Date(event.start), 'EEEE, MMMM d, yyyy · h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Calendar */}
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-700">{calendar.name}</div>
                  </div>
                </div>

                {/* Location */}
                {displayText.location && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-700">{displayText.location}</div>
                    </div>
                  </div>
                )}

                {/* Description */}
                {displayText.description && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{displayText.description}</p>
                  </div>
                )}

                {/* Metadata */}
                <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Category:</span>
                    <span className="ml-2 text-gray-900">{event.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Visibility:</span>
                    <span className="ml-2 text-gray-900">{event.visibility}</span>
                  </div>
                  {event.courseCode && (
                    <div>
                      <span className="text-gray-500">Course:</span>
                      <span className="ml-2 text-gray-900">{event.courseCode}</span>
                    </div>
                  )}
                  {event.courseYear && (
                    <div>
                      <span className="text-gray-500">Year/Group:</span>
                      <span className="ml-2 text-gray-900">Year {event.courseYear} {event.courseGroup ? `Group ${event.courseGroup}` : ''}</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>{permissions.viewMode === 'BUSY' ? 'This time is marked as busy.' : 'Limited information available.'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
```

## Next Steps

1. **Create remaining view components** (DayView, WeekView, MonthView) with drag-and-drop
2. **Update CalendarPage** to wire everything together
3. **Create admin pages** (CalendarsPage, UsersPage, AuditPage)
4. **Update App.tsx** with proper routing
5. **Test all role-based permissions**

The foundation is complete! These files provide the data layer, state management, and utility functions. The remaining UI components will build on this solid base.

## Testing the Application

Once complete, test with:

1. Login as each role (student, staff, admin)
2. Create events in different calendars
3. Test drag-and-drop in day/week views
4. Verify permission restrictions
5. Check conflict detection for resources
6. Test calendar filtering
7. Verify audit logging in admin panel

All data persists in LocalStorage, so refreshing the page will maintain state.
