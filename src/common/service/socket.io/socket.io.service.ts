import { authModel } from "../../../database/models/auth.model";
import { messageModel } from "../../../database/models/message.socket";
import { createRoomModel } from "../../../database/models/socket.io";

class SocketService {
  constructor() {}

  async createRoom(data: any, currentUserId: string, recevedID: string) {
    const existingRoom = await createRoomModel.findOne({
      users: { $all: [currentUserId, recevedID], $size: 2 },
    });

    if (existingRoom) {
      console.log(`Room found: ${existingRoom._id}`);
      return existingRoom._id;
    }

    const newRoom = await createRoomModel.create({
      describetion: data.describetion || "1v1 Chat",
      users: [currentUserId, recevedID],
    });

    console.log(`Room created: ${newRoom._id}`);
    return newRoom._id;
  }

  async message(data: any, currentUserID: string, targetUserId: string) {
    let { message, RoomId } = data;

    if (!message || !RoomId) {
      throw new Error("error it should to be a room")
    }

    let Message = await messageModel.create({message, RoomId ,
      senders: [currentUserID, targetUserId],
    });

     await authModel.findByIdAndUpdate(currentUserID, {
      $push: { messages: Message._id },
    });
    await authModel.findByIdAndUpdate(targetUserId, {
      $push: { messages: Message._id },
    });

    return Message
  }
}

export const socketLogic= new SocketService();
