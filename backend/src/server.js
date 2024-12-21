const mongoose = require('mongoose');
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect(MONGODB_URI)
  .then(() => console.log('🔥 Connected to MongoDB successfully!'))
  .catch((err) => console.error('💥 MongoDB connection failed:', err));
