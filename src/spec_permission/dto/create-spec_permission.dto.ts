import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class CreateSpecPermissionDto {
    @ApiProperty({ example: 1, description: 'spec id, connection with spec table' })
    @IsNumber()
    readonly spec_id: number

    @ApiProperty({ example: 2, description: 'Permission id, connection with permission table' })
    @IsNumber()
    readonly permission_id: number
}
