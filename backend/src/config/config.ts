import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/system-monitor",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  },
};
