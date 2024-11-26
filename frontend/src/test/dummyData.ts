export const dummyStatusData = [
  {
    component: "Third Party App",
    status: "healthy",
    lastUpdated: new Date().toISOString(),
    metrics: {
      responseTime: 150,
      errorRate: 0.1,
      throughput: 100,
    },
  },
  {
    component: "Agent",
    status: "degraded",
    lastUpdated: new Date().toISOString(),
    metrics: {
      responseTime: 1350,
      errorRate: 0.9,
      throughput: 30,
    },
  },
  {
    component: "Messages",
    status: "down",
    lastUpdated: new Date().toISOString(),
    metrics: {
      responseTime: 299,
      errorRate: 1,
      throughput: 10,
    },
  },
];

export const dummyEventData = [
  {
    id: "1",
    timestamp: new Date().toISOString(),
    type: "api_call",
    component: "third_party_app",
    status: "success",
    message: "API call completed successfully",
  },
];
