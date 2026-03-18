import { format, isSameDay, getHours, getMinutes } from 'date-fns';
import type { Event, Calendar } from '../../types';

interface DayViewProps {
  date: Date;
  events: Event[];
  calendars: Calendar[];
  onEventClick: (event: Event) => void;
}

export default function DayView({ date, events, calendars, onEventClick }: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const dayEvents = events.filter((event) => {
    const eventDate = new Date(event.start);
    return isSameDay(eventDate, date);
  });

  const getCalendarColor = (calendarId: string) => {
    const calendar = calendars.find((c) => c.id === calendarId);
    return calendar?.color || '#6366F1';
  };

  const getEventPosition = (event: Event) => {
    const startHour = getHours(new Date(event.start));
    const startMinute = getMinutes(new Date(event.start));
    const endHour = getHours(new Date(event.end));
    const endMinute = getMinutes(new Date(event.end));

    const top = (startHour + startMinute / 60) * 60;
    const height = ((endHour + endMinute / 60) - (startHour + startMinute / 60)) * 60;

    return { top, height: Math.max(height, 30) };
  };

  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const isToday = isSameDay(date, new Date());

  return (
    <div className="flex flex-col h-full">
      {/* Day Header */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        <div className="w-20 flex-shrink-0" />
        <div className="flex-1 py-3 text-center">
          <p className="text-sm text-gray-500">{format(date, 'EEEE')}</p>
          <p className={`text-2xl font-semibold ${isToday ? 'text-primary' : 'text-gray-900'}`}>
            {format(date, 'd')}
          </p>
        </div>
      </div>

      {/* Time Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex">
          {/* Time Labels */}
          <div className="w-20 flex-shrink-0">
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-[60px] border-b border-gray-100 text-right pr-3 text-xs text-gray-500"
              >
                <span className="-mt-2 block">
                  {format(new Date().setHours(hour, 0), 'h a')}
                </span>
              </div>
            ))}
          </div>

          {/* Events Column */}
          <div className="flex-1 relative">
            {/* Hour Lines */}
            {hours.map((hour) => (
              <div
                key={hour}
                className="h-[60px] border-b border-gray-100 border-l"
              />
            ))}

            {/* Current Time Indicator */}
            {isToday && (
              <div
                className="absolute left-0 right-0 flex items-center z-20"
                style={{ top: `${(currentHour + currentMinute / 60) * 60}px` }}
              >
                <div className="w-3 h-3 bg-red-500 rounded-full -ml-1.5" />
                <div className="flex-1 h-0.5 bg-red-500" />
              </div>
            )}

            {/* Events */}
            {dayEvents.map((event) => {
              const { top, height } = getEventPosition(event);
              return (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className="absolute left-1 right-1 rounded-lg px-2 py-1 cursor-pointer hover:opacity-90 transition-opacity overflow-hidden"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    backgroundColor: getCalendarColor(event.calendarId),
                  }}
                >
                  <p className="text-white text-sm font-medium truncate">{event.title}</p>
                  <p className="text-white/80 text-xs">
                    {format(new Date(event.start), 'h:mm a')} - {format(new Date(event.end), 'h:mm a')}
                  </p>
                  {event.location && (
                    <p className="text-white/70 text-xs truncate">{event.location}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
