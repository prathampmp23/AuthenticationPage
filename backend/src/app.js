import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// **Connection with MongoDB
const URL = process.env.MONGO_URL;
// Connect to MongoDB
mongoose.connect(URL)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));


import usersRoute from "./routes/userRoutes.js";
app.use("/api/auth", usersRoute)

const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`Backend running on http://localhost:${port}`)
);
