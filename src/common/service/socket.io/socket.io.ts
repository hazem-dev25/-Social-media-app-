import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { map } from "zod";

class chatSocket {
  io: Server;
  constructor(io: Server) {
    this.io = io;
    this.createChatRoom();
  }

  async createChatRoom() {
    let user = new Map();
    this.io.on("connection", (socket) => {
      console.log(`✅ user connected: ${socket.id}`);
      socket.on("hi", (data) => {
        console.log(data.message);
       
      });
      let userid = jwt.decode(socket.handshake.auth.token) as {
        _id: string;
        aud: string;
        [key: string]: any;
      };
      let connection = user.set(userid._id, socket.id);
      console.log(connection);
      socket.on("hi", ({ message }) => {
        console.log(`Global message from ${userid._id}: ${message}`);

        
        socket.broadcast.emit("chat message", {
          user: userid._id,
          message: message,
        });
      });

      user.get(userid._id);
      socket.on("disconnect", (reason) => {
        console.log(`❌ user disconnected: ${socket.id}, Reason: ${reason}`);
        user.delete(userid._id);
        console.log(connection);
      });
    });
  }
}

export default chatSocket;
