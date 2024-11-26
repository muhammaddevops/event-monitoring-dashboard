import express from "express";
import http from "http";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config/config";
import { SocketService } from "./services/socketService";
import { SimulatorService } from "./services/simulatorService";
import { Event } from "./models/Event";
import { Status } from "./models/Status";

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
export const socketService = new SocketService(server);

// Initialize Simulator with the socket service
const simulatorService = new SimulatorService(socketService);

// Middleware
app.use(
  cors({
    origin: config.cors.origin,
  })
);
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(config.mongodb.uri)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start simulator after MongoDB connection is established
    simulatorService.start();
    console.log("Simulator started");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Add debug routes
app.get("/api/debug/events", async (req, res) => {
  const events = await Event.find().sort({ timestamp: -1 }).limit(10);
  res.json(events);
});

app.get("/api/debug/status", async (req, res) => {
  const statuses = await Status.find();
  res.json(statuses);
});

// Start server
server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

// Handle process termination
process.on("SIGTERM", () => {
  simulatorService.stop();
  server.close(() => {
    mongoose.connection.close(false);
    process.exit(0);
  });
});
