require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const connectDB = require('./config/db');
const io = require('./socket')(server);

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

connectDB();

mongoose.connect(MONGODB_URI)
  .then(() => console.log('🔥 Connected to MongoDB successfully!'))
  .catch((err) => console.error('💥 MongoDB connection failed:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((req, res, next) => {
  req.io = io;
  next();
});
