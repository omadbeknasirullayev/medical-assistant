import { ApiProperty } from "@nestjs/swagger";

export class CreateOtpDto {
    @ApiProperty({example: '990999882559', description: 'phone number of user'})
    readonly phone_number: string
}