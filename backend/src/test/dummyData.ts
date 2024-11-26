import { socketService } from "../server";

// Test WebSocket event
export const testInterval = setInterval(() => {
  socketService.emitStatusUpdate([
    {
      component: "Test Component",
      status: "healthy",
      lastUpdated: new Date().toISOString(),
      metrics: {
        responseTime: Math.random() * 100,
        errorRate: Math.random() * 5,
        throughput: Math.random() * 1000,
      },
    },
  ]);
}, 5000);

// add the below line in the server.ts after "server.close" when testing
// clearInterval(testInterval);
