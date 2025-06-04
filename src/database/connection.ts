import mongoose from "mongoose";
import config from "../config";

export async function connectToDatabase(): Promise<void> {
  const dbUri: string = config.dbUrl;

  try {
    await mongoose.connect(dbUri);
    console.log("✅ Connected to MongoDB successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    } else {
      console.error("❌ Unknown error occurred while connecting to MongoDB");
    }
    throw error;
  }
}
