import { useStore } from '@/store/useStore';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import GuideDashboard from '@/components/dashboards/GuideDashboard';
import CoordinatorDashboard from '@/components/dashboards/CoordinatorDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';

const DashboardPage = () => {
  const { currentUser } = useStore();
  if (!currentUser) return null;

  switch (currentUser.role) {
    case 'student': return <StudentDashboard />;
    case 'guide': return <GuideDashboard />;
    case 'coordinator': return <CoordinatorDashboard />;
    case 'admin': return <AdminDashboard />;
    default: return null;
  }
};

export default DashboardPage;
