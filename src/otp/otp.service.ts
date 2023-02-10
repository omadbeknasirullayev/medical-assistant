import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import * as otpGenerator from 'otp-generator'
import { InjectModel } from '@nestjs/sequelize';
import { OTP, User } from 'src/entity';
import { CreateOtpDto } from './dto/create-otpDto';

const { v4: uuidv4 } = require('uuid')


function AddMinutesToDate(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000)
}

@Injectable()
export class OtpService {
    constructor(@InjectModel(OTP) private otpRepository: typeof OTP, @InjectModel(User) private readonly userRepository: typeof User) { }

    async newOTP(createOtpDto: CreateOtpDto) {
        const phone = await this.otpRepository.findOne({ where: { phone_number: createOtpDto.phone_number } })
        console.log(phone)
        if (phone) {
            throw new HttpException("this phone number already send code", HttpStatus.CONFLICT)
        }

        // Generate OTP
        const otp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })

        const now = new Date()
        const expiration_time = AddMinutesToDate(now, 5)

        const newOtp = await this.otpRepository.create({ id: uuidv4(), ...createOtpDto, otp, expiration_time })

        const details = {
            timesamp: now,
            check: createOtpDto.phone_number,
            success: true,
            message: "OTP send to user",
            otp_id: newOtp.dataValues.id
        }
        return details
    }

    async verify(phone_number: string, code: string) {
        const check = await this.otpRepository.findOne({ where: { otp: code } })
        if (!check) {
            throw new NotFoundException("Invalid code1")
        }

        if (check.verified == true) {
            throw new HttpException("OTP Already Used", HttpStatus.BAD_REQUEST)
        }

        if (check.phone_number != phone_number) {
            throw new NotFoundException("Invalid code2")
        }

        let now = new Date()
        if (check.expiration_time.getTime() >= now.getTime()) {
            throw new NotFoundException("OTP Expired")
        }

        await this.otpRepository.update({ verified: true }, { where: { id: check.id } });

        const userResult = await this.userRepository.findOne({ where: { phone_number: check.phone_number } });

        if (!userResult) {
            const response = {
                Status: "Success",
                Details: "new",
                Check: check,
            };
            return response
        } else {
            const response = {
                Status: "Success",
                Details: "old",
                Check: check,
                ClientName: userResult.dataValues.fname,
            };
            return response
        }
    }

    async deleteOtp(phone_number: string) {
        const otp = await this.otpRepository.findOne({ where: { phone_number } })
        if (!otp) {
            throw new NotFoundException("otp not found")
        }
        return await this.otpRepository.destroy({where: {id: otp.id}})
    }
}
