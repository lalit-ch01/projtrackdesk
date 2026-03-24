import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

const DefaultersPage = () => {
  const { users, topicSubmissions, reviewSubmissions, reviews } = useStore();
  const students = users.filter(u => u.role === 'student');

  // Identify defaulters: students with rejected topics not resubmitted, or missed deadlines
  const defaulters = students.filter(student => {
    const rejected = topicSubmissions.some(t => t.studentId === student.id && t.status === 'rejected');
    const missedReviews = reviews.some(rev => {
      const deadline = new Date(rev.submissionDeadline);
      const hasSubmission = reviewSubmissions.some(rs => rs.reviewId === rev.id && rs.studentId === student.id);
      return deadline < new Date() && !hasSubmission;
    });
    return rejected || missedReviews;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-foreground">⚠️ Defaulter Management</h1>
        <p className="text-muted-foreground mt-1">Track students who are behind on submissions</p>
      </div>

      <Card className="p-4 mb-6 bg-warning/5 border-warning/20">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <div>
            <p className="text-sm font-medium text-foreground">{defaulters.length} potential defaulter(s) identified</p>
            <p className="text-xs text-muted-foreground">Students with rejected topics or missed review deadlines</p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {defaulters.map(student => {
          const rejectedTopics = topicSubmissions.filter(t => t.studentId === student.id && t.status === 'rejected');
          const guide = users.find(u => u.id === student.guideId);
          return (
            <Card key={student.id} className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive text-sm font-semibold">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.rollNo} • Guide: {guide?.name || 'Unassigned'}</p>
                  </div>
                </div>
                <Badge className="bg-destructive/10 text-destructive border-destructive/20">Defaulter</Badge>
              </div>
              {rejectedTopics.length > 0 && (
                <div className="mt-3 text-xs text-muted-foreground">
                  <strong>Reason:</strong> Topic rejected — "{rejectedTopics[0].title}"
                </div>
              )}
            </Card>
          );
        })}
        {defaulters.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            No defaulters found. All students are on track! 🎉
          </Card>
        )}
      </div>
    </div>
  );
};

export default DefaultersPage;
