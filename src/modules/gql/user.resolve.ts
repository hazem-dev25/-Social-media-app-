import { userModel } from "../../database/models/user.model";

export const getAllUsersResolve = {
  resolve: async () => {
    let user = await userModel.find();
    if (!user || user.length === 0) {
      throw new Error("the users is not found");
    }
    return user;
  },
};

export const getUserByIdResolve = {
  resolve: async (_: any, args: any) => {
    let user = await userModel.findById(args.userid);
    if (!user) {
      throw new Error("the user is not found");
    }
    return user;
  },
};

export const updateUserResolve = {
  resolve: async (_: any, args: any) => {
    let user = await userModel.findByIdAndUpdate(
      args.userid,
      { name: args.name, age: args.age },
      { new: true },
    );
    if (!user) {
      throw new Error("the user is not found");
    }
    return user;
  },
};

export const deleteUserResolve = {
  resolve: async (_: any, args: any) => {
    let user = await userModel.findByIdAndDelete(args.userid);
    if (!user) {
      throw new Error("the user is not found");
    }
    return user;
  },
};
