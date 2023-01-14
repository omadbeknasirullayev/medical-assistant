import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateRecipeDto {

    @ApiProperty({ example: "Covid19", description: "about recipe" })
    @IsString()
    readonly name: string

    @ApiProperty({ example: "ampitsilin 3", description: "List of recipes" })
    @IsString()
    readonly description: string
}
