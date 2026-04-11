import nodemailer from 'nodemailer'
import { APP_EMAIL , APP_PASSWORD } from '../../../config/env.service'



class EmailService {
    public nodemailer: nodemailer.Transporter
    constructor() {
        this.nodemailer = nodemailer.createTransport({
           service: "gmail" ,
           auth: {
            user: APP_EMAIL,
            pass: APP_PASSWORD
           }
})}
    async sendEmail(to: string, subject: string, html: string) {
        try {
            await this.nodemailer.sendMail({
                from: 'Hazem_Adel<' + APP_EMAIL + '>',
                to,
                subject,
                html
            })
        } catch (error) {
            console.error("Error sending email:", error);
        }
}}


export default new EmailService()