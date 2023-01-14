import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNumber, IsString } from "class-validator"

export class CreateTreatmentDto {
    @ApiProperty({ example: "Covid19", description: "Name of treatment" })
    @IsString()
    readonly name: string

    @ApiProperty({ example: "about treatment", description: "about treatment" })
    @IsString()
    readonly treatment_about: string

    @ApiProperty({ example: "10.26.2022", description: "Start date of treatment" })
    @IsDate()
    readonly start_date: Date

    @ApiProperty({ example: "10.26.2022", description: "End date of treatment" })
    @IsDate()
    readonly end_date: Date

    @ApiProperty({ example: 3, description: 'recipe_id, connection with recipa table' })
    @IsNumber()
    readonly recipe_id: number

    @ApiProperty({ example: 'Xirurg', description: 'Spec name of specialist' })
    @IsNumber()
    readonly hospital_id: number

    @ApiProperty({ example: 3, description: 'ward, connection with hospital_ward table' })
    @IsNumber()
    readonly ward_id: number

    @ApiProperty({ example: 2, description: 'spec_id, connection with specialist table' })
    @IsNumber()
    readonly spec_id: number

    @ApiProperty({ example: 2, description: 'user_id, connection with users table' })
    @IsNumber()
    readonly user_id: number
}
