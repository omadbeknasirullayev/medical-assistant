import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class CreateHospitalWardSpecDto {
    @ApiProperty({ example: 2, description: 'ward id, connection with hospital_ward table' })
    @IsNumber()
    readonly ward_id: number

    @ApiProperty({ example: 2, description: 'User id of Specialist, connection with users table' })
    @IsNumber()
    readonly spec_id: number
}
