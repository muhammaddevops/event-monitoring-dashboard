import { io, Socket } from "socket.io-client";
import { SystemEvent, SystemStatus } from "../types";

const SOCKET_URL = "http://localhost:4000";

class SocketService {
  private socket: Socket;
  private static instance: SocketService;

  private constructor() {
    this.socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: false,
    });

    // Setup basic socket event handlers
    this.socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    this.socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Disconnected from WebSocket server:", reason);
    });
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(): void {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  public disconnect(): void {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  public onSystemEvent(callback: (event: SystemEvent) => void): void {
    this.socket.on("system-event", callback);
  }

  public onStatusUpdate(callback: (statuses: SystemStatus[]) => void): void {
    this.socket.on("status-update", callback);
  }

  public removeSystemEventListener(): void {
    this.socket.off("system-event");
  }

  public removeStatusUpdateListener(): void {
    this.socket.off("status-update");
  }
}

export default SocketService.getInstance();
