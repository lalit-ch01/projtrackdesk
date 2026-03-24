import { useState, useMemo } from 'react';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CalendarPage = () => {
  const { calendarEvents } = useStore();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const days = useMemo(() => {
    const arr: (number | null)[] = Array(firstDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) arr.push(i);
    return arr;
  }, [firstDay, daysInMonth]);

  const getEventsForDay = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return calendarEvents.filter(e => e.date === dateStr);
  };

  const selectedEvents = selectedDate ? calendarEvents.filter(e => e.date === selectedDate) : [];

  const typeColors: Record<string, string> = {
    start: 'bg-primary',
    deadline: 'bg-destructive',
    review: 'bg-accent',
    end: 'bg-success',
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-foreground">📅 Project Calendar</h1>
        <p className="text-muted-foreground mt-1">All deadlines, reviews, and milestones</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="icon" onClick={() => setCurrentDate(new Date(year, month - 1))}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold font-display text-card-foreground">{monthName}</h2>
            <Button variant="ghost" size="icon" onClick={() => setCurrentDate(new Date(year, month + 1))}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
            ))}
            {days.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />;
              const events = getEventsForDay(day);
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = selectedDate === dateStr;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`relative min-h-[64px] rounded-lg border p-1.5 text-left text-xs transition-colors ${
                    isSelected ? 'border-primary bg-primary/5' : 'border-transparent hover:bg-secondary'
                  }`}
                >
                  <span className={`font-medium ${events.length > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>{day}</span>
                  <div className="mt-0.5 space-y-0.5">
                    {events.slice(0, 2).map(e => (
                      <div key={e.id} className={`${typeColors[e.type]} rounded px-1 py-0.5 text-[9px] font-medium text-primary-foreground truncate`}>
                        {e.title.substring(0, 12)}
                      </div>
                    ))}
                    {events.length > 2 && <span className="text-[9px] text-muted-foreground">+{events.length - 2} more</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <div>
          <Card className="p-5">
            <h3 className="font-semibold font-display text-card-foreground mb-4">
              {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : 'Select a date'}
            </h3>
            {selectedEvents.length > 0 ? (
              <div className="space-y-3">
                {selectedEvents.map(e => (
                  <div key={e.id} className="flex items-start gap-3">
                    <div className={`mt-1 h-3 w-3 rounded-full shrink-0 ${typeColors[e.type]}`} />
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{e.title}</p>
                      <Badge variant="outline" className="text-[10px] mt-1">{e.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{selectedDate ? 'No events on this date.' : 'Click a date to see events.'}</p>
            )}
          </Card>

          <Card className="p-5 mt-4">
            <h3 className="font-semibold font-display text-card-foreground mb-3">Legend</h3>
            <div className="space-y-2">
              {[
                { type: 'start', label: 'Project Start', color: 'bg-primary' },
                { type: 'deadline', label: 'Deadline', color: 'bg-destructive' },
                { type: 'review', label: 'Review', color: 'bg-accent' },
                { type: 'end', label: 'Project End', color: 'bg-success' },
              ].map(l => (
                <div key={l.type} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className={`h-2.5 w-2.5 rounded-full ${l.color}`} />
                  {l.label}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
