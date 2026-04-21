import { Outlet } from 'react-router-dom';
import MarketingNavbar from './MarketingNavbar';
import MarketingFooter from './MarketingFooter';
import ScrollToTop from './ScrollToTop';
import DummyDataPanel from '@/components/DummyDataPanel';

const MarketingLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
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
