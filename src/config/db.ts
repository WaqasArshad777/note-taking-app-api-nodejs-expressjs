import mongoose from 'mongoose';
import config from '@/config';

const connectDB = async (): Promise<void> => {
  try {
    if (!config.mongoURI) {
      throw new Error('MongoDB URI is not defined in configuration');
    }
    
    await mongoose.connect(config.mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    const error = err as Error;
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB; 