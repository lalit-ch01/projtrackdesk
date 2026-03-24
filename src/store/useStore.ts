import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'admin' | 'coordinator' | 'guide' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  rollNo?: string;
  guideId?: string;
}

export interface ProjectActivity {
  id: string;
  title: string;
  description: string;
  type: 'mini-project' | 'major-project' | 'seminar' | 'assignment' | 'research' | 'internship';
  startDate: string;
  endDate: string;
  topicDeadline: string;
  minTeamSize: number;
  maxTeamSize: number;
  status: 'draft' | 'active' | 'archived';
  coordinatorId: string;
  createdAt: string;
}

export interface TopicSubmission {
  id: string;
  projectId: string;
  studentId: string;
  title: string;
  description: string;
  objectives: string;
  technologies: string;
  domain: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'revision';
  feedback?: string;
  submittedAt?: string;
}

export interface Review {
  id: string;
  projectId: string;
  title: string;
  scheduledDate: string;
  submissionDeadline: string;
  description: string;
}

export interface ReviewSubmission {
  id: string;
  reviewId: string;
  studentId: string;
  projectId: string;
  progressUpdate: string;
  challenges?: string;
  nextSteps?: string;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected' | 'revision';
  score?: number;
  maxScore: number;
  feedback?: string;
  submittedAt?: string;
  grade?: string;
}

export interface Rubric {
  id: string;
  projectId: string;
  name: string;
  criteria: { name: string; maxPoints: number; description: string }[];
  totalPoints: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'start' | 'deadline' | 'review' | 'end';
  projectId: string;
  color: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: 'info' | 'warning' | 'success' | 'deadline';
}

interface AppState {
  currentUser: User | null;
  users: User[];
  projects: ProjectActivity[];
  topicSubmissions: TopicSubmission[];
  reviews: Review[];
  reviewSubmissions: ReviewSubmission[];
  rubrics: Rubric[];
  calendarEvents: CalendarEvent[];
  notifications: Notification[];
  
  setCurrentUser: (user: User | null) => void;
  
  addUser: (user: User) => void;
  addProject: (project: ProjectActivity) => void;
  updateProject: (id: string, updates: Partial<ProjectActivity>) => void;
  addTopicSubmission: (sub: TopicSubmission) => void;
  updateTopicSubmission: (id: string, updates: Partial<TopicSubmission>) => void;
  addReview: (review: Review) => void;
  addReviewSubmission: (sub: ReviewSubmission) => void;
  updateReviewSubmission: (id: string, updates: Partial<ReviewSubmission>) => void;
  addRubric: (rubric: Rubric) => void;
  addCalendarEvent: (event: CalendarEvent) => void;
  addNotification: (notification: Notification) => void;
  markNotificationRead: (id: string) => void;
  
  loadDummyData: () => void;
  clearAllData: () => void;
}

const dummyUsers: User[] = [
  { id: 'admin-1', name: 'Dr. R.K. Sharma', email: 'admin@projtrack.edu', role: 'admin', department: 'CSE' },
  { id: 'coord-1', name: 'Dr. Priya Mehta', email: 'coordinator@projtrack.edu', role: 'coordinator', department: 'CSE' },
  { id: 'guide-1', name: 'Dr. Anil Verma', email: 'guide1@projtrack.edu', role: 'guide', department: 'CSE' },
  { id: 'guide-2', name: 'Dr. Sunita Patel', email: 'guide2@projtrack.edu', role: 'guide', department: 'CSE' },
  { id: 'student-1', name: 'Raj Kumar', email: 'raj@student.edu', role: 'student', department: 'CSE', rollNo: 'CS-2024-001', guideId: 'guide-1' },
  { id: 'student-2', name: 'Priya Sharma', email: 'priya@student.edu', role: 'student', department: 'CSE', rollNo: 'CS-2024-002', guideId: 'guide-1' },
  { id: 'student-3', name: 'Akshay Patel', email: 'akshay@student.edu', role: 'student', department: 'CSE', rollNo: 'CS-2024-003', guideId: 'guide-2' },
  { id: 'student-4', name: 'Aisha Khan', email: 'aisha@student.edu', role: 'student', department: 'CSE', rollNo: 'CS-2024-004', guideId: 'guide-2' },
  { id: 'student-5', name: 'Vikram Singh', email: 'vikram@student.edu', role: 'student', department: 'CSE', rollNo: 'CS-2024-005', guideId: 'guide-1' },
];

