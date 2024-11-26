import { SystemEvent, SystemStatus } from "../types";
import { Event } from "../models/Event";
import { Status } from "../models/Status";
import { SocketService } from "./socketService";

export class SimulatorService {
  private socketService: SocketService;
  private interval: ReturnType<typeof setInterval> | null = null;

  constructor(socketService: SocketService) {
    this.socketService = socketService;
  }

  // Generate random ID
  private generateId(): string {
    return Math.random().toString(36).slice(2, 11); // Using slice instead of substr
  }

  // Simple function to generate random events
  private generateEvent(): SystemEvent {
    const components = ["third_party_app", "user_frontend", "functional_layer", "database"];
    const types = ["api_call", "system_status", "performance_metric"];
    const statuses = ["success", "warning", "error"];

    const event = {
      id: this.generateId(), // Using the new generateId method
      timestamp: new Date().toISOString(),
      type: types[Math.floor(Math.random() * types.length)] as SystemEvent["type"],
      component: components[Math.floor(Math.random() * components.length)] as SystemEvent["component"],
      status: statuses[Math.floor(Math.random() * statuses.length)] as SystemEvent["status"],
      message: "Simulated event",
    };

    if (event.type === "performance_metric") {
      event.message = `Response time: ${Math.floor(Math.random() * 1000)}ms`;
    }

    return event;
  }

  // Generate system status

  private generateStatus(): SystemStatus[] {
    return ["third_party_app", "user_frontend", "functional_layer", "database"].map((component) => ({
      component,
      status: Math.random() > 0.8 ? "degraded" : "healthy",
      lastUpdated: new Date().toISOString(),
      metrics: {
        responseTime: Math.floor(Math.random() * 1000), // Always provide these values
        errorRate: Number((Math.random() * 5).toFixed(2)),
        throughput: Math.floor(Math.random() * 100),
      },
    }));
  }

  // Start simulation
  public start(intervalMs: number = 5000): void {
    if (this.interval) {
      return;
    }

    this.interval = setInterval(async () => {
      try {
        // Generate and save event - add console.log to debug
        const event = this.generateEvent();
        console.log("Generated event:", event); // Debug log
        await new Event(event).save();
        this.socketService.emitEvent(event); // Make sure this line exists

        // Generate and save status
        const statuses = this.generateStatus();
        await Status.deleteMany({});
        await Status.insertMany(statuses);
        this.socketService.emitStatusUpdate(statuses);
      } catch (error) {
        console.error("Error in simulator:", error);
      }
    }, intervalMs);

    console.log("Simulator started");
  }

  // Stop simulation
  public stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      console.log("Simulator stopped");
    }
  }
}
