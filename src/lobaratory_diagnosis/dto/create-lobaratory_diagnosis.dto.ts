import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNumber, IsString } from "class-validator"

export class CreateLobaratoryDiagnosisDto {
    @ApiProperty({ example: "Covid19", description: "Name of lobaratory diagnosis" })
    @IsString()
    readonly name: string

    @ApiProperty({ example: "PSR", description: "type lobaratory diagnosis" })
    @IsString()
    readonly diagnosis_type: string

    @ApiProperty({ example: "10.26.2022", description: "Date of lobaratory diagnosis" })
    @IsDate()
    readonly date: Date

    @ApiProperty({ example: "about diagnosis", description: "about diagnosis" })
    @IsString()
    readonly description: string

    @ApiProperty({ example: 'Xirurg', description: 'Spec name of specialist' })
    @IsNumber()
    readonly hospital_id: number

    @ApiProperty({ example: 2, description: 'User id of Diagnosis, connection with users table' })
    @IsNumber()
    readonly user_id: number
}