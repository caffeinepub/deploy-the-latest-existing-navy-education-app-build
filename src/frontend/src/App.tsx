import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import SiteLayout from './components/SiteLayout';
import HomePage from './pages/HomePage';
import LearnIndexPage from './pages/LearnIndexPage';
import LearnTopicPage from './pages/LearnTopicPage';
import QuizzesPage from './pages/QuizzesPage';
import QuizPlayPage from './pages/QuizPlayPage';
import QuizResultsPage from './pages/QuizResultsPage';
import GamesPage from './pages/GamesPage';
import GamePlayPage from './pages/GamePlayPage';
import ProgressPage from './pages/ProgressPage';
import AboutPoliciesPage from './pages/AboutPoliciesPage';
import SubscribePage from './pages/SubscribePage';

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const learnIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learn',
  component: LearnIndexPage,
});

const learnTopicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learn/$topicId',
  component: LearnTopicPage,
});

const quizzesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quizzes',
  component: QuizzesPage,
});

const quizPlayRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz/$quizId',
  component: QuizPlayPage,
});

const quizResultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz/$quizId/results',
  component: QuizResultsPage,
});

const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/games',
  component: GamesPage,
});

const gamePlayRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/games/$gameId',
  component: GamePlayPage,
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/progress',
  component: ProgressPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPoliciesPage,
});

const subscribeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/subscribe',
  component: SubscribePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  learnIndexRoute,
  learnTopicRoute,
  quizzesRoute,
  quizPlayRoute,
  quizResultsRoute,
  gamesRoute,
  gamePlayRoute,
  progressRoute,
  aboutRoute,
  subscribeRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
