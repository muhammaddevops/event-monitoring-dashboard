import React from "react";
import { SystemStatus } from "../types";

interface StatusOverviewProps {
  statuses: SystemStatus[];
}

export const StatusOverview: React.FC<StatusOverviewProps> = ({ statuses }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-500";
      case "degraded":
        return "bg-yellow-500";
      case "down":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {statuses.map((status) => (
        <div key={status.component} className="bg-white shadow rounded-lg p-4 w-full">
          <div className="flex items-center mb-4">
            <div className={`h-3 w-3 rounded-full ${getStatusColor(status.status)}`} />
            <h3 className="ml-2 text-lg font-medium text-gray-900">{status.component}</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">Response Time</span>
              <span className="font-medium">{status.metrics.responseTime.toFixed(0)}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Error Rate</span>
              <span className="font-medium">{status.metrics.errorRate.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Throughput</span>
              <span className="font-medium">{status.metrics.throughput.toFixed(0)}/s</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Last updated: {new Date(status.lastUpdated).toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  );
};
