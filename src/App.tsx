import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ChallengeTopicsPage from "./pages/ChallengeTopicsPage";
import ChallengeTopicDetailsPage from "./pages/ChallengeTopicDetailsPage";
import {
  ROUTE_CHALLENGE_TOPIC,
  ROUTE_CHALLENGES,
  ROUTE_LOGIN,
  ROUTE_LOGOUT,
  ROUTE_PROFILE,
  ROUTE_ROOT,
  ROUTE_SCOREBOARD,
  ROUTE_TICKET_DETAIL,
  ROUTE_TICKET_SUBMIT,
  ROUTE_TICKETS,
} from "./constants/routes";
import ScoreboardPage from "./pages/ScoreboardPage";
import LogoutPage from "./pages/auth/LogoutPage";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import ProfilePage from "./pages/auth/ProfilePage";
import SubmitTicketPage from "./pages/SubmitTicketPage";
import TicketDetailPage from "./pages/TicketDetailPage";
import TicketListPage from "./pages/TicketListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_ROOT} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTE_LOGIN} element={<LoginPage />} />
          <Route
            path={ROUTE_CHALLENGES}
            element={<ProtectedRoute children={<ChallengeTopicsPage />} />}
          />
          <Route
            path={ROUTE_CHALLENGE_TOPIC}
            element={
              <ProtectedRoute children={<ChallengeTopicDetailsPage />} />
            }
          />
          <Route
            path={ROUTE_PROFILE}
            element={<ProtectedRoute children={<ProfilePage />} />}
          />
          <Route
            path={ROUTE_TICKETS}
            element={<ProtectedRoute children={<TicketListPage />} />}
          />
          <Route
            path={ROUTE_TICKET_DETAIL}
            element={<ProtectedRoute children={<TicketDetailPage />} />}
          />
          <Route
            path={ROUTE_TICKET_SUBMIT}
            element={<ProtectedRoute children={<SubmitTicketPage />} />}
          />
          <Route path={ROUTE_SCOREBOARD} element={<ScoreboardPage />} />
          <Route path={ROUTE_LOGOUT} element={<LogoutPage />}></Route>
        </Route>
        {/* 👈 Renders at /app/ */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
