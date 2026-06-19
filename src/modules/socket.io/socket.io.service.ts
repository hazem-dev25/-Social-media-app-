import { BadRequestException, NotFoundException } from "../../common/exception/application.exception";
import { iAuth } from "../../common/interface/auth.interface";
import { authModel } from "../../database/models/auth.model";
import { DatabaseRepository } from "../../database/repository/database.repository";

class SocketServeice {
  rebo: DatabaseRepository<iAuth>;
  constructor() {
    this.rebo = new DatabaseRepository(authModel);
  }

  async roomId(id: string): Promise<iAuth> {
    let auth = await this.rebo.findById(id).populate("Room");
    if (!auth) {
      throw new NotFoundException("sorry user is not found");
    }
    if(auth.role == 'admin'){
        throw new BadRequestException('sorry you are not User')
    }
    return auth
  }

  async messages(id: string): Promise<iAuth> {
    console.log(id , "from service")
    let auth = await authModel.findById(id).populate('messages')
    if (!auth) {
      throw new NotFoundException("sorry auth is not found");
    }
    if(auth.role == 'admin'){
        throw new BadRequestException('sorry you are not User')
    }
    return auth
  }
}

export default new SocketServeice();
