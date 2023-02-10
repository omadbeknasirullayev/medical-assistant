import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'permission', freezeTableName: true})
export class Permission extends Model<Permission> {
    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    })
    id: number

    @ApiProperty({example: "getAll", description: "permission name"})
    @Column({
        type: DataType.STRING
    })
    name: string
}


// 1 super admin
// 2 creator
// 3 hospital admin
// 4 activation
// 5 deleted permanently
// 6 patch by id permission
// 7 add 
// 8 get by id permission