import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const TopicReviewsPage = () => {
  const { currentUser, users, projects, topicSubmissions, updateTopicSubmission, addNotification } = useStore();
  const [feedbacks, setFeedbacks] = useState<Record<string, string>>({});

  const myStudents = users.filter(u => u.role === 'student' && u.guideId === currentUser?.id);
  const pendingTopics = topicSubmissions.filter(t =>
    (t.status === 'submitted' || t.status === 'revision') && myStudents.some(s => s.id === t.studentId)
  );
  const reviewedTopics = topicSubmissions.filter(t =>
    (t.status === 'approved' || t.status === 'rejected') && myStudents.some(s => s.id === t.studentId)
  );

  const handleAction = (topicId: string, status: 'approved' | 'rejected' | 'revision', studentId: string) => {
    updateTopicSubmission(topicId, { status, feedback: feedbacks[topicId] || '' });
    addNotification({
      id: `notif-${Date.now()}`, userId: studentId,
      title: status === 'approved' ? 'Topic Approved! ✅' : status === 'rejected' ? 'Topic Rejected ❌' : 'Revision Required 🔄',
      message: feedbacks[topicId] || `Your topic has been ${status}.`,
      read: false, createdAt: new Date().toISOString().split('T')[0],
      type: status === 'approved' ? 'success' : status === 'rejected' ? 'warning' : 'info',
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-foreground">Topic Reviews</h1>
        <p className="text-muted-foreground mt-1">Review and approve student topic submissions</p>
      </div>

      <h2 className="text-lg font-semibold font-display text-foreground mb-4">Pending Reviews ({pendingTopics.length})</h2>
      <div className="space-y-4 mb-8">
        {pendingTopics.map(t => {
          const student = users.find(u => u.id === t.studentId);
          const project = projects.find(p => p.id === t.projectId);
          return (
            <Card key={t.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">{project?.title}</p>
                  <h3 className="font-semibold text-card-foreground font-display">{t.title}</h3>
                  <p className="text-xs text-muted-foreground">by {student?.name} ({student?.rollNo})</p>
                </div>
                <Badge className="bg-warning/10 text-warning border-warning/20">{t.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{t.description}</p>
              <p className="text-xs text-muted-foreground"><strong>Objectives:</strong> {t.objectives}</p>
              <p className="text-xs text-muted-foreground"><strong>Tech:</strong> {t.technologies} | <strong>Domain:</strong> {t.domain}</p>

              <div className="mt-4">
                <Textarea
                  placeholder="Add feedback for the student..."
                  value={feedbacks[t.id] || ''}
                  onChange={e => setFeedbacks(f => ({ ...f, [t.id]: e.target.value }))}
                  className="mb-3"
                />
                <div className="flex gap-2">
                  <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground" onClick={() => handleAction(t.id, 'approved', t.studentId)}>✅ Approve</Button>
                  <Button size="sm" variant="outline" className="text-warning border-warning" onClick={() => handleAction(t.id, 'revision', t.studentId)}>🔄 Request Revision</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleAction(t.id, 'rejected', t.studentId)}>❌ Reject</Button>
                </div>
              </div>
            </Card>
          );
        })}
        {pendingTopics.length === 0 && <Card className="p-8 text-center text-muted-foreground text-sm">No pending topic reviews. All caught up! ✨</Card>}
      </div>

      <h2 className="text-lg font-semibold font-display text-foreground mb-4">Reviewed ({reviewedTopics.length})</h2>
      <div className="space-y-3">
        {reviewedTopics.map(t => {
          const student = users.find(u => u.id === t.studentId);
          return (
            <Card key={t.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">{t.title}</p>
                <p className="text-xs text-muted-foreground">{student?.name}</p>
              </div>
              <Badge className={t.status === 'approved' ? 'bg-success/10 text-success border-success/20' : 'bg-destructive/10 text-destructive border-destructive/20'}>{t.status}</Badge>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TopicReviewsPage;
