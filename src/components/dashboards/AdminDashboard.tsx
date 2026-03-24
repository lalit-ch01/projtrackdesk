import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Users, FolderKanban, Shield, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  const { users, projects, topicSubmissions, reviewSubmissions } = useStore();
  const students = users.filter(u => u.role === 'student');
  const guides = users.filter(u => u.role === 'guide');
  const coordinators = users.filter(u => u.role === 'coordinator');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">System overview and management</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Users', value: users.length, icon: Users, color: 'text-primary' },
          { label: 'Active Projects', value: projects.filter(p => p.status === 'active').length, icon: FolderKanban, color: 'text-accent' },
          { label: 'Submissions', value: topicSubmissions.length + reviewSubmissions.length, icon: BarChart3, color: 'text-info' },
          { label: 'Coordinators', value: coordinators.length, icon: Shield, color: 'text-success' },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center justify-between">
              <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
              <s.icon className={`h-5 w-5 ${s.color} opacity-50`} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="p-5">
          <h3 className="font-semibold font-display text-card-foreground mb-3">Users by Role</h3>
          <div className="space-y-3">
            {[
              { label: 'Students', count: students.length, pct: users.length ? Math.round((students.length / users.length) * 100) : 0 },
              { label: 'Guides', count: guides.length, pct: users.length ? Math.round((guides.length / users.length) * 100) : 0 },
              { label: 'Coordinators', count: coordinators.length, pct: users.length ? Math.round((coordinators.length / users.length) * 100) : 0 },
            ].map(r => (
              <div key={r.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-medium text-foreground">{r.count} ({r.pct}%)</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-secondary">
                  <div className="h-full rounded-full gradient-primary" style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold font-display text-card-foreground mb-3">Project Types</h3>
          <div className="space-y-2">
            {['major-project', 'mini-project', 'seminar', 'assignment', 'research', 'internship'].map(type => {
              const count = projects.filter(p => p.type === type).length;
              if (count === 0) return null;
              return (
                <div key={type} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground capitalize">{type.replace('-', ' ')}</span>
                  <span className="font-medium text-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold font-display text-card-foreground mb-3">System Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">On-time Rate</span>
              <span className="font-semibold text-success">89%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Active Users</span>
              <span className="font-semibold text-foreground">{users.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Avg Response</span>
              <span className="font-semibold text-foreground">1.2 days</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
