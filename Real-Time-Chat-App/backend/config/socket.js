const socketSetup = (io) => {
  io.on('connection', (socket) => {
    console.log(`🟢 User connected: ${socket.id}`);

    // Store user's info upon joining
    socket.on('joinRoom', ({ room, userId, username }) => {
      socket.userId = userId;
      socket.username = username;
      socket.join(room);
      socket.to(room).emit('userJoined', { userId, username });
    });

    // Broadcast message to room
    socket.on('chatMessage', ({ room, message, senderName, senderId }) => {
      io.to(room).emit('message', {
        senderId,
        senderName,
        content: message,
        timestamp: new Date(),
      });
    });

    // Emit typing status
    socket.on('typing', ({ room, name }) => {
      socket.to(room).emit('typing', { name });
    });

    socket.on('disconnect', () => {
      console.log(`🔴 User disconnected: ${socket.id}`);
      // Optionally broadcast offline status
      // io.emit('userOffline', { userId: socket.userId });
    });
  });
};

module.exports = socketSetup;
