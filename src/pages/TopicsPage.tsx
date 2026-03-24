import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, CheckCircle2, XCircle, RotateCcw, Clock } from 'lucide-react';

const TopicsPage = () => {
  const { currentUser, projects, topicSubmissions, addTopicSubmission } = useStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ projectId: '', title: '', description: '', objectives: '', technologies: '', domain: '' });

  const myTopics = topicSubmissions.filter(t => t.studentId === currentUser?.id);

  const handleSubmit = () => {
    addTopicSubmission({
      id: `topic-${Date.now()}`, projectId: form.projectId, studentId: currentUser!.id,
      title: form.title, description: form.description, objectives: form.objectives,
      technologies: form.technologies, domain: form.domain,
      status: 'submitted', submittedAt: new Date().toISOString().split('T')[0],
    });
    setForm({ projectId: '', title: '', description: '', objectives: '', technologies: '', domain: '' });
    setOpen(false);
  };

  const statusIcons = { approved: CheckCircle2, rejected: XCircle, revision: RotateCcw, submitted: Clock, draft: Clock };
  const statusColors: Record<string, string> = {
    approved: 'bg-success/10 text-success border-success/20',
    rejected: 'bg-destructive/10 text-destructive border-destructive/20',
    revision: 'bg-warning/10 text-warning border-warning/20',
    submitted: 'bg-info/10 text-info border-info/20',
    draft: 'bg-muted text-muted-foreground',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">My Topics</h1>
          <p className="text-muted-foreground mt-1">Submit and track your project topics</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gradient-primary border-0 gap-2"><Plus className="h-4 w-4" /> Submit Topic</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle className="font-display">Submit Project Topic</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label>Project</Label>
                <Select value={form.projectId} onValueChange={v => setForm(f => ({ ...f, projectId: v }))}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Select project" /></SelectTrigger>
                  <SelectContent>{projects.filter(p => p.status === 'active').map(p => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div><Label>Topic Title</Label><Input className="mt-1" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g., AI-Powered Chatbot" /></div>
              <div><Label>Description</Label><Textarea className="mt-1" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
              <div><Label>Objectives</Label><Textarea className="mt-1" value={form.objectives} onChange={e => setForm(f => ({ ...f, objectives: e.target.value }))} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Technologies</Label><Input className="mt-1" value={form.technologies} onChange={e => setForm(f => ({ ...f, technologies: e.target.value }))} /></div>
                <div><Label>Domain</Label>
                  <Select value={form.domain} onValueChange={v => setForm(f => ({ ...f, domain: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {['AI/ML', 'Web Development', 'Mobile Development', 'Data Science', 'Blockchain', 'IoT', 'Cybersecurity', 'EdTech', 'Other'].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full gradient-primary border-0" onClick={handleSubmit} disabled={!form.title || !form.projectId}>Submit Topic</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {myTopics.map(t => {
          const project = projects.find(p => p.id === t.projectId);
          const Icon = statusIcons[t.status];
          return (
            <Card key={t.id} className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">{project?.title}</p>
                  <h3 className="font-semibold text-card-foreground font-display">{t.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {t.technologies.split(',').map(tech => <Badge key={tech.trim()} variant="secondary" className="text-xs">{tech.trim()}</Badge>)}
                    <Badge variant="outline" className="text-xs">{t.domain}</Badge>
                  </div>
                  {t.feedback && (
                    <div className="mt-4 rounded-lg bg-secondary p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-1">Guide Feedback:</p>
                      <p className="text-sm text-foreground">{t.feedback}</p>
                    </div>
                  )}
                </div>
                <Badge className={`shrink-0 gap-1 ${statusColors[t.status]}`}>
                  <Icon className="h-3 w-3" /> {t.status}
                </Badge>
              </div>
              {t.submittedAt && <p className="text-xs text-muted-foreground mt-3">Submitted: {t.submittedAt}</p>}
            </Card>
          );
        })}
        {myTopics.length === 0 && <Card className="p-8 text-center text-muted-foreground">No topics submitted yet.</Card>}
      </div>
    </div>
  );
};

export default TopicsPage;
