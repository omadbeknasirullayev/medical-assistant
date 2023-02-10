import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsDate, IsEmail, IsNumber, IsString } from "class-validator"
import { Registration } from "./registration.dto"

export class CreateUserInfoDto {
    @ApiProperty({example: 'Aliyev', description: 'First name of User'})
    // @IsString()
    fname?: string

    @ApiProperty({example: 'Dilshod', description: 'Last name of user'})
    // @IsString()
    lname?: string

    @ApiProperty({ example: 'dilshod@gmail.com', description: 'Email of user' })
    // @IsEmail()
    email: string

    @ApiProperty({example: "20.03.1995", description: 'Birthday of user'})
    // @IsDate()
    date_birth: Date

    @ApiProperty({example: "Chilonzor", description: 'District of user'})
    // @IsNumber()
    district_id: number
}
