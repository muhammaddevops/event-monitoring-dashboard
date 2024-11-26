import mongoose from "mongoose";
import { SystemEvent } from "../types";

const eventSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: ["api_call", "system_status", "performance_metric"],
    required: true,
  },
  component: {
    type: String,
    enum: ["third_party_app", "user_frontend", "functional_layer", "database"],
    required: true,
  },
  status: {
    type: String,
    enum: ["success", "error", "warning"],
    required: true,
  },
  message: { type: String, required: true },
  metadata: { type: Map, of: mongoose.Schema.Types.Mixed },
});

export const Event = mongoose.model<SystemEvent & mongoose.Document>("Event", eventSchema);
