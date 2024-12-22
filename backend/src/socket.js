const socketIo = require('socket.io');

const initializeSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    // Join project room
    socket.on('joinProject', (projectId) => {
      socket.join(`project-${projectId}`);
    });

    // Join task room
    socket.on('joinTask', (taskId) => {
      socket.join(`task-${taskId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

module.exports = initializeSocket;
