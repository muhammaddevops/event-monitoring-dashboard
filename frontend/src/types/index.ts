export interface SystemEvent {
  id: string;
  timestamp: string;
  type: "api_call" | "system_status" | "performance_metric";
  component: "third_party_app" | "user_frontend" | "functional_layer" | "database";
  status: "success" | "error" | "warning";
  message: string;
  metadata?: Record<string, any>;
}

export interface SystemStatus {
  component: string;
  status: "healthy" | "degraded" | "down";
  lastUpdated: string;
  metrics: {
    responseTime: number;
    errorRate: number;
    throughput: number;
  };
}
