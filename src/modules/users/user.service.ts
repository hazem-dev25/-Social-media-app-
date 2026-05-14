import { userModel } from "../../database/models/user.model";
import { iUser } from "../../common/interface/user.interface";
import { DatabaseRepository } from "../../database/repository/database.repository";
import { HydratedDocument, Model } from "mongoose";
import {
  BadRequestException,
  NotFoundException,
} from "../../common/exception/application.exception";
import redisService from "../../common/service/redis.service";
import { fireBaseSendNotification} from "../../common/service/firebase.notifcation";

class UserService {
  private userRepository: DatabaseRepository<iUser>;
  private model: Model<iUser>;
  constructor() {
    this.model = userModel;
    this.userRepository = new DatabaseRepository<iUser>(this.model);
  }

  async getUserProfile(id: string): Promise<HydratedDocument<iUser> | null> {
    await redisService.get(`userProfile:${id}`);
    let user = await this.userRepository.findById(id, "-password");
    if (!user) {
      throw new NotFoundException("user not found");
    }
    await redisService.set({
      key: `userProfile:${id}`,
      value: JSON.stringify(user),
      ttl: 3600,
    });
    return user;
  }

  async createUser(
    data: Partial<iUser>,
    file?: Express.Multer.File,
  ): Promise<iUser> {
    {
      let fileSize: number | undefined = file?.size;

      if (fileSize && fileSize > 10000000) {
        // 10MB limit
        throw new BadRequestException("file size exceeds the limit");
      }
      let filePath = file?.path;

      let createdUser: any = await this.userRepository.create(data);
      if (filePath) {
        filePath = filePath.replace(/\\/g, "/");
        createdUser.image = filePath;
      }
      await createdUser.save();
      return createdUser;
    }
  }

  async create_profile_url(username: string, url: string): Promise<string> {
    let user = await this.userRepository.findOne({ username: username });
    if (!user) {
      throw new NotFoundException("user not found");
    }
    let Url = `${url}${user.username}/${user._id}`;
    return Url;
  }

  async sendNotification(userId: string, token: string) {
    let user = await this.userRepository.findByIdAndUpdate(userId, { $addToSet: { Tokens: token } });
    if (!user) {
      throw new NotFoundException("user not found");
    }
     await fireBaseSendNotification(userId , {
    title: "Facebook",
    body: "Hi bro, tamer is here",
  })
    return user
  }
 
}
export default new UserService();
