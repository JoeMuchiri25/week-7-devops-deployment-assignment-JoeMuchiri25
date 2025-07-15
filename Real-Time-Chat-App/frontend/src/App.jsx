// /client/src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/chat" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/chat" /> : <RegisterPage />}
      />
      <Route
        path="/chat"
        element={user ? <ChatPage /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
