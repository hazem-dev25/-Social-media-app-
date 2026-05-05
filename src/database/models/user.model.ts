import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import { Gender, provider, role } from "../../common/enums/enums.service";
import { iUser } from "../../common/interface/user.interface";
import emailService from "../../common/utils/SendEmail/email.service";



const userSchema =  new mongoose.Schema<iUser>({
    name: {
        type: String ,
        required: true
    } ,
    age: {
        type : Number ,
        required: true , 
        min: 18 ,
        max: 60
    } ,
    email: {
        type: String ,
        required: true ,
        unique: true ,
        trim: true 

    } ,
    password: {
        type: String , 
        required: true , 
        minlength: 5,
        maxlength: 20 ,
        select: false
      
    } ,
    gender: {
        type: String ,
        enum: Object.values(Gender) ,
        default: Gender.male
    } , 
    role: {
        type: String ,
        enum: Object.values(role) ,
        default: role.user
    }  ,
    provider: {
        type: String ,
        enum: Object.values(provider) ,
        default: provider.system
    } ,
    isverify: {
        type: Boolean ,
        default: false
    } ,
    view_profile: {
        type: Number ,
        default: 0
    } 
} , {
    timestamps: true
}) 

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return 
    this.password = await bcrypt.hash(this.password, 12)
})


userSchema.post("save", async function (doc) {
    await emailService.sendEmail(doc.email , "welcome to our app" , "thank you for registering in our app")
})
export const userModel = mongoose.model('User' , userSchema)