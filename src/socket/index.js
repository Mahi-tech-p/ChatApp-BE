import { Server } from "socket.io";

import registerChatHandlers from "./chatSocket.js";

let io;

export const initSocket = (server) => {

  io = new Server(server, {
    cors: {
      origin: "http://localhost:5174",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {

    console.log(
      `User connected: ${socket.id}`
    );

    registerChatHandlers(io, socket);

    socket.on("disconnect", () => {
      console.log(
        `User disconnected: ${socket.id}`
      );
    });

  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.io not initialized"
    );
  }

  return io;
};