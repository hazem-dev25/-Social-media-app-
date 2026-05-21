import { HydrateOptions, Model } from "mongoose";
import { postModel } from "../../database/models/posts";
import { userModel } from "../../database/models/user.model";
import { IPost } from "../../common/interface/posts.interface";
import { DatabaseRepository } from "../../database/repository/database.repository";
import { iUser } from "../../common/interface/user.interface";
import { NotFoundException } from "../../common/exception/application.exception";
import { AuthenticatedRequest } from "../../common/interface/auth.interface";
import { PostVisibility } from "../../common/enums/posts.enums";




class postService {
    private postModel : Model<IPost>
    public postRepository : DatabaseRepository<IPost>
    public userRepository : DatabaseRepository<iUser>
    constructor(){
        this.postModel = postModel
        this.postRepository = new DatabaseRepository(this.postModel)
        this.userRepository = new DatabaseRepository(userModel)
    }

    async createPost(req: AuthenticatedRequest): Promise<IPost>{

        if(!req.body && !req.files?.length){
            throw new NotFoundException("Post content or attachments are required")
        }

        const authId = req.userid as string
        const user = await this.userRepository.findOne({userid: authId}) 
    
       if (!user) {
          throw new NotFoundException("User not found")
      }

    req.body.userid = user._id
        
        let {tags} :{ tags?: string[] | undefined} = req.body

        
        if(tags){
            tags = Array.from(new Set(tags)) // remove duplicate tags
            const userTags = await Promise.all(tags.map((id)=>{
                return this.userRepository.findById(id)
            }))
            
            if(userTags.includes(null)){
                throw new NotFoundException("One or more tags are invalid")
            }

            req.body.tags = tags
        }
             if (req.files && (req.files as Express.Multer.File[]).length) {
        const attachments = req.files as Express.Multer.File[]
        req.body.attachments = attachments.map(file => file.path.replace(/\\/g, '/')) 
    }
            
        let post = await this.postRepository.create(req.body)

        return post

    }


    async getPosts(userid: string): Promise<IPost[]>{
        let user = await this.userRepository.findById(userid).select("friends")
        if(!user){
            throw new NotFoundException("User not found")
        }
        const friendIds = user?.friends || []
        const posts  = await this.postRepository.find({
            $or:[{
                visibility: PostVisibility.public ,
                userid : {$in: [userid , ...(user?.friends || [])]},
                
            },
            {
                userid: userid
            }, 
            {
                visibility: PostVisibility.public ,
                tags: userid
            },
            {
                visibility: PostVisibility.friends ,
                userid : {$in: friendIds}

            },
            {
               visibility: PostVisibility.friends ,
               tags: userid,
               userid : {$in: friendIds}
            } ,
        {
                visibility: PostVisibility.private ,
                userid : userid
        }]
        })
        if(!posts.length){
            throw new NotFoundException("No posts found")
        }
        return posts
    }
}

export default new postService()