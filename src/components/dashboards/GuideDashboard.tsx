import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, FileText, ClipboardList, AlertTriangle } from 'lucide-react';

const GuideDashboard = () => {
  const { currentUser, users, topicSubmissions, reviewSubmissions, projects } = useStore();
  if (!currentUser) return null;

  const myStudents = users.filter(u => u.role === 'student' && u.guideId === currentUser.id);
  const pendingTopics = topicSubmissions.filter(t => t.status === 'submitted' && myStudents.some(s => s.id === t.studentId));
  const pendingReviews = reviewSubmissions.filter(r => r.status === 'submitted' && myStudents.some(s => s.id === r.studentId));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-foreground">{currentUser.name}'s Dashboard 👨‍🏫</h1>
        <p className="text-muted-foreground mt-1">Manage your students and evaluate submissions</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'My Students', value: myStudents.length, icon: Users, color: 'text-primary' },
          { label: 'Pending Topics', value: pendingTopics.length, icon: FileText, color: 'text-warning' },
          { label: 'Pending Reviews', value: pendingReviews.length, icon: ClipboardList, color: 'text-info' },
          { label: 'Defaulters', value: 0, icon: AlertTriangle, color: 'text-destructive' },
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

      {/* Review Queue */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold font-display text-foreground">Review Queue</h2>
          <Link to="/app/review-queue"><Button variant="outline" size="sm">View All</Button></Link>
        </div>
        {pendingTopics.length > 0 || pendingReviews.length > 0 ? (
          <div className="space-y-3">
            {pendingTopics.map(t => {
              const student = users.find(u => u.id === t.studentId);
              const project = projects.find(p => p.id === t.projectId);
              return (
                <Card key={t.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{student?.name} — Topic Review</p>
                    <p className="text-xs text-muted-foreground">{project?.title} • "{t.title}"</p>
                  </div>
                  <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>
                </Card>
              );
            })}
            {pendingReviews.map(r => {
              const student = users.find(u => u.id === r.studentId);
              return (
                <Card key={r.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{student?.name} — Review Submission</p>
                    <p className="text-xs text-muted-foreground">Submitted: {r.submittedAt}</p>
                  </div>
                  <Badge className="bg-info/10 text-info border-info/20">To Grade</Badge>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-8 text-center text-muted-foreground text-sm">No pending items. All caught up! ✨</Card>
        )}
      </div>

      {/* Students */}
      <h2 className="text-lg font-semibold font-display text-foreground mb-4">My Students ({myStudents.length})</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {myStudents.map(student => {
          const topics = topicSubmissions.filter(t => t.studentId === student.id);
          return (
            <Card key={student.id} className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">{student.name}</p>
                  <p className="text-xs text-muted-foreground">{student.rollNo}</p>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {topics.map(t => {
                  const proj = projects.find(p => p.id === t.projectId);
                  return (
                    <div key={t.id} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground truncate mr-2">{proj?.title.substring(0, 25)}...</span>
                      <Badge variant="outline" className="text-[10px] shrink-0">
                        {t.status === 'approved' ? '✅' : t.status === 'revision' ? '🔄' : t.status === 'submitted' ? '⏳' : '❌'} {t.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default GuideDashboard;
