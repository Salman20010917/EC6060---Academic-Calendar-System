import { create } from 'zustand';
import type { CalendarState, CalendarView, EventCategory } from '../types';
import { addDays, addWeeks, addMonths, subDays, subWeeks, subMonths } from 'date-fns';

export const useCalendarStore = create<CalendarState>((set, get) => ({
  currentDate: new Date(),
  viewType: 'WEEK',
  selectedCalendars: new Set<string>(),
  filters: {
    calendars: new Set<string>(),
    categories: new Set<EventCategory>(),
    courseYears: new Set<number>(),
    courseGroups: new Set<string>(),
    showPrivate: false,
  },

  setCurrentDate: (date: Date) => set({ currentDate: date }),

  setViewType: (view: CalendarView) => set({ viewType: view }),

  goToToday: () => set({ currentDate: new Date() }),

  goToNext: () => {
    const { currentDate, viewType } = get();
    let newDate: Date;

    switch (viewType) {
      case 'DAY':
        newDate = addDays(currentDate, 1);
        break;
      case 'WEEK':
        newDate = addWeeks(currentDate, 1);
        break;
      case 'MONTH':
        newDate = addMonths(currentDate, 1);
        break;
      default:
        newDate = currentDate;
    }

    set({ currentDate: newDate });
  },

  goToPrevious: () => {
    const { currentDate, viewType } = get();
    let newDate: Date;

    switch (viewType) {
      case 'DAY':
        newDate = subDays(currentDate, 1);
        break;
      case 'WEEK':
        newDate = subWeeks(currentDate, 1);
        break;
      case 'MONTH':
        newDate = subMonths(currentDate, 1);
        break;
      default:
        newDate = currentDate;
    }

    set({ currentDate: newDate });
  },

  toggleCalendar: (calendarId: string) => {
    const { selectedCalendars } = get();
    const newSelected = new Set(selectedCalendars);

    if (newSelected.has(calendarId)) {
      newSelected.delete(calendarId);
    } else {
      newSelected.add(calendarId);
    }

    set({ selectedCalendars: newSelected });
  },

  selectAllCalendars: () => {
    // This will be populated with all calendar IDs when calendars are loaded
    // For now, just clear the set to show all
    set({ selectedCalendars: new Set<string>() });
  },

  deselectAllCalendars: () => {
    set({ selectedCalendars: new Set<string>() });
  },

  setFilters: (filters: Partial<CalendarState['filters']>) => {
    const currentFilters = get().filters;
    set({ filters: { ...currentFilters, ...filters } });
  },
}));