const dummyProjects: ProjectActivity[] = [
  {
    id: 'proj-1', title: 'Major Project - Capstone Development', description: 'Build a comprehensive software project demonstrating full-stack development skills.',
    type: 'major-project', startDate: '2025-01-15', endDate: '2025-04-30', topicDeadline: '2025-01-25',
    minTeamSize: 1, maxTeamSize: 4, status: 'active', coordinatorId: 'coord-1', createdAt: '2025-01-10',
  },
  {
    id: 'proj-2', title: 'Mini Project - Web Scraper', description: 'Build a web scraping tool with data visualization.',
    type: 'mini-project', startDate: '2025-02-01', endDate: '2025-03-31', topicDeadline: '2025-02-10',
    minTeamSize: 1, maxTeamSize: 2, status: 'active', coordinatorId: 'coord-1', createdAt: '2025-01-20',
  },
  {
    id: 'proj-3', title: 'Seminar - AI Ethics in Modern Computing', description: 'Present research on ethical implications of AI.',
    type: 'seminar', startDate: '2025-02-01', endDate: '2025-04-15', topicDeadline: '2025-02-15',
    minTeamSize: 1, maxTeamSize: 1, status: 'active', coordinatorId: 'coord-1', createdAt: '2025-01-25',
  },
];

const dummyTopicSubmissions: TopicSubmission[] = [
  { id: 'topic-1', projectId: 'proj-1', studentId: 'student-1', title: 'AI-Powered Job Recommendation System', description: 'Build a machine learning system that recommends jobs based on skills and preferences.', objectives: 'Collect data, build ML model, deploy web UI', technologies: 'Python, TensorFlow, React, PostgreSQL', domain: 'AI/ML', status: 'approved', submittedAt: '2025-01-22', feedback: 'Great topic! Looking forward to your progress.' },
  { id: 'topic-2', projectId: 'proj-1', studentId: 'student-2', title: 'Smart Campus Navigation App', description: 'Mobile-first app for navigating campus buildings and facilities.', objectives: 'Map campus, build navigation, add AR features', technologies: 'React Native, Node.js, MongoDB', domain: 'Mobile Development', status: 'approved', submittedAt: '2025-01-23', feedback: 'Approved. Focus on accuracy of navigation.' },
  { id: 'topic-3', projectId: 'proj-1', studentId: 'student-3', title: 'Blockchain Voting System', description: 'Decentralized voting platform using blockchain technology.', objectives: 'Build secure voting, ensure transparency', technologies: 'Solidity, React, Ethereum', domain: 'Blockchain', status: 'revision', submittedAt: '2025-01-24', feedback: 'Please clarify your security approach and add more detail on consensus mechanism.' },
  { id: 'topic-4', projectId: 'proj-2', studentId: 'student-1', title: 'Real-time News Aggregator', description: 'Scrape and aggregate news from multiple sources with sentiment analysis.', objectives: 'Scrape data, analyze sentiment, visualize trends', technologies: 'Python, BeautifulSoup, React', domain: 'Data Science', status: 'submitted', submittedAt: '2025-02-08' },
  { id: 'topic-5', projectId: 'proj-1', studentId: 'student-4', title: 'Healthcare Appointment System', description: 'Online appointment booking and management for hospitals.', objectives: 'Build booking system, notifications, admin panel', technologies: 'React, Node.js, PostgreSQL', domain: 'Web Development', status: 'approved', submittedAt: '2025-01-22', feedback: 'Excellent choice. Make sure to include patient privacy features.' },
  { id: 'topic-6', projectId: 'proj-1', studentId: 'student-5', title: 'E-Learning Platform', description: 'Interactive platform for online education with video streaming.', objectives: 'Video upload, quiz system, progress tracking', technologies: 'React, AWS, Node.js', domain: 'EdTech', status: 'submitted', submittedAt: '2025-01-25' },
];

