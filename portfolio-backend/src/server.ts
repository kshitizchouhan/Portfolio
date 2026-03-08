import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import adminRoute from "./routes/admin";
import connectDB from "./config/db";
import contactRoute from "./routes/contact";

dotenv.config();

const app = express();

// VERY IMPORTANT for Render
app.set("trust proxy", 1);

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/admin", adminRoute);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: "Too many requests, please try again later."
});

app.use("/api/contact", limiter);
app.use("/api/contact", contactRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});