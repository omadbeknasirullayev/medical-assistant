import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class CreateUserPermissionDto {
    @ApiProperty({ example: 2, description: "user_id, connection with user table" })
    @IsNumber()
    readonly user_id: number

    @ApiProperty({ example: 2, description: "permission id, connection with permission table" })
    @IsNumber()
    readonly permission_id: number
}
