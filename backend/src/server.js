require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const http = require('http');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO after server creation
const io = require('./socket')(server);

// Add io to app for middleware usage
app.set('io', io);

connectDB();

mongoose.connect(MONGODB_URI)
  .then(() => console.log('🔥 Connected to MongoDB successfully!'))
  .catch((err) => console.error('💥 MongoDB connection failed:', err));

// Use server.listen instead of app.listen
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Move this middleware to app.js since it's Express middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});