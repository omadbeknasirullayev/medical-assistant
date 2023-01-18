import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class CreateAdminPermissionDto {
    @ApiProperty({ example: 2, description: 'admin id, connection with admin table' })
    @IsNumber()
    readonly admin_id: number

    @ApiProperty({ example: 1, description: 'permission id, connection with permission table' })
    @IsNumber()
    readonly permission_id: number
}
