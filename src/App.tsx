import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import OnboardingPage from './pages/OnboardingPage';
import AuthPage from './pages/AuthPage';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import WellnessTracker from './pages/WellnessTracker';
import WellbeingJournal from './pages/WellbeingJournal';
import HealthReport from './pages/HealthReport';
import PrivacyPolicy from './pages/PrivacyPolicy'; // Import the PrivacyPolicy component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} /> {/* Privacy Policy route */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="wellness" element={<WellnessTracker />} />
            <Route path="wellbeing" element={<WellbeingJournal />} />
            <Route path="report" element={<HealthReport />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
