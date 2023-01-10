import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDistrictDto {
    @ApiProperty({example: "Chilonzor", description: "District's name"})
    @IsNotEmpty({message: "Cannot be empty"})
    @IsString({message: "District name must be string"})
    name: string

    @ApiProperty({example: "1", description: "region id, connection with regin table"})
    @IsNotEmpty()
    @IsNumber()
    region_id: number
}