import admin from "firebase-admin";
import fs from "fs";
import { resolve } from "path";
import { userModel } from "../../database/models/user.model";
import { NotFoundException } from "../exception/application.exception";

const serviceAccount = fs.readFileSync(resolve('socialmediaapp-5d45d-firebase-adminsdk-fbsvc-36b9a1fdbb.json'))

const newServiceAccount = JSON.parse(serviceAccount.toString())
admin.initializeApp({
  credential: admin.credential.cert(newServiceAccount),
})

export const fireBaseSendNotification = async (userId: string, data: {
    title: string,
    body: string
}) => {
    let user = await userModel.findById(userId)
    if (!user) {
        throw new NotFoundException("user not found")
    }
    if (user.Tokens && user.Tokens.length > 0) {
        for (const token of user.Tokens) {
            await admin.messaging().send({
                token: token,
                notification: {       
                    title: data.title,
                    body: data.body,
                }
            })
        }
    } 
}