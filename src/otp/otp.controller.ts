import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OTP } from 'src/entity';
import { CreateOtpDto } from './dto/create-otpDto';
import { VerifyOtpDto } from './dto/verifyOtpDto';
import { OtpService } from './otp.service';

@ApiTags('OTP')
@Controller('otp')
export class OtpController {
    constructor(private readonly otpService: OtpService) { }

    @ApiOperation({ summary: "Create new otp" })
    @ApiResponse({ status: 200, type: OTP })
    @Post()
    createOtp(@Body() createOtpDto: CreateOtpDto) {
        return this.otpService.newOTP(createOtpDto)
    }

    @ApiOperation({ summary: "Veryfi new otp" })
    @ApiResponse({status: 200, type: OTP})
    @Post('verifyOtp')
    verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
        return this.otpService.verify(verifyOtpDto.phone_number, verifyOtpDto.code)
    }
}