const dummyReviews: Review[] = [
  { id: 'rev-1', projectId: 'proj-1', title: 'Review 1 - Design & Planning', scheduledDate: '2025-02-15', submissionDeadline: '2025-02-14', description: 'Present system design, architecture, and requirements analysis.' },
  { id: 'rev-2', projectId: 'proj-1', title: 'Review 2 - Development Phase', scheduledDate: '2025-03-15', submissionDeadline: '2025-03-14', description: 'Show development progress, working modules, and testing plans.' },
  { id: 'rev-3', projectId: 'proj-1', title: 'Review 3 - Final Testing & Deployment', scheduledDate: '2025-04-15', submissionDeadline: '2025-04-14', description: 'Present final product with testing results and deployment.' },
];

const dummyReviewSubmissions: ReviewSubmission[] = [
  { id: 'rsub-1', reviewId: 'rev-1', studentId: 'student-1', projectId: 'proj-1', progressUpdate: 'Completed system design, database schema, and API endpoint design. Architecture diagram finalized.', challenges: 'Choosing between microservices and monolithic architecture.', nextSteps: 'Begin backend development and database setup.', status: 'approved', score: 92, maxScore: 100, feedback: 'Excellent design work. Consider adding fallback strategies.', submittedAt: '2025-02-14', grade: 'A' },
  { id: 'rsub-2', reviewId: 'rev-1', studentId: 'student-2', projectId: 'proj-1', progressUpdate: 'Wireframes and mockups completed. User flow documented. Tech stack finalized.', status: 'approved', score: 85, maxScore: 100, feedback: 'Good progress. Improve the user flow documentation.', submittedAt: '2025-02-14', grade: 'B+' },
  { id: 'rsub-3', reviewId: 'rev-1', studentId: 'student-4', projectId: 'proj-1', progressUpdate: 'System requirements gathered. ER diagram and class diagram complete.', status: 'submitted', maxScore: 100, submittedAt: '2025-02-15' },
];

const dummyRubrics: Rubric[] = [
  {
    id: 'rubric-1', projectId: 'proj-1', name: 'Major Project Evaluation Rubric', totalPoints: 100,
    criteria: [
      { name: 'Code Quality', maxPoints: 20, description: 'Code readability, efficiency, error handling, best practices' },
      { name: 'Documentation', maxPoints: 15, description: 'Code comments, user guide, technical documentation' },
      { name: 'Functionality', maxPoints: 35, description: 'Core features working, edge cases handled, performance' },
      { name: 'Presentation', maxPoints: 20, description: 'Clarity of explanation, professionalism, demo quality' },
      { name: 'Submission Format', maxPoints: 10, description: 'Follows guidelines, file organization, completeness' },
    ],
  },
];

const dummyCalendarEvents: CalendarEvent[] = [
  { id: 'evt-1', title: 'Major Project Starts', date: '2025-01-15', type: 'start', projectId: 'proj-1', color: 'hsl(221, 83%, 53%)' },
  { id: 'evt-2', title: 'Topic Submission Deadline', date: '2025-01-25', type: 'deadline', projectId: 'proj-1', color: 'hsl(0, 84%, 60%)' },
  { id: 'evt-3', title: 'Review 1 - Design Phase', date: '2025-02-15', type: 'review', projectId: 'proj-1', color: 'hsl(262, 83%, 58%)' },
  { id: 'evt-4', title: 'Review 2 - Development', date: '2025-03-15', type: 'review', projectId: 'proj-1', color: 'hsl(262, 83%, 58%)' },
  { id: 'evt-5', title: 'Review 3 - Final', date: '2025-04-15', type: 'review', projectId: 'proj-1', color: 'hsl(262, 83%, 58%)' },
  { id: 'evt-6', title: 'Major Project Ends', date: '2025-04-30', type: 'end', projectId: 'proj-1', color: 'hsl(160, 84%, 39%)' },
  { id: 'evt-7', title: 'Mini Project Starts', date: '2025-02-01', type: 'start', projectId: 'proj-2', color: 'hsl(221, 83%, 53%)' },
  { id: 'evt-8', title: 'Mini Project Topic Deadline', date: '2025-02-10', type: 'deadline', projectId: 'proj-2', color: 'hsl(0, 84%, 60%)' },
];

