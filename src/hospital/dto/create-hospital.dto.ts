import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateHospitalDto {

    @ApiProperty({example: "Holis", description: "Hospital name"})
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @ApiProperty({example: "holis@gmail.com", description: "Email of hospital"})
    @IsEmail()
    readonly email: string

    @ApiProperty({example: '999002559', description: 'Phone number of hospital'})
    @IsNotEmpty()
    @IsString()
    readonly phone_number: string

    @ApiProperty({example: 'Street 46', description: 'Address of hospital'})
    @IsString()
    readonly address: string

    @ApiProperty({example: 'https://1jdbkl879108', description: 'Location of hospital'})
   @IsString()
    readonly location: string

    @ApiProperty({example: 1, description: 'Region id, connection with region table'})
    @IsNumber()
    readonly region_id: number

    @ApiProperty({example: 1, description: 'District id, connection with region table'})
    @IsNumber()
    readonly district_id: number


    @ApiProperty({example: "Very well hospital", description: 'Describe hospital'})
    @IsString()
    readonly description: string
}
