import { useEffect } from "react";
import socketService from "../services/socketService";
import { SystemEvent, SystemStatus } from "../types";

interface UseSocketIOProps {
  onEvent?: (event: SystemEvent) => void;
  onStatusUpdate?: (statuses: SystemStatus[]) => void;
}

export const useSocketIO = ({ onEvent, onStatusUpdate }: UseSocketIOProps) => {
  useEffect(() => {
    // Connect to WebSocket server
    socketService.connect();

    // Setup event listeners with debug logs
    if (onEvent) {
      console.log("Setting up event listener"); // Debug log
      socketService.onSystemEvent((event) => {
        console.log("Socket received event:", event); // Debug log
        onEvent(event);
      });
    }

    if (onStatusUpdate) {
      socketService.onStatusUpdate(onStatusUpdate);
    }

    // Cleanup on unmount
    return () => {
      if (onEvent) {
        socketService.removeSystemEventListener();
      }
      if (onStatusUpdate) {
        socketService.removeStatusUpdateListener();
      }
      socketService.disconnect();
    };
  }, [onEvent, onStatusUpdate]);
};
