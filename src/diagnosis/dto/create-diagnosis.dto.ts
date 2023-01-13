import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNumber, IsString } from "class-validator"

export class CreateDiagnosisDto {
    @ApiProperty({ example: "Shamollash", description: "Name of diagnosis" })
    @IsString()
    readonly name: string

    @ApiProperty({ example: "about diagnosis", description: "about diagnosis" })
    @IsString()
    readonly description: string

    @ApiProperty({ example: "10.26.2022", description: "Date of diagnosis" })
    @IsDate()
    readonly date: Date

    @ApiProperty({ example: 2, description: 'User id of Diagnosis, connection with users table' })
    @IsNumber()
    readonly user_id: number

    @ApiProperty({ example: 'Xirurg', description: 'Spec name of specialist' })
    @IsNumber()
    readonly spec_id: number
}
