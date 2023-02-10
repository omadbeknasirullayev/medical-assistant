import { ApiProperty } from "@nestjs/swagger"

export class ForgotPasswordDto {
    @ApiProperty({ example: "998999002559", description: "Phone Number of Admin" })
    readonly phone_number?: string

    @ApiProperty({ example: "Jhon@gmail.com", description: "Email of Admin" })
    readonly email?: string
}