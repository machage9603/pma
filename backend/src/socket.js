const { Server } = require('socket.io');  // Modern import style

const initializeSocket = (server) => {
  const io = new Server(server, {  // Use 'new Server()' instead of 'socketIo()'
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",  // Fallback for local dev
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  // Match Express CORS methods
      allowedHeaders: ["Content-Type", "Authorization"],  // Explicit headers
      credentials: true  // Important for authenticated connections
    },
    path: "/socket.io"  // Explicit path (optional but recommended)
  });

  // Add error handling
  io.on("error", (error) => {
    console.error("Socket.IO Error:", error);
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Add socket error handling
    socket.on('error', (error) => {
      console.error(`Socket Error (${socket.id}):`, error);
    });

    // Join project room (add validation)
    socket.on('joinProject', (projectId) => {
      if (typeof projectId === 'string') {
        socket.join(`project-${projectId}`);
        console.log(`${socket.id} joined project-${projectId}`);
      }
    });

    // Join task room (add validation)
    socket.on('joinTask', (taskId) => {
      if (typeof taskId === 'string') {
        socket.join(`task-${taskId}`);
        console.log(`${socket.id} joined task-${taskId}`);
      }
    });

    socket.on('disconnect', (reason) => {
      console.log(`Client disconnected (${socket.id}): ${reason}`);
    });
  });

  return io;
};

module.exports = initializeSocket;