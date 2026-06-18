import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { room } from "./socket.io.service";
import { BadRequestException } from "../../exception/application.exception";

class chatSocket {
  io: Server;
  createRoom: any;

  constructor(io: Server) {
    this.io = io;
    this.createRoom = room;
    this.createChatRoom();
  }

  async createChatRoom() {
    let user = new Map()

    this.io.on("connection", async (socket) => {
      console.log(`Connected: ${socket.id}`);

      const token = socket.handshake.auth.token;
      if (!token) {
        socket.emit("error_message", "you are not auth");
        return socket.disconnect();
      }

      let userid = jwt.decode(token) as {
        _id: string;
        aud: string;
        [key: string]: any;
      };

      if (!userid || !userid._id) {
        socket.emit("error_message", "invalid token");
        return socket.disconnect();
      }

      const currentUserId = userid._id;

      if (user.has(currentUserId)) {
        user.get(currentUserId)!.push(socket.id);
      } else {
        user.set(currentUserId, [socket.id]);
      }

      socket.on("room", async (data) => {
        const { recevedID } = data;

        if (!recevedID) {
          return socket.emit(
            "error_message",
            "should be another user to start the room",
          );
        }

        if (currentUserId.toString() === recevedID.toString()) {
          return socket.emit(
            "error_message",
            "sorry you cant make chat with your self",
          );
        }

        try {
          const roomId = await room.createRoom(data, currentUserId, recevedID);
          const RoomId = roomId.toString();

          socket.join(RoomId);
          console.log(`Room joined: ${RoomId}`);

          if (user.has(recevedID)) {
            const Sockets = user.get(recevedID) 
            Sockets.forEach((SocketId: any) => {
              const Socket = this.io.sockets.sockets.get(SocketId);
              if (Socket) {
                Socket.join(RoomId);
                Socket.emit("room_created", { roomId: RoomId });
              }
            });
          }

          socket.emit("room_created", { roomId: RoomId });
        } catch (error: any) {
          socket.emit("error_message", "Failed to handle room");
        }
      });

      socket.on("send_message", (data) => {
        const { roomId, message } = data;

        if (!roomId || !message) {
          return new BadRequestException("failed to send message");
        }

        socket.to(roomId.toString()).emit("chat message", {
          user: currentUserId,
          message: message,
        });
      });

      socket.on("disconnect", () => {
        console.log(`Disconnected: ${socket.id}`);
        user.delete(currentUserId);
      });
    });
  }
}

export default chatSocket;
