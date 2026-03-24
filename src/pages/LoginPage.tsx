import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore, UserRole } from '@/store/useStore';

const roleCards: { role: UserRole; label: string; desc: string; color: string }[] = [
  { role: 'admin', label: 'Admin (HOD)', desc: 'System administration & oversight', color: 'bg-destructive/10 text-destructive' },
  { role: 'coordinator', label: 'Coordinator', desc: 'Project management & scheduling', color: 'bg-primary/10 text-primary' },
  { role: 'guide', label: 'Guide / Faculty', desc: 'Mentoring & evaluation', color: 'bg-accent/10 text-accent' },
  { role: 'student', label: 'Student', desc: 'Project submission & tracking', color: 'bg-success/10 text-success' },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const { users, setCurrentUser, loadDummyData } = useStore();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    let user = users.find(u => u.email === email);
    if (!user && selectedRole) {
      // If no data loaded yet, load it and find user
      if (users.length === 0) {
        loadDummyData();
      }
      const defaultEmails: Record<UserRole, string> = {
        admin: 'admin@projtrack.edu',
        coordinator: 'coordinator@projtrack.edu',
        guide: 'guide1@projtrack.edu',
        student: 'raj@student.edu',
      };
      setEmail(defaultEmails[selectedRole]);
      // We need to use the store after loading
      const store = useStore.getState();
      if (store.users.length === 0) store.loadDummyData();
      user = useStore.getState().users.find(u => u.role === selectedRole);
    }
    if (user) {
      setCurrentUser(user);
      navigate('/app');
    }
  };

  const quickLogin = (role: UserRole) => {
    const store = useStore.getState();
    if (store.users.length === 0) store.loadDummyData();
    const user = useStore.getState().users.find(u => u.role === role);
    if (user) {
      setCurrentUser(user);
      navigate('/app');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden w-1/2 gradient-hero lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary">
            <FolderKanban className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground font-display">ProjTrack Desk</h1>
          <p className="mt-4 text-primary-foreground/70 leading-relaxed">
            The intelligent academic project management platform that keeps students, guides, and coordinators perfectly in sync.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 text-left">
            {['Automated Workflows', 'Smart Reminders', 'Rubric Grading', 'Real-time Analytics'].map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-primary-foreground/80">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <FolderKanban className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold font-display">ProjTrack Desk</span>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground font-display">Welcome back</h2>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your account or try a quick demo login</p>

          <div className="mt-8 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@university.edu" value={email} onChange={e => setEmail(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" className="mt-1.5" />
            </div>
            <Button className="w-full gradient-primary border-0 gap-2" onClick={handleLogin} disabled={!email && !selectedRole}>
              Sign In <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-3 text-muted-foreground">Quick Demo Login</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {roleCards.map(r => (
              <button
                key={r.role}
                onClick={() => { setSelectedRole(r.role); quickLogin(r.role); }}
                className="rounded-xl border bg-card p-4 text-left transition-all hover:shadow-md hover:border-primary/30 group"
              >
                <div className={`mb-2 inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${r.color}`}>
                  {r.label}
                </div>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
