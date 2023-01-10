import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUppercase } from "class-validator";

export class CreateRegionDto {
    @ApiProperty({example: "Toshkent", description: "Region name"})
    @IsString({message: "region name must be string"})
    @IsUppercase({message: "Region name must be uppercase"})
    name: string
}