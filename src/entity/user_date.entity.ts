import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "user_dates"})
export class UserDate extends Model<UserDate> {
    @ApiProperty({ example: 1, description: "Unical ID" })
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    })
    id: number
    
    @ApiProperty({example: 2, description: 'User id of Specialist, connection with users table'})
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    user_id: number
    
    @ApiProperty({example: 24, description: "Age of user"})
    @Column({
        type: DataType.SMALLINT
    })
    age: number
    
    @ApiProperty({example: 175.3, description: "Height of user"})
    @Column({
        type: DataType.FLOAT
    })
    height: number

    @ApiProperty({example: 76.4, description: "Weight of user"})
    @Column({
        type: DataType.FLOAT
    })
    weight: number
 }
