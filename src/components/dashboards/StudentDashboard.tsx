import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, FileText, Clock, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

const statusConfig = {
  approved: { label: 'Approved', icon: CheckCircle2, color: 'bg-success/10 text-success border-success/20' },
  submitted: { label: 'Submitted', icon: Clock, color: 'bg-info/10 text-info border-info/20' },
  revision: { label: 'Revision', icon: RotateCcw, color: 'bg-warning/10 text-warning border-warning/20' },
  rejected: { label: 'Rejected', icon: AlertCircle, color: 'bg-destructive/10 text-destructive border-destructive/20' },
  draft: { label: 'Draft', icon: FileText, color: 'bg-muted text-muted-foreground border-border' },
};

const StudentDashboard = () => {
  const { currentUser, projects, topicSubmissions, reviewSubmissions, reviews, notifications } = useStore();
  if (!currentUser) return null;

  const myTopics = topicSubmissions.filter(t => t.studentId === currentUser.id);
  const myReviewSubs = reviewSubmissions.filter(r => r.studentId === currentUser.id);
  const myNotifs = notifications.filter(n => n.userId === currentUser.id && !n.read);

  const getProjectProgress = (projectId: string) => {
    const topic = myTopics.find(t => t.projectId === projectId);
    const projReviews = reviews.filter(r => r.projectId === projectId);
    const projSubs = myReviewSubs.filter(r => r.projectId === projectId);
    let total = 1 + projReviews.length;
    let done = topic?.status === 'approved' ? 1 : 0;
    done += projSubs.filter(s => s.status === 'approved').length;
    return Math.round((done / total) * 100);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-foreground">Welcome, {currentUser.name.split(' ')[0]}! 👋</h1>
        <p className="text-muted-foreground mt-1">Here's your project overview</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Projects', value: projects.filter(p => p.status === 'active').length, color: 'text-primary' },
          { label: 'Topics Submitted', value: myTopics.filter(t => t.status !== 'draft').length, color: 'text-info' },
          { label: 'Reviews Completed', value: myReviewSubs.filter(r => r.status === 'approved').length, color: 'text-success' },
          { label: 'Unread Notifications', value: myNotifs.length, color: 'text-warning' },
        ].map(s => (
          <Card key={s.label} className="p-4">
            <p className={`text-2xl font-bold font-display ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Project Cards */}
      <h2 className="text-lg font-semibold font-display text-foreground mb-4">My Projects</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.filter(p => p.status === 'active').map(project => {
          const topic = myTopics.find(t => t.projectId === project.id);
          const progress = getProjectProgress(project.id);
          const projReviews = reviews.filter(r => r.projectId === project.id);
          const projSubs = myReviewSubs.filter(r => r.projectId === project.id);
          const st = topic ? statusConfig[topic.status] : null;

          return (
            <Card key={project.id} className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary" className="text-xs">{project.type.replace('-', ' ')}</Badge>
                <span className="text-xs text-muted-foreground">{progress}%</span>
              </div>
              <h3 className="font-semibold text-card-foreground font-display text-sm">{project.title}</h3>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <CalendarDays className="h-3 w-3" /> {project.startDate} → {project.endDate}
              </p>
              
              <Progress value={progress} className="mt-3 h-1.5" />
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Topic</span>
                  {st ? (
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-medium ${st.color}`}>
                      <st.icon className="h-3 w-3" /> {st.label}
                    </span>
                  ) : <span className="text-muted-foreground">Not submitted</span>}
                </div>
                {projReviews.map(rev => {
                  const sub = projSubs.find(s => s.reviewId === rev.id);
                  return (
                    <div key={rev.id} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{rev.title.split(' - ')[0]}</span>
                      {sub ? (
                        <span className="text-foreground font-medium">
                          {sub.grade ? `Grade: ${sub.grade} (${sub.score}/${sub.maxScore})` : sub.status}
                        </span>
                      ) : <span className="text-muted-foreground">Upcoming</span>}
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Upcoming Deadlines */}
      {myNotifs.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold font-display text-foreground mb-4">Recent Notifications</h2>
          <div className="space-y-2">
            {myNotifs.slice(0, 5).map(n => (
              <Card key={n.id} className="p-3 flex items-start gap-3">
                <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${n.type === 'success' ? 'bg-success' : n.type === 'warning' ? 'bg-warning' : n.type === 'deadline' ? 'bg-destructive' : 'bg-info'}`} />
                <div>
                  <p className="text-sm font-medium text-card-foreground">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.message}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
