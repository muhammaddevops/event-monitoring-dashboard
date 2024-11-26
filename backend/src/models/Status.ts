import mongoose from "mongoose";
import { SystemStatus } from "../types";

const statusSchema = new mongoose.Schema({
  component: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["healthy", "degraded", "down"],
    required: true,
  },
  lastUpdated: { type: Date, default: Date.now },
  metrics: {
    responseTime: Number,
    errorRate: Number,
    throughput: Number,
  },
});

export const Status = mongoose.model<SystemStatus & mongoose.Document>("Status", statusSchema);
