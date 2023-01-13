import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.entity";

@Table({ tableName: 'specialist', freezeTableName: true })
export class Specialist extends Model<Specialist> {
    @ApiProperty({ example: 1, description: 'Unical ID' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({ example: 2, description: 'User id of Specialist, connection with users table' })
    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    user_id: number

    @ApiProperty({ example: 'Xirurg', description: 'Spec name of specialist' })
    @Column({
        type: DataType.STRING()
    })
    spec_name: string

    @ApiProperty({ example: "file name", description: 'License of specialist' })
    @Column({
        type: DataType.STRING(100)
    })
    license: string

    @ApiProperty({ example: '10 yil', description: 'Experience of specialist' })
    @Column({
        type: DataType.STRING
    })
    experience: string

    @ApiProperty({ example: false, description: 'Specialist active or not' })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean

    @BelongsTo(() => User)
    user: User
}