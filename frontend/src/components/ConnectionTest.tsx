import React, { useEffect, useState } from "react";
import { SystemStatus } from "../types";
import { useSocketIO } from "../hooks/useSocketIO";

export const ConnectionTest: React.FC = () => {
  const [apiMessage, setApiMessage] = useState<string>("");
  const [socketData, setSocketData] = useState<SystemStatus | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Test REST API connection
  useEffect(() => {
    const testApiConnection = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/test");
        const data = await response.json();
        setApiMessage(data.message);
      } catch (err) {
        setError("Failed to connect to API");
        console.error("API connection error:", err);
      } finally {
        setLoading(false);
      }
    };

    testApiConnection();
  }, []);

  // Test WebSocket connection
  useSocketIO({
    onStatusUpdate: (statuses) => {
      if (statuses.length > 0) {
        setSocketData(statuses[0]);
      }
    },
  });

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Connection Test</h2>

        {/* API Status */}
        <div className="mb-4">
          <h3 className="font-medium">REST API Status:</h3>
          {loading ? (
            <p className="text-gray-500">Testing connection...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-green-500">Connected! Message: {apiMessage}</p>
          )}
        </div>

        {/* WebSocket Status */}
        <div>
          <h3 className="font-medium">WebSocket Status:</h3>
          {socketData ? (
            <div className="text-green-500">
              <p>Connected! Receiving real-time updates</p>
              <pre className="mt-2 bg-gray-50 p-2 rounded text-sm">{JSON.stringify(socketData, null, 2)}</pre>
            </div>
          ) : (
            <p className="text-gray-500">Waiting for WebSocket data...</p>
          )}
        </div>
      </div>
    </div>
  );
};
