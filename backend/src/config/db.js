const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connection string:', process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Connection string:', process.env.MONGODB_URI);
    process.exit(1);
  }
};

module.exports = connectDB;