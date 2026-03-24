import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotificationsPage = () => {
  const { currentUser, notifications, markNotificationRead } = useStore();
  const myNotifs = notifications.filter(n => n.userId === currentUser?.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const typeColors = {
    success: 'bg-success', warning: 'bg-warning', info: 'bg-info', deadline: 'bg-destructive',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">🔔 Notifications</h1>
          <p className="text-muted-foreground mt-1">{myNotifs.filter(n => !n.read).length} unread</p>
        </div>
      </div>

      <div className="space-y-3">
        {myNotifs.map(n => (
          <Card key={n.id} className={`p-4 flex items-start gap-4 transition-opacity ${n.read ? 'opacity-60' : ''}`}>
            <div className={`mt-1 h-3 w-3 rounded-full shrink-0 ${typeColors[n.type]}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-card-foreground">{n.title}</p>
                {!n.read && <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">New</Badge>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{n.message}</p>
              <p className="text-[10px] text-muted-foreground mt-2">{n.createdAt}</p>
            </div>
            {!n.read && (
              <Button variant="ghost" size="sm" onClick={() => markNotificationRead(n.id)} className="shrink-0">
                <CheckCircle2 className="h-4 w-4" />
              </Button>
            )}
          </Card>
        ))}
        {myNotifs.length === 0 && (
          <Card className="p-8 text-center text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
            No notifications yet.
          </Card>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
