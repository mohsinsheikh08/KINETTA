import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./src/app";
import connectDB from "./src/config/db";
const PORT = process.env.PORT || 3000;
import { Server } from "socket.io";
import messageModel from "./src/models/message.model";
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const onlineUser = new Map<string, string>();

io.on("connection", (socket) => {
  console.log(`User added ${socket.id}`);

  socket.on("add-user", (userId: string) => {
    onlineUser.set(userId, socket.id);
    io.emit("online-users", Array.from(onlineUser.keys()));
  });

  socket.on(
    "private-message",
    async ({ text, from, to }: { text: string; from: string; to: string }) => {
      console.log("Message received:", { text, from, to });
      const message = await messageModel.create({ text, to, from });
      console.log("Message saved:", message._id);
      const recieverSocketId = onlineUser.get(to);
      if (recieverSocketId) {
        io.to(recieverSocketId).emit("private-message", message);
      }
      socket.emit("private-message", message);
    },
  );

  socket.on("typing", ({ from, to }: { from: string; to: string }) => {
    const recieverSocketId = onlineUser.get(to);

    if (recieverSocketId) {
      io.to(recieverSocketId).emit("typing", { from });
    }
  });

  socket.on("stop-typing", ({ from, to }: { from: string; to: string }) => {
    const recieverSocketId = onlineUser.get(to);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("stop-typing", { from });
    }
  });

  socket.on("disconnect", () => {
    for (let [userId, socketId] of onlineUser.entries()) {
      if (socketId === socket.id) {
        onlineUser.delete(userId);
      }
    }
    console.log(`User diconnected ${socket.id}`);
  });
});
connectDB();
httpServer.listen(PORT, () => {
  console.log(`Server running successfully on (PORT : ${PORT})`);
});
