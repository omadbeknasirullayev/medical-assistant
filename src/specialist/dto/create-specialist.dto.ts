import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNumber, IsString } from "class-validator"

export class CreateSpecialistDto {
    @ApiProperty({ example: 'Aliyev', description: 'First name of Specialist' })
    @IsNumber()
    readonly user_id: number

    @ApiProperty({ example: 'Xirurg', description: 'Spec name of specialist' })
    @IsString()
    readonly spec_name: string

    @ApiProperty({ example: '10 yil', description: 'Experience of specialist' })
    @IsString()
    readonly experience: string
}
