import { HydratedDocument, Model } from "mongoose";
import { Icomments } from "../../common/interface/conmments.interface";
import { commentModel } from "../../database/models/comments.model";
import { IPost } from "../../common/interface/posts.interface";
import { iUser } from "../../common/interface/user.interface";
import { DatabaseRepository } from "../../database/repository/database.repository";
import { postModel } from "../../database/models/posts";
import { userModel } from "../../database/models/user.model";
import {
  BadRequestException,
  NotFoundException,
} from "../../common/exception/application.exception";
import { iAuth } from "../../common/interface/auth.interface";
import { authModel } from "../../database/models/auth.model";

class commentsService {
  public commentmodel: Model<Icomments>;
  public authRepository: DatabaseRepository<iAuth>;
  public postRepository: DatabaseRepository<IPost>;
  public commentRepository: DatabaseRepository<Icomments>;
  public userRepository: DatabaseRepository<iUser>;
  constructor() {
    this.commentmodel = commentModel;
    this.authRepository = new DatabaseRepository(authModel);
    this.postRepository = new DatabaseRepository(postModel);
    this.userRepository = new DatabaseRepository(userModel);
    this.commentRepository = new DatabaseRepository(this.commentmodel);
  }

  async addcomment(data: any): Promise<Icomments> {
    let { postid, userid }: { postid: string; userid: string } = data;

    let user = await this.userRepository.findById(userid);

    if (!user) {
      throw new BadRequestException("user is not found");
    }

    let post = await this.postRepository.findById(postid);

    if (!post) {
      throw new NotFoundException("Post Is Not Exist");
    } else {
      let comment = await this.commentRepository.create(data);
      return comment;
    }
  }

  async getAllComments() {
    let getComment = await this.commentRepository.find({});
    if (!getComment) {
      throw new BadRequestException("there is no comments yet");
    }
    return getComment;
  }

  async getCommentsbyPost(commentID: string) {
    let postC = await this.commentRepository
      .findById(commentID)
      .populate("postid");
    if (!postC) {
      throw new BadRequestException("this comment is not Exist");
    }
    return postC;
  }

  async updateComment(
    authid: string,
    commentid: string,
    data: any,
  ): Promise<HydratedDocument<Icomments>> {
    let { text, mention }: { text: string; mention: string } = data;

    let auth = await this.authRepository.findById(authid);

    if (!auth) {
      throw new NotFoundException("the auth is not found");
    }

    if (auth.role == "admin") {
      throw new BadRequestException("user only can update comment");
    } else {
      let comment = await this.commentRepository.findByIdAndUpdate(
        commentid,
        data,
      );
      if (!comment) {
        throw new NotFoundException("comment is not exist");
      }
      return comment;
    }
  }

  async deleteComment(
    authid: string,
    commentid: string,
  ): Promise<HydratedDocument<Icomments>> {
    let auth = await this.authRepository.findById(authid);

    if (!auth) {
      throw new NotFoundException("the auth is not exist");
    }

    if (auth.role == "admin") {
      throw new BadRequestException("sorry user only can delete comment");
    } else {
      let comment = await this.commentRepository.findByIdAndDelete(commentid);
      if (!comment) {
        throw new NotFoundException("comment is not exist");
      }
      return comment;
    }
  }
}

export default new commentsService();
