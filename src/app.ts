import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Health Check Route
app.get("/", (_req, res) => {
  res.status(200).json({ message: "🚀 Server is running!" });
});

app.use((err: Error, _req: Request, res: Response) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
