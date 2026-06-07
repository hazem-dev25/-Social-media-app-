import {
  deleteUserType,
  getAllUsersType,
  getUserByIdType,
  updateUserType,
} from "./user.type";
import {
  deleteUserResolve,
  getAllUsersResolve,
  getUserByIdResolve,
  updateUserResolve,
} from "./user.resolve";
import { argsDeleteUser, argsUpdateUser, argsUserById } from "./users.args";

class userQuery {
  constructor() {}

  getAllusers() {
    return {
      getAllUsers: {
        type: getAllUsersType,
        args: {},
        resolve: getAllUsersResolve.resolve,
      },
    };
  }

  getUserById() {
    return {
      getUserById: {
        type: getUserByIdType,
        args: argsUserById,
        resolve: getUserByIdResolve.resolve,
      },
    };
  }

  updateUser() {
    return {
      updateUser: {
        type: updateUserType,
        args: argsUpdateUser,
        resolve: updateUserResolve.resolve,
      },
    };
  }

  deleteUser() {
    return {
      deleteUser: {
        type: deleteUserType,
        args: argsDeleteUser,
        resolve: deleteUserResolve.resolve,
      },
    };
  }
}
export default new userQuery();
