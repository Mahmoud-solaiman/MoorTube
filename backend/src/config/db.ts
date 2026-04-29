import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('DB connected successfully');
  } catch (error) {
    console.log('Could not connect to database: ', error);
  }
}

export default connectDB;