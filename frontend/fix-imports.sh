#!/bin/bash
# Fix type imports in all files

# Fix TopCommandBar.tsx
sed -i 's/import { CalendarView, UserRole } from/import type { CalendarView, UserRole } from/' src/components/calendar/TopCommandBar.tsx

# Fix stores
sed -i 's/import { AuthState, User, UserRole } from/import type { AuthState, User, UserRole } from/' src/stores/useAuthStore.ts
sed -i 's/import { CalendarState, CalendarView, EventCategory } from/import type { CalendarState, CalendarView, EventCategory } from/' src/stores/useCalendarStore.ts
sed -i 's/import { EventState, Event, Calendar, Resource, AuditLog, EventConflict } from/import type { EventState, Event, Calendar, Resource, AuditLog, EventConflict } from/' src/stores/useEventStore.ts

# Fix utils
sed -i 's/import { User, Event, Calendar, EventPermissions } from/import type { User, Event, Calendar, EventPermissions } from/' src/utils/permissions.ts
sed -i 's/import { Event, Calendar, User, AuditLog, Resource } from/import type { Event, Calendar, User, AuditLog, Resource } from/' src/utils/storage.ts

# Fix mockData
sed -i 's/import { User, Calendar, Event, Resource, AuditLog, EventCategory } from/import type { User, Calendar, Event, Resource, AuditLog } from/' src/data/mockData.ts

echo "Fixed all type imports!"
