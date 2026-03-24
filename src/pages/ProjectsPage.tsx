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
import { Plus, CalendarDays } from 'lucide-react';

const ProjectsPage = () => {
  const { currentUser, projects, addProject, updateProject, addCalendarEvent } = useStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', type: 'major-project' as string, startDate: '', endDate: '', topicDeadline: '', minTeamSize: '1', maxTeamSize: '4' });

  const isCoordinator = currentUser?.role === 'coordinator' || currentUser?.role === 'admin';

  const handleCreate = () => {
    const id = `proj-${Date.now()}`;
    addProject({
      id, title: form.title, description: form.description,
      type: form.type as any, startDate: form.startDate, endDate: form.endDate,
      topicDeadline: form.topicDeadline, minTeamSize: parseInt(form.minTeamSize),
      maxTeamSize: parseInt(form.maxTeamSize), status: 'active',
      coordinatorId: currentUser!.id, createdAt: new Date().toISOString().split('T')[0],
    });
    addCalendarEvent({ id: `evt-${Date.now()}-1`, title: `${form.title} Starts`, date: form.startDate, type: 'start', projectId: id, color: 'hsl(221, 83%, 53%)' });
    addCalendarEvent({ id: `evt-${Date.now()}-2`, title: `Topic Deadline - ${form.title}`, date: form.topicDeadline, type: 'deadline', projectId: id, color: 'hsl(0, 84%, 60%)' });
    addCalendarEvent({ id: `evt-${Date.now()}-3`, title: `${form.title} Ends`, date: form.endDate, type: 'end', projectId: id, color: 'hsl(160, 84%, 39%)' });
    setForm({ title: '', description: '', type: 'major-project', startDate: '', endDate: '', topicDeadline: '', minTeamSize: '1', maxTeamSize: '4' });
    setOpen(false);
  };

  const typeIcons: Record<string, string> = { 'mini-project': '📌', 'major-project': '🏆', 'seminar': '🎤', 'assignment': '✏️', 'research': '🔬', 'internship': '🏢' };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Projects</h1>
          <p className="text-muted-foreground mt-1">All project activities</p>
        </div>
        {isCoordinator && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary border-0 gap-2"><Plus className="h-4 w-4" /> Create Project</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle className="font-display">Create New Project Activity</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <div><Label>Title</Label><Input className="mt-1" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g., Major Project 2025" /></div>
                <div><Label>Description</Label><Textarea className="mt-1" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
                <div><Label>Type</Label>
                  <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(typeIcons).map(([k, v]) => <SelectItem key={k} value={k}>{v} {k.replace('-', ' ')}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div><Label>Start Date</Label><Input type="date" className="mt-1" value={form.startDate} onChange={e => setForm(f => ({ ...f, startDate: e.target.value }))} /></div>
                  <div><Label>Topic Deadline</Label><Input type="date" className="mt-1" value={form.topicDeadline} onChange={e => setForm(f => ({ ...f, topicDeadline: e.target.value }))} /></div>
                  <div><Label>End Date</Label><Input type="date" className="mt-1" value={form.endDate} onChange={e => setForm(f => ({ ...f, endDate: e.target.value }))} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Min Team Size</Label><Input type="number" className="mt-1" value={form.minTeamSize} onChange={e => setForm(f => ({ ...f, minTeamSize: e.target.value }))} /></div>
                  <div><Label>Max Team Size</Label><Input type="number" className="mt-1" value={form.maxTeamSize} onChange={e => setForm(f => ({ ...f, maxTeamSize: e.target.value }))} /></div>
                </div>
                <Button className="w-full gradient-primary border-0" onClick={handleCreate} disabled={!form.title || !form.startDate}>Create & Activate Project</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map(p => (
          <Card key={p.id} className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{typeIcons[p.type] || '📁'}</span>
              <Badge variant={p.status === 'active' ? 'default' : 'secondary'} className={p.status === 'active' ? 'bg-success/10 text-success border-success/20' : ''}>
                {p.status}
              </Badge>
            </div>
            <h3 className="font-semibold text-card-foreground font-display mt-2">{p.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.description}</p>
            <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
              <p className="flex items-center gap-1.5"><CalendarDays className="h-3 w-3" /> {p.startDate} → {p.endDate}</p>
              <p>📝 Topic deadline: {p.topicDeadline}</p>
              <p>👥 Team: {p.minTeamSize}-{p.maxTeamSize} members</p>
            </div>
            {isCoordinator && p.status === 'active' && (
              <Button variant="outline" size="sm" className="w-full mt-4" onClick={() => updateProject(p.id, { status: 'archived' })}>Archive</Button>
            )}
          </Card>
        ))}
        {projects.length === 0 && (
          <Card className="p-8 col-span-full text-center text-muted-foreground">No projects yet. {isCoordinator ? 'Create one to get started!' : 'Load dummy data to see projects.'}</Card>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
