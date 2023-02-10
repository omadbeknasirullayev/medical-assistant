import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNumber, IsString } from "class-validator"

export class CreateUserSpecPermissionDto {
    @ApiProperty({ example: 2, description: "spec id, connection with specialist table" })
    @IsNumber()
    spec_id: number

    @ApiProperty({ example: 2, description: "user id, connection with users table" })
    @IsNumber()
    user_id: number

    @ApiProperty({ example: 2, description: "permission id, connection with permission table" })
    @IsNumber()
    permission_id: number

    @ApiProperty({ example: "45", description: "experition time" })
    @IsString()
    expire_time: string
}
