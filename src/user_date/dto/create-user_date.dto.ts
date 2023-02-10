import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class CreateUserDateDto {
    @ApiProperty({ example: 24, description: "Age of user" })
    @IsNumber()
    readonly age: number

    @ApiProperty({ example: 175.3, description: "Height of user" })
    @IsNumber()
    readonly height: number

    @ApiProperty({ example: 76.4, description: "Weight of user" })
    @IsNumber()
    readonly weight: number
}
