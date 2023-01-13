import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendMail(email: string, name: string) {
        console.log(email)
        console.log(process.env.SMTP_PASSWORD)
        await this.mailerService.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Activation',
            context: {
                name: name
            }
        })
    }
}