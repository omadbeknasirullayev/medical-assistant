import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNumber, IsString } from "class-validator"

export class CreateHospitalWardDto {
    @ApiProperty({example: 'urologiya', description: 'Name of hospital ward'})
    @IsString()
    readonly name: string

    @ApiProperty({example: '903256894', description: 'Phone number of hopital wards'})
    @IsString()
    readonly phone_number: string

    @ApiProperty({example: 'urologiya@gmail.com', description: 'Email of hospital ward'})
    @IsEmail()
    readonly email: string

    @ApiProperty({example: 1, description: 'Hospital id, connection with hospital table'})
    @IsNumber()
    readonly hospital_id: number

    @ApiProperty({example: 1, description: 'Spec id, conection with spec table'})
    @IsNumber()
    readonly spec_id: number
}
