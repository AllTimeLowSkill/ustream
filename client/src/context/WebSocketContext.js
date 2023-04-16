import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io('http://localhost:8080')
export const WebSocketContext = createContext(socket)
export const WebSocketProvider = WebSocketContext.Provider