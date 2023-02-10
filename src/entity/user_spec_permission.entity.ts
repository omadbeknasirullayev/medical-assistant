import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "User_spec_permission"})
export class UserSpecPermission extends Model<UserSpecPermission> {
    @ApiProperty({example: 1, description: "Unucal ID"})
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 2, description: "spec id, connection with specialist table"})
    @Column({
        type: DataType.BIGINT
    })
    spec_id: number

    @ApiProperty({example: 2, description: "user id, connection with users table"})
    @Column({
        type: DataType.BIGINT
    })
    user_id: number

    @ApiProperty({example: 2, description: "permission id, connection with permission table"})
    @Column({
        type: DataType.BIGINT
    })
    permission_id: number

    @ApiProperty({example: 45, description: "experition time"})
    @Column({
        type: DataType.STRING
    })
    expire_time: string
}
