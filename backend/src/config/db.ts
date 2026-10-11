import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB || "", {
      maxPoolSize: 10,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      minPoolSize: 5,
      family: 4,
    });
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
