// src/test/testConnection.ts

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri: string = process.env.MONGODB_URI as string;

if (!mongoUri) {
  console.error("MONGODB_URI is not defined in .env file");
  process.exit(1);
}

async function testConnection() {
  try {
    console.log("Attempting to connect to MongoDB...");

    // TypeScript now knows mongoUri is definitely a string due to the check above
    await mongoose.connect(mongoUri, {
      // Add these options for better stability
      retryWrites: true,
      w: "majority",
    });

    console.log("Successfully connected to MongoDB!");

    if (!mongoose.connection.db) {
      throw new Error("Database connection not established");
    }

    // Test creating a collection
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(
      "Available collections:",
      collections.map((c) => c.name)
    );

    // Test database operations
    const testCollection = mongoose.connection.collection("test");
    await testCollection.insertOne({ test: true, timestamp: new Date() });
    console.log("Successfully inserted test document");

    const result = await testCollection.findOne({ test: true });
    console.log("Successfully retrieved test document:", result);

    // Clean up
    await testCollection.deleteOne({ test: true });
    console.log("Successfully cleaned up test document");
  } catch (error) {
    console.error("MongoDB connection test failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed");
    process.exit(0);
  }
}

// Add connection event listeners
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB");
});

testConnection();
