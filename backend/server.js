import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import protectRoute from "./middleware/protectRoute.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connect.js";

config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", protectRoute, messageRoutes);
app.use("/api/users", protectRoute, userRoutes);

try {
  await connectToMongoDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (error) {
  console.error("Error during setting up project.", error.message);
}
