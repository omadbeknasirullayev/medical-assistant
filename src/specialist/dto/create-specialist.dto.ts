import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString } from "class-validator"

export class CreateSpecialistDto {
    @ApiProperty({example: 'Aliyev', description: 'First name of Specialist'})
    @IsString()
    readonly fname: string

    @ApiProperty({example: 'Dilshod', description: 'Last name of specialist'})
    @IsString()
    readonly lname: string

    @ApiProperty({ example: 'dilshod@gmail.com', description: 'Email of specialist' })
    @IsEmail()
    readonly email: string

    @ApiProperty({ example: 'password', description: 'Password of specialist' })
    @IsString()
    readonly password: string

    @ApiProperty({example: 'Xirurg', description: 'Spec name of specialist'})
    @IsString()
    readonly spec_name: string

    @ApiProperty({example: "file", description: 'License of specialist'})
    @IsString()
    readonly license: string

    @ApiProperty({example: '10 yil', description: 'Experience of specialist'})
    @IsString()
    readonly experience: string
}
