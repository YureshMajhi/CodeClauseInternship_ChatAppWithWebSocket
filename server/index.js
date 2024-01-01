import { createServer as createHttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

// Create an HTTP server
const httpServer = createHttpServer();

// Create a Socket.IO server instance
const chatServer = new SocketIOServer(httpServer, {
  cors: {
    // Adjust origins based on your environment
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5500", "http://127.0.0.1:5500"],
  },
});

// Handle socket connections
chatServer.on("connection", (clientSocket) => {
  console.log(`Client ${clientSocket.id} connected`);

  // Listen for incoming messages
  clientSocket.on("message", (messageData) => {
    console.log(messageData);

    // Broadcast the message to all connected clients
    chatServer.emit(
      "message",
      `${clientSocket.id.substring(0, 5)}: ${messageData}`
    );
  });
});

// Start the server on port 4000
httpServer.listen(4000, () => console.log("Server listening on port 4000"));
