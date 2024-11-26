import React, { useState, useCallback, useEffect } from "react";
import { StatusOverview } from "./components/StatusOverview";
import { EventList } from "./components/EventList";
// import { ConnectionTest } from "./components/ConnectionTest";
import { SystemEvent, SystemStatus } from "./types";
import { useSocketIO } from "./hooks/useSocketIO";

function App() {
  const [events, setEvents] = useState<SystemEvent[]>([]);
  const [statuses, setStatuses] = useState<SystemStatus[]>([]);

  // Handle new events
  const handleNewEvent = useCallback((event: SystemEvent) => {
    console.log("Received event:", event); // Debug log
    setEvents((prevEvents) => [event, ...prevEvents].slice(0, 10)); // Keep last 10 events
  }, []);

  // Handle status updates
  const handleStatusUpdate = useCallback((newStatuses: SystemStatus[]) => {
    setStatuses(newStatuses);
  }, []);

  // Initialize WebSocket connection
  useSocketIO({
    onEvent: handleNewEvent,
    onStatusUpdate: handleStatusUpdate,
  });

  // Add this useEffect to verify events are being stored
  useEffect(() => {
    console.log("Current events:", events); // Debug log
  }, [events]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">System Monitoring Dashboard</h1>
          </div>
        </header>
        <main className="mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">System Status</h2>
                <StatusOverview statuses={statuses} />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
                <EventList events={events} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
