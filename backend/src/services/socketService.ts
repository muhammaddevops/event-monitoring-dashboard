import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";
import { SystemEvent, SystemStatus } from "../types";
import { config } from "../config/config";

export class SocketService {
  private io: SocketServer;

  constructor(server: HttpServer) {
    this.io = new SocketServer(server, {
      cors: {
        origin: config.cors.origin,
        methods: ["GET", "POST"],
      },
    });

    this.io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  }

  public emitEvent(event: SystemEvent): void {
    console.log("Emitting event:", event); // Debug log
    this.io.emit("system-event", event); // Make sure we're using the correct event name
  }

  public emitStatusUpdate(statuses: SystemStatus[]): void {
    this.io.emit("status-update", statuses);
  }
}
