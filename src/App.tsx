import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/auth/HomePage";
import ChallengeTopicsPage from "./pages/auth/ChallengeTopicsPage";
import ChallengeTopicDetailsPage from "./pages/auth/ChallengeTopicDetailsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/challenges" element={<ChallengeTopicsPage />} />
          <Route
            path="/challenges/:topic"
            element={<ChallengeTopicDetailsPage />}
          />
        </Route>
        {/* 👈 Renders at /app/ */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
