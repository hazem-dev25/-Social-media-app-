import mongoose from "mongoose";

const createRoomSchema = new mongoose.Schema({
  users: [
    {
      type: String,
      required: true,
      ref: "Auth",
    },
  ],

  describetion: {
    type: String,
  },
});

export const createRoomModel = mongoose.model("room", createRoomSchema);
