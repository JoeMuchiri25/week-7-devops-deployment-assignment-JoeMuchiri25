// /client/src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white text-center px-6">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
        Real-Time Team Chat 💬
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Connect instantly. Chat securely. Built for teams.
      </p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="btn-primary px-6 py-2 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Log In
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
        >
          Sign Up
        </Link>
      </div>
      <footer className="absolute bottom-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Built with ❤️ & MERN
      </footer>
    </div>
  );
};

export default HomePage;