const dummyNotifications: Notification[] = [
  { id: 'notif-1', userId: 'student-1', title: 'Topic Approved!', message: 'Your topic "AI-Powered Job Recommendation System" has been approved by Dr. Anil Verma.', read: false, createdAt: '2025-01-22', type: 'success' },
  { id: 'notif-2', userId: 'student-3', title: 'Revision Required', message: 'Your topic needs revision. Please check the feedback from your guide.', read: false, createdAt: '2025-01-24', type: 'warning' },
  { id: 'notif-3', userId: 'guide-1', title: 'New Submission', message: 'Raj Kumar has submitted Review 1 for Major Project.', read: false, createdAt: '2025-02-14', type: 'info' },
  { id: 'notif-4', userId: 'student-1', title: 'Review 2 Deadline', message: 'Review 2 submission is due in 3 days (Mar 14, 2025).', read: false, createdAt: '2025-03-11', type: 'deadline' },
  { id: 'notif-5', userId: 'coord-1', title: 'Submission Alert', message: '3 students have not submitted their topics for Mini Project yet.', read: true, createdAt: '2025-02-11', type: 'warning' },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      currentUser: null,
      users: [],
      projects: [],
      topicSubmissions: [],
      reviews: [],
      reviewSubmissions: [],
      rubrics: [],
      calendarEvents: [],
      notifications: [],

      setCurrentUser: (user) => set({ currentUser: user }),
      
      addUser: (user) => set((s) => ({ users: [...s.users, user] })),
      addProject: (project) => set((s) => ({ projects: [...s.projects, project] })),
      updateProject: (id, updates) => set((s) => ({ projects: s.projects.map(p => p.id === id ? { ...p, ...updates } : p) })),
      addTopicSubmission: (sub) => set((s) => ({ topicSubmissions: [...s.topicSubmissions, sub] })),
      updateTopicSubmission: (id, updates) => set((s) => ({ topicSubmissions: s.topicSubmissions.map(t => t.id === id ? { ...t, ...updates } : t) })),
      addReview: (review) => set((s) => ({ reviews: [...s.reviews, review] })),
      addReviewSubmission: (sub) => set((s) => ({ reviewSubmissions: [...s.reviewSubmissions, sub] })),
      updateReviewSubmission: (id, updates) => set((s) => ({ reviewSubmissions: s.reviewSubmissions.map(r => r.id === id ? { ...r, ...updates } : r) })),
      addRubric: (rubric) => set((s) => ({ rubrics: [...s.rubrics, rubric] })),
      addCalendarEvent: (event) => set((s) => ({ calendarEvents: [...s.calendarEvents, event] })),
      addNotification: (notification) => set((s) => ({ notifications: [...s.notifications, notification] })),
      markNotificationRead: (id) => set((s) => ({ notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n) })),

      loadDummyData: () => set({
        users: dummyUsers,
        projects: dummyProjects,
        topicSubmissions: dummyTopicSubmissions,
        reviews: dummyReviews,
        reviewSubmissions: dummyReviewSubmissions,
        rubrics: dummyRubrics,
        calendarEvents: dummyCalendarEvents,
        notifications: dummyNotifications,
      }),

      clearAllData: () => set({
        currentUser: null,
        users: [],
        projects: [],
        topicSubmissions: [],
        reviews: [],
        reviewSubmissions: [],
        rubrics: [],
        calendarEvents: [],
        notifications: [],
      }),
    }),
    { name: 'projtrack-store' }
  )
);
