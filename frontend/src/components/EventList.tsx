import React from "react";
import { SystemEvent } from "../types";

interface EventListProps {
  events: SystemEvent[];
}

export const EventList: React.FC<EventListProps> = ({ events }) => {
  const getEventTypeColor = (type: SystemEvent["type"]) => {
    switch (type) {
      case "api_call":
        return "bg-blue-100 text-blue-800";
      case "system_status":
        return "bg-green-100 text-green-800";
      case "performance_metric":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: SystemEvent["status"]) => {
    switch (status) {
      case "success":
        return "text-green-600";
      case "warning":
        return "text-yellow-600";
      case "error":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      {events.length === 0 ? (
        <div className="p-4 text-center text-gray-500">No events to display</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {events.map((event) => (
            <li key={event.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getEventTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{event.component}</span>
                </div>
                <span className={`text-sm font-medium ${getStatusColor(event.status)}`}>{event.status}</span>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">{event.message}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(event.timestamp).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
