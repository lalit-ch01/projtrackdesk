import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import CalendarPage from "./pages/CalendarPage";
import TopicsPage from "./pages/TopicsPage";
import TopicReviewsPage from "./pages/TopicReviewsPage";
import ReviewQueuePage from "./pages/ReviewQueuePage";
import RubricsPage from "./pages/RubricsPage";
import NotificationsPage from "./pages/NotificationsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AllocationsPage from "./pages/AllocationsPage";
import UserManagementPage from "./pages/UserManagementPage";
import DefaultersPage from "./pages/DefaultersPage";
import ChatbotPage from "./pages/ChatbotPage";
import AppLayout from "./components/layout/AppLayout";
import MarketingLayout from "./components/marketing/MarketingLayout";

// Marketing — overview pages
import FeaturesPage from "./pages/marketing/FeaturesPage";
import PricingPage from "./pages/marketing/PricingPage";
import UseCasesPage from "./pages/marketing/UseCasesPage";
import ServicesPage from "./pages/marketing/ServicesPage";
import BlogPage from "./pages/marketing/BlogPage";
import BlogPostPage from "./pages/marketing/BlogPostPage";
import ResourcesPage from "./pages/marketing/ResourcesPage";
import ToolsPage from "./pages/marketing/ToolsPage";
import TestimonialsPage from "./pages/marketing/TestimonialsPage";
import ResultsPage from "./pages/marketing/ResultsPage";
import AboutPage from "./pages/marketing/AboutPage";
import ContactPage from "./pages/marketing/ContactPage";
import LegalPage from "./pages/marketing/LegalPage";

// Marketing — product feature deep-dives
import WorkflowsPage from "./pages/marketing/WorkflowsPage";
import AnalyticsMarketingPage from "./pages/marketing/AnalyticsMarketingPage";
import AIAssistantPage from "./pages/marketing/AIAssistantPage";
import NotificationsMarketingPage from "./pages/marketing/NotificationsMarketingPage";
import RubricsMarketingPage from "./pages/marketing/RubricsMarketingPage";
import IntegrationsPage from "./pages/marketing/IntegrationsPage";
import SecurityPage from "./pages/marketing/SecurityPage";

// Marketing — use cases
import CapstonePage from "./pages/marketing/use-cases/CapstonePage";
import InternshipsPage from "./pages/marketing/use-cases/InternshipsPage";
import ResearchPage from "./pages/marketing/use-cases/ResearchPage";
import HackathonsPage from "./pages/marketing/use-cases/HackathonsPage";

// Marketing — services / role pages
import CoordinatorsServicePage from "./pages/marketing/services/CoordinatorsServicePage";
import FacultyServicePage from "./pages/marketing/services/FacultyServicePage";
import StudentsServicePage from "./pages/marketing/services/StudentsServicePage";
import HodsServicePage from "./pages/marketing/services/HodsServicePage";

// Marketing — resources
import DocsPage from "./pages/marketing/DocsPage";
import HelpCenterPage from "./pages/marketing/HelpCenterPage";
import RoadmapPage from "./pages/marketing/RoadmapPage";
import ChangelogPage from "./pages/marketing/ChangelogPage";

// Marketing — tools
import RoiCalculatorPage from "./pages/marketing/tools/RoiCalculatorPage";
import RubricBuilderPage from "./pages/marketing/tools/RubricBuilderPage";
import TemplatesPage from "./pages/marketing/tools/TemplatesPage";
import ProjectCodeGeneratorPage from "./pages/marketing/tools/ProjectCodeGeneratorPage";

// Marketing — company
import CareersPage from "./pages/marketing/CareersPage";
import PressPage from "./pages/marketing/PressPage";
import PartnersPage from "./pages/marketing/PartnersPage";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public marketing site */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<LandingPage />} />

            {/* Product */}
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/workflows" element={<WorkflowsPage />} />
            <Route path="/analytics" element={<AnalyticsMarketingPage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/notifications" element={<NotificationsMarketingPage />} />
            <Route path="/rubrics-feature" element={<RubricsMarketingPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/security" element={<SecurityPage />} />

            {/* Pricing */}
            <Route path="/pricing" element={<PricingPage />} />

            {/* Use cases */}
            <Route path="/use-cases" element={<UseCasesPage />} />
            <Route path="/use-cases/capstone" element={<CapstonePage />} />
            <Route path="/use-cases/internships" element={<InternshipsPage />} />
            <Route path="/use-cases/research" element={<ResearchPage />} />
            <Route path="/use-cases/hackathons" element={<HackathonsPage />} />

            {/* Services / roles */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/coordinators" element={<CoordinatorsServicePage />} />
            <Route path="/services/faculty" element={<FacultyServicePage />} />
            <Route path="/services/students" element={<StudentsServicePage />} />
            <Route path="/services/hods" element={<HodsServicePage />} />

            {/* Resources */}
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/help" element={<HelpCenterPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />

            {/* Blog */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />

            {/* Tools */}
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/roi-calculator" element={<RoiCalculatorPage />} />
            <Route path="/tools/rubric-builder" element={<RubricBuilderPage />} />
            <Route path="/tools/templates" element={<TemplatesPage />} />
            <Route path="/tools/project-code-generator" element={<ProjectCodeGeneratorPage />} />

            {/* Customers / Results */}
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/results" element={<ResultsPage />} />

            {/* Company */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Legal */}
            <Route path="/legal/:slug" element={<LegalPage />} />
          </Route>

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />

          {/* App */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="topics" element={<TopicsPage />} />
            <Route path="topic-reviews" element={<TopicReviewsPage />} />
            <Route path="review-queue" element={<ReviewQueuePage />} />
            <Route path="rubrics" element={<RubricsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="allocations" element={<AllocationsPage />} />
            <Route path="users" element={<UserManagementPage />} />
            <Route path="defaulters" element={<DefaultersPage />} />
            <Route path="chatbot" element={<ChatbotPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
