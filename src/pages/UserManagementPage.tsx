import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Shield } from 'lucide-react';

const UserManagementPage = () => {
  const { users, addUser } = useStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: 'student' as string, department: 'CSE', rollNo: '', guideId: '' });
  const guides = users.filter(u => u.role === 'guide');

  const handleCreate = () => {
    addUser({
      id: `user-${Date.now()}`, name: form.name, email: form.email,
      role: form.role as any, department: form.department,
      rollNo: form.role === 'student' ? form.rollNo : undefined,
      guideId: form.role === 'student' ? form.guideId : undefined,
    });
    setForm({ name: '', email: '', role: 'student', department: 'CSE', rollNo: '', guideId: '' });
    setOpen(false);
  };

  const roleColors: Record<string, string> = {
    admin: 'bg-destructive/10 text-destructive', coordinator: 'bg-primary/10 text-primary',
    guide: 'bg-accent/10 text-accent', student: 'bg-success/10 text-success',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">🛡️ User Management</h1>
          <p className="text-muted-foreground mt-1">Manage all system users</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="gradient-primary border-0 gap-2"><Plus className="h-4 w-4" /> Add User</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Create New User</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label>Name</Label><Input className="mt-1" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div><Label>Email</Label><Input className="mt-1" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
              <div><Label>Role</Label>
                <Select value={form.role} onValueChange={v => setForm(f => ({ ...f, role: v }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['admin', 'coordinator', 'guide', 'student'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Department</Label><Input className="mt-1" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} /></div>
              {form.role === 'student' && (
                <>
                  <div><Label>Roll No</Label><Input className="mt-1" value={form.rollNo} onChange={e => setForm(f => ({ ...f, rollNo: e.target.value }))} /></div>
                  <div><Label>Guide</Label>
                    <Select value={form.guideId} onValueChange={v => setForm(f => ({ ...f, guideId: v }))}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Assign guide" /></SelectTrigger>
                      <SelectContent>{guides.map(g => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </>
              )}
              <Button className="w-full gradient-primary border-0" onClick={handleCreate} disabled={!form.name || !form.email}>Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {users.map(u => (
          <Card key={u.id} className="p-4 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground text-sm font-semibold">
              {u.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground">{u.name}</p>
              <p className="text-xs text-muted-foreground">{u.email} {u.rollNo ? `• ${u.rollNo}` : ''}</p>
            </div>
            <Badge className={roleColors[u.role]}>{u.role}</Badge>
            <Badge variant="outline" className="text-xs">{u.department}</Badge>
          </Card>
        ))}
        {users.length === 0 && <Card className="p-8 text-center text-muted-foreground">No users. Load dummy data to see users.</Card>}
      </div>
    </div>
  );
};

export default UserManagementPage;
