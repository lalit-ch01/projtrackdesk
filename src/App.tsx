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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
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
