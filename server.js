import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";

const app = express();
const PORT = 3000;

app.use(
  helmet({
    crossOriginOpenerPolicy: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.listen(PORT, () => console.log("Server running on 3000"));
