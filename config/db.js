import { MongoClient, ServerApiVersion, GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';

let gfs;

const connectDB = async () => {
  try {
    // Connect using Mongoose
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Initialize GridFS
    const db = mongoose.connection.db;
    gfs = new GridFSBucket(db, {
      bucketName: 'uploads'
    });

    console.log('GridFS initialized');
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
export { gfs };
