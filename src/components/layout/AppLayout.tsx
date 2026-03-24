import { Outlet, Navigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import AppSidebar from './AppSidebar';
import DummyDataPanel from '../DummyDataPanel';

const AppLayout = () => {
  const { currentUser } = useStore();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="ml-64 flex-1 min-h-screen">
        <div className="p-6 lg:p-8 max-w-7xl">
          <Outlet />
        </div>
      </main>
      <DummyDataPanel />
    </div>
  );
};

export default AppLayout;
