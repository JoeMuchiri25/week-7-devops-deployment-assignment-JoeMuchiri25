import { useEffect, useState } from 'react';
import { useSocket } from '../contexts/SocketContext';
import { useAuth } from '../contexts/AuthContext';
import TypingIndicator from './TypingIndicator';
import ColoredAvatar from './ColoredAvatar'; // ✅ new import

const ChatBox = ({ activeUser }) => {
  const { user } = useAuth();
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typingUser, setTypingUser] = useState(null);

  const getRoomId = (a, b) => [a, b].sort().join('_');

  useEffect(() => {
    if (!socket || !activeUser?._id) return;

    const roomId = getRoomId(user._id, activeUser._id);
    socket.emit('joinRoom', { room: roomId });

    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleTyping = ({ name }) => {
      setTypingUser(name);
      setTimeout(() => setTypingUser(null), 1000);
    };

    socket.on('message', handleMessage);
    socket.on('typing', handleTyping);

    return () => {
      socket.off('message', handleMessage);
      socket.off('typing', handleTyping);
    };
  }, [socket, activeUser?._id]);

  const sendMessage = () => {
    if (input.trim() === '') return;

    const room = getRoomId(user._id, activeUser._id);
    socket.emit('chatMessage', {
      room,
      message: input,
      senderName: user.username || 'You',
      senderId: user._id,
    });

    setInput('');
  };

  const handleTyping = () => {
    const room = getRoomId(user._id, activeUser._id);
    socket.emit('typing', {
      room,
      name: user.username || 'Someone',
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 ${
              msg.senderId === user._id ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.senderId !== user._id && (
              <ColoredAvatar name={msg.senderName || 'U'} />
            )}
            <div
              className={`max-w-xs rounded-lg px-4 py-2 ${
                msg.senderId === user._id
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-200 text-gray-800 self-start'
              }`}
            >
              <div className="text-xs font-semibold mb-1">
                {msg.senderName || 'Unknown'}
              </div>
              <div>{msg.content}</div>
            </div>
          </div>
        ))}
        {typingUser && <TypingIndicator name={typingUser} />}
      </div>
      <div className="px-4 py-2 border-t flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button onClick={sendMessage} className="btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
