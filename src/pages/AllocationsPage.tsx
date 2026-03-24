import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AllocationsPage = () => {
  const { currentUser, users } = useStore();
  const guides = users.filter(u => u.role === 'guide');
  const students = users.filter(u => u.role === 'student');
  const coordinators = users.filter(u => u.role === 'coordinator');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-foreground">👥 Allocations</h1>
        <p className="text-muted-foreground mt-1">Manage guide-student and coordinator assignments</p>
      </div>

      {currentUser?.role === 'admin' && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold font-display text-foreground mb-4">Coordinators</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {coordinators.map(c => (
              <Card key={c.id} className="p-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  {c.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.department} • {c.email}</p>
                </div>
                <Badge variant="secondary" className="ml-auto">Coordinator</Badge>
              </Card>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold font-display text-foreground mb-4">Guide ↔ Student Allocations</h2>
      <div className="space-y-6">
        {guides.map(guide => {
          const guideStudents = students.filter(s => s.guideId === guide.id);
          return (
            <Card key={guide.id} className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-semibold">
                  {guide.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{guide.name}</p>
                  <p className="text-xs text-muted-foreground">{guide.department} • {guideStudents.length} students</p>
                </div>
              </div>
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {guideStudents.map(s => (
                  <div key={s.id} className="flex items-center gap-2 rounded-lg bg-secondary p-2.5">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{s.name}</p>
                      <p className="text-[10px] text-muted-foreground">{s.rollNo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AllocationsPage;
