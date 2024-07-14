import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to database successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw new Error("Database connection failed.");
  }
};

export default connectToMongoDB;
