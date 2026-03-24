import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

const RubricsPage = () => {
  const { currentUser, projects, rubrics, addRubric } = useStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ projectId: '', name: '', criteria: [{ name: '', maxPoints: 20, description: '' }] });
  const isCoord = currentUser?.role === 'coordinator';

  const addCriteria = () => setForm(f => ({ ...f, criteria: [...f.criteria, { name: '', maxPoints: 10, description: '' }] }));
  const removeCriteria = (i: number) => setForm(f => ({ ...f, criteria: f.criteria.filter((_, idx) => idx !== i) }));
  const updateCriteria = (i: number, field: string, value: any) => setForm(f => ({ ...f, criteria: f.criteria.map((c, idx) => idx === i ? { ...c, [field]: value } : c) }));

  const handleCreate = () => {
    addRubric({
      id: `rubric-${Date.now()}`, projectId: form.projectId, name: form.name,
      criteria: form.criteria, totalPoints: form.criteria.reduce((sum, c) => sum + c.maxPoints, 0),
    });
    setForm({ projectId: '', name: '', criteria: [{ name: '', maxPoints: 20, description: '' }] });
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">📊 Rubrics</h1>
          <p className="text-muted-foreground mt-1">Assessment criteria for project evaluations</p>
        </div>
        {isCoord && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button className="gradient-primary border-0 gap-2"><Plus className="h-4 w-4" /> Create Rubric</Button></DialogTrigger>
            <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
              <DialogHeader><DialogTitle className="font-display">Create Rubric</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <div><Label>Project</Label>
                  <Select value={form.projectId} onValueChange={v => setForm(f => ({ ...f, projectId: v }))}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{projects.map(p => <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Rubric Name</Label><Input className="mt-1" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
                <div>
                  <Label>Criteria</Label>
                  <div className="space-y-3 mt-2">
                    {form.criteria.map((c, i) => (
                      <div key={i} className="rounded-lg border p-3 space-y-2">
                        <div className="flex gap-2">
                          <Input placeholder="Criteria name" value={c.name} onChange={e => updateCriteria(i, 'name', e.target.value)} />
                          <Input type="number" className="w-20" value={c.maxPoints} onChange={e => updateCriteria(i, 'maxPoints', parseInt(e.target.value))} />
                          <Button variant="ghost" size="icon" onClick={() => removeCriteria(i)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                        <Input placeholder="Description" value={c.description} onChange={e => updateCriteria(i, 'description', e.target.value)} />
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="mt-2 gap-1" onClick={addCriteria}><Plus className="h-3 w-3" /> Add Criteria</Button>
                </div>
                <div className="text-sm font-medium text-foreground">Total: {form.criteria.reduce((s, c) => s + c.maxPoints, 0)} points</div>
                <Button className="w-full gradient-primary border-0" onClick={handleCreate}>Create Rubric</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="space-y-4">
        {rubrics.map(r => {
          const project = projects.find(p => p.id === r.projectId);
          return (
            <Card key={r.id} className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">{project?.title}</p>
                  <h3 className="font-semibold text-card-foreground font-display">{r.name}</h3>
                </div>
                <span className="text-sm font-bold text-primary">{r.totalPoints} pts</span>
              </div>
              <div className="space-y-2">
                {r.criteria.map((c, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-secondary p-3">
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">{c.maxPoints} pts</span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
        {rubrics.length === 0 && <Card className="p-8 text-center text-muted-foreground">No rubrics defined yet.</Card>}
      </div>
    </div>
  );
};

export default RubricsPage;
