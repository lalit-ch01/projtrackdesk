import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const ReviewQueuePage = () => {
  const { currentUser, users, projects, reviews, reviewSubmissions, updateReviewSubmission, addNotification } = useStore();
  const [scores, setScores] = useState<Record<string, { score: string; feedback: string }>>({});

  const myStudents = users.filter(u => u.role === 'student' && u.guideId === currentUser?.id);
  const pending = reviewSubmissions.filter(r =>
    (r.status === 'submitted') && myStudents.some(s => s.id === r.studentId)
  );
  const graded = reviewSubmissions.filter(r =>
    r.status === 'approved' && myStudents.some(s => s.id === r.studentId)
  );

  const handleGrade = (subId: string, studentId: string) => {
    const data = scores[subId];
    if (!data) return;
    const score = parseInt(data.score);
    const grade = score >= 90 ? 'A' : score >= 80 ? 'B+' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D';
    updateReviewSubmission(subId, { status: 'approved', score, grade, feedback: data.feedback });
    addNotification({
      id: `notif-${Date.now()}`, userId: studentId,
      title: `Review Graded: ${grade}`, message: `Score: ${score}/100. ${data.feedback}`,
      read: false, createdAt: new Date().toISOString().split('T')[0], type: 'success',
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-foreground">Review Queue</h1>
        <p className="text-muted-foreground mt-1">Evaluate student review submissions</p>
      </div>

      <h2 className="text-lg font-semibold font-display text-foreground mb-4">Pending Evaluation ({pending.length})</h2>
      <div className="space-y-4 mb-8">
        {pending.map(sub => {
          const student = users.find(u => u.id === sub.studentId);
          const review = reviews.find(r => r.id === sub.reviewId);
          const project = projects.find(p => p.id === sub.projectId);
          return (
            <Card key={sub.id} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">{project?.title} • {review?.title}</p>
                  <h3 className="font-semibold text-card-foreground font-display">{student?.name} ({student?.rollNo})</h3>
                  <p className="text-xs text-muted-foreground">Submitted: {sub.submittedAt}</p>
                </div>
                <Badge className="bg-info/10 text-info border-info/20">To Grade</Badge>
              </div>
              <div className="bg-secondary rounded-lg p-3 mb-4">
                <p className="text-xs font-medium text-muted-foreground mb-1">Progress Update:</p>
                <p className="text-sm text-foreground">{sub.progressUpdate}</p>
                {sub.challenges && <p className="text-xs text-muted-foreground mt-2"><strong>Challenges:</strong> {sub.challenges}</p>}
                {sub.nextSteps && <p className="text-xs text-muted-foreground mt-1"><strong>Next Steps:</strong> {sub.nextSteps}</p>}
              </div>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Input
                    type="number" placeholder="Score (0-100)" max={100} min={0}
                    value={scores[sub.id]?.score || ''}
                    onChange={e => setScores(s => ({ ...s, [sub.id]: { ...s[sub.id], score: e.target.value, feedback: s[sub.id]?.feedback || '' } }))}
                  />
                </div>
                <div className="flex-[2]">
                  <Textarea
                    placeholder="Feedback..." rows={1}
                    value={scores[sub.id]?.feedback || ''}
                    onChange={e => setScores(s => ({ ...s, [sub.id]: { ...s[sub.id], feedback: e.target.value, score: s[sub.id]?.score || '' } }))}
                  />
                </div>
                <Button className="gradient-primary border-0" onClick={() => handleGrade(sub.id, sub.studentId)}>Grade</Button>
              </div>
            </Card>
          );
        })}
        {pending.length === 0 && <Card className="p-8 text-center text-muted-foreground text-sm">No submissions to grade. ✨</Card>}
      </div>

      <h2 className="text-lg font-semibold font-display text-foreground mb-4">Graded ({graded.length})</h2>
      <div className="space-y-3">
        {graded.map(sub => {
          const student = users.find(u => u.id === sub.studentId);
          return (
            <Card key={sub.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-card-foreground">{student?.name}</p>
                <p className="text-xs text-muted-foreground">Score: {sub.score}/{sub.maxScore}</p>
              </div>
              <Badge className="bg-success/10 text-success border-success/20 text-lg font-bold">{sub.grade}</Badge>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewQueuePage;
