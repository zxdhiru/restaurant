import app from "./app";
import config from "./config";
import { connectToDatabase } from "./database/connection";

const PORT = config.port;

async function startServer() {
  try {
    await connectToDatabase();
    console.log("✅ Database connection established");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  }
}

startServer();
