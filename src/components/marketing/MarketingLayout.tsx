import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import MarketingNavbar from './MarketingNavbar';
import MarketingFooter from './MarketingFooter';
import DummyDataPanel from '@/components/DummyDataPanel';

const MarketingLayout = () => {
  useEffect(() => {
    // Scroll to top on route change is handled by the router default;
    // ensure pages start at top when mounting layout.
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DummyDataPanel />
      <MarketingNavbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <MarketingFooter />
    </div>
  );
};

export default MarketingLayout;
