import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const backendURL = import.meta.env.VITE_API_URL;

    const socketInstance = io(backendURL, {
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['polling', 'websocket'],
    });

    socketInstance.on('connect', () => {
      console.log('🟢 Socket connected:', socketInstance.id);
    });

    socketInstance.on('disconnect', () => {
      console.warn('🔴 Socket disconnected');
    });

    socketInstance.on('connect_error', (err) => {
      console.error('❌ Connection error:', err.message);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
