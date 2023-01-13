import { Body, Controller, Post } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otpDto';
import { VerifyOtpDto } from './dto/verifyOtpDto';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
    constructor(private readonly otpService: OtpService) { }
    
    @Post()
    createOtp(@Body() createOtpDto: CreateOtpDto) {
        return this.otpService.newOTP(createOtpDto)
    }

    @Post('verifyOtp') 
    verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
        return this.otpService.verify(verifyOtpDto.phone_number, verifyOtpDto.code)
    }
}
