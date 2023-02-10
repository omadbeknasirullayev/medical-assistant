import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class CreateAdminDto {
    @ApiProperty({ example: 'Aliyev', description: 'First name of Admin' })
    @IsString()
    readonly fname: string

    @ApiProperty({ example: 'Dilshod', description: 'Last name of Admin' })
    @IsString()
    readonly lname: string

    @ApiProperty({ example: 'dilshod@gmail.com', description: 'Email of Admin' })
    @IsEmail()
    readonly email: string

    @ApiProperty({ example: '999002559', description: 'Phone Number of Admin' })
    @IsString()
    readonly phone_number: string

    @ApiProperty({ example: 'password', description: 'Password of Admin' })
    @IsString()
    readonly password: string
}
