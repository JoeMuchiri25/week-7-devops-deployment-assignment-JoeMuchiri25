// /client/src/pages/ChatPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import ChatBox from '../components/ChatBox';
import API from '../services/axios';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const { user, logout } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await API.get('/auth/users'); // You can create this route to return all users
        const filtered = res.data.filter((u) => u._id !== user._id);
        setContacts(filtered);
        if (filtered.length > 0) setActiveUser(filtered[0]); // Auto-select first contact
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    fetchUsers();
  }, [user, navigate]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        users={contacts}
        onSelect={(u) => setActiveUser(u)}
        currentUserId={user._id}
      />

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Chat with {activeUser?.username || '...'}
            </h2>
            <p className="text-sm text-gray-500">
              {activeUser?.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
          <button onClick={logout} className="text-sm text-red-500 hover:underline">
            Logout
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-hidden">
          {activeUser && <ChatBox activeUser={activeUser} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
