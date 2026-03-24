import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { FolderKanban, Users, FileText, BarChart3 } from 'lucide-react';

const CoordinatorDashboard = () => {
  const { currentUser, projects, topicSubmissions, users, reviewSubmissions } = useStore();
  if (!currentUser) return null;

  const students = users.filter(u => u.role === 'student');
  const guides = users.filter(u => u.role === 'guide');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-foreground">Coordinator Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage projects, reviews, and student progress</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Projects', value: projects.filter(p => p.status === 'active').length, icon: FolderKanban, color: 'text-primary' },
          { label: 'Total Students', value: students.length, icon: Users, color: 'text-accent' },
          { label: 'Topics Submitted', value: topicSubmissions.filter(t => t.status !== 'draft').length, icon: FileText, color: 'text-info' },
          { label: 'Guides', value: guides.length, icon: BarChart3, color: 'text-success' },
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

      {/* Project Overview */}
      <h2 className="text-lg font-semibold font-display text-foreground mb-4">Project Status Overview</h2>
      <div className="space-y-4">
        {projects.filter(p => p.status === 'active').map(project => {
          const topics = topicSubmissions.filter(t => t.projectId === project.id);
          const submitted = topics.filter(t => t.status !== 'draft').length;
          const approved = topics.filter(t => t.status === 'approved').length;
          const pct = students.length > 0 ? Math.round((submitted / students.length) * 100) : 0;

          return (
            <Card key={project.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-card-foreground font-display">{project.title}</h3>
                  <p className="text-xs text-muted-foreground">{project.startDate} → {project.endDate}</p>
                </div>
                <span className="rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">{project.status}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Topics Submitted</p>
                  <p className="text-lg font-bold text-foreground">{submitted}/{students.length}</p>
                  <Progress value={pct} className="mt-1 h-1.5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Approved</p>
                  <p className="text-lg font-bold text-success">{approved}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Reviews Done</p>
                  <p className="text-lg font-bold text-info">{reviewSubmissions.filter(r => r.projectId === project.id && r.status === 'approved').length}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Guide-wise breakdown */}
      <h2 className="text-lg font-semibold font-display text-foreground mb-4 mt-8">Guide-wise Summary</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {guides.map(guide => {
          const guideStudents = students.filter(s => s.guideId === guide.id);
          return (
            <Card key={guide.id} className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-semibold">
                  {guide.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{guide.name}</p>
                  <p className="text-xs text-muted-foreground">{guideStudents.length} students assigned</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
