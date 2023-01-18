import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePermissionDto {
    @ApiProperty({ example: 'getAll', description: 'Name of permission' })
    @IsString()
    readonly name: string
}
