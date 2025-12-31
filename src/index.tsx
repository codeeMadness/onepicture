import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainPage from './components/MainPage';
import { AppProviders } from './context/AppProviders';
import DonationPage from './components/DonationPage';
import SignIn from './components/SignIn';
import MyProfile from './components/MyProfile';
import ProtectedRoute from './components/routes/ProtectedRoute';

// Create a client instance
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AppProviders>
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/donate" element={<DonationPage />} />
          <Route path="/signin" element={<SignIn />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </AppProviders>
);