import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://ali:ali123@cluster0.butwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "nextjs-backend", //هون انا بحدد اسم الداتا بيس الي بدي ينتشأ
    });
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};
connectMongoDB();

export default connectMongoDB;
