import { createRoomModel } from "../../../database/models/socket.io";
import { BadRequestException } from "../../exception/application.exception";

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
}

export const room = new SocketService();
