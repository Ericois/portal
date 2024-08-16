// client/src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import MainDashboard from "./components/Dashboard/MainDashboard";
import Login from "./components/Auth/Login";
import Profile from "./components/Profile/ProfileDetails";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import "./App.css";

const AppRoutes = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/dashboard"
        element={token ? <MainDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={token ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="*"
        element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  </AuthProvider>
);

export default App;
