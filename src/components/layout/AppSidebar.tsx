import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, CalendarDays, Bell, FileText, 
  Users, ClipboardList, BarChart3, Shield, BookOpen, AlertTriangle,
  LogOut, Bot, Settings
} from 'lucide-react';
import { useStore, UserRole } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/app', icon: LayoutDashboard, roles: ['admin', 'coordinator', 'guide', 'student'] },
  { label: 'Projects', path: '/app/projects', icon: FolderKanban, roles: ['admin', 'coordinator', 'guide', 'student'] },
  { label: 'Calendar', path: '/app/calendar', icon: CalendarDays, roles: ['admin', 'coordinator', 'guide', 'student'] },
  { label: 'My Topics', path: '/app/topics', icon: FileText, roles: ['student'] },
  { label: 'Review Queue', path: '/app/review-queue', icon: ClipboardList, roles: ['guide'] },
  { label: 'Topic Reviews', path: '/app/topic-reviews', icon: FileText, roles: ['guide'] },
  { label: 'Rubrics', path: '/app/rubrics', icon: BookOpen, roles: ['coordinator', 'guide', 'student'] },
  { label: 'Defaulters', path: '/app/defaulters', icon: AlertTriangle, roles: ['coordinator', 'guide'] },
  { label: 'Analytics', path: '/app/analytics', icon: BarChart3, roles: ['admin', 'coordinator', 'guide'] },
  { label: 'Allocations', path: '/app/allocations', icon: Users, roles: ['admin', 'coordinator'] },
  { label: 'User Management', path: '/app/users', icon: Shield, roles: ['admin'] },
  { label: 'AI Assistant', path: '/app/chatbot', icon: Bot, roles: ['admin', 'coordinator', 'guide'] },
  { label: 'Notifications', path: '/app/notifications', icon: Bell, roles: ['admin', 'coordinator', 'guide', 'student'] },
];

const AppSidebar = () => {
  const location = useLocation();
  const { currentUser, setCurrentUser, notifications } = useStore();
  const unread = notifications.filter(n => n.userId === currentUser?.id && !n.read).length;

  if (!currentUser) return null;

  const filtered = navItems.filter(item => item.roles.includes(currentUser.role));

  const roleLabels: Record<UserRole, string> = {
    admin: 'Administrator',
    coordinator: 'Coordinator',
    guide: 'Guide / Faculty',
    student: 'Student',
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-2.5 border-b border-sidebar-border px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
          <FolderKanban className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-base font-bold font-display text-sidebar-foreground">ProjTrack</h1>
          <p className="text-[10px] uppercase tracking-wider text-sidebar-muted">Desk</p>
        </div>
      </div>

      {/* User info */}
      <div className="border-b border-sidebar-border px-5 py-4">
        <p className="text-sm font-medium text-sidebar-foreground truncate">{currentUser.name}</p>
        <p className="text-xs text-sidebar-muted">{roleLabels[currentUser.role]}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {filtered.map(item => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" style={{ width: 18, height: 18 }} />
              <span>{item.label}</span>
              {item.label === 'Notifications' && unread > 0 && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-bold text-destructive-foreground">
                  {unread}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        <Link to="/app/settings" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors">
          <Settings className="h-[18px] w-[18px]" />
          Settings
        </Link>
        <button
          onClick={() => setCurrentUser(null)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
