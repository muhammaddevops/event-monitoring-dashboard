import React from "react";
import { useEffect, useState } from "react";
import socketService from "../services/socketService";

export const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = socketService["socket"]; // Accessing private property

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    setIsConnected(socket.connected);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  return (
    <div className="flex items-center">
      <div className={`h-3 w-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
      <span className="ml-2 text-sm text-gray-600">{isConnected ? "Connected" : "Disconnected"}</span>
    </div>
  );
};
