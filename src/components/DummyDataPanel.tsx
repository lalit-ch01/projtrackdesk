import { useState } from 'react';
import { Database, Trash2, Plus, ChevronRight, ChevronLeft } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';

const DummyDataPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { users, projects, topicSubmissions, reviews, reviewSubmissions, rubrics, calendarEvents, notifications, loadDummyData, clearAllData } = useStore();

  const stats = [
    { label: 'Users', count: users.length },
    { label: 'Projects', count: projects.length },
    { label: 'Topics', count: topicSubmissions.length },
    { label: 'Reviews', count: reviews.length },
    { label: 'Submissions', count: reviewSubmissions.length },
    { label: 'Rubrics', count: rubrics.length },
    { label: 'Events', count: calendarEvents.length },
    { label: 'Notifications', count: notifications.length },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:opacity-90"
      >
        <Database className="h-4 w-4" />
        <span className="hidden sm:inline">Data</span>
        {isOpen ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      {isOpen && (
        <div className="fixed top-14 right-4 z-50 w-72 rounded-xl border bg-card p-4 shadow-xl animate-slide-in">
          <h3 className="mb-3 text-sm font-semibold text-card-foreground font-display">Dummy Database</h3>
          
          <div className="mb-4 grid grid-cols-2 gap-2">
            {stats.map(s => (
              <div key={s.label} className="rounded-lg bg-secondary p-2 text-center">
                <p className="text-lg font-bold text-foreground">{s.count}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={loadDummyData} size="sm" className="flex-1 gap-1.5">
              <Plus className="h-3.5 w-3.5" />
              Load Data
            </Button>
            <Button onClick={clearAllData} size="sm" variant="destructive" className="flex-1 gap-1.5">
              <Trash2 className="h-3.5 w-3.5" />
              Clear All
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DummyDataPanel;
