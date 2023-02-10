import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class VerifyOtpDto {
    @ApiProperty({ example: '998999002559', description: 'phone number of user' })
    @IsNumber()
    readonly phone_number: string

    @ApiProperty({ example: 2345, description: 'code for registration' })
    @IsNumber()
    code: string
}