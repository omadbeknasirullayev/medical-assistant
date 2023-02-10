import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Specialist } from "./specialist.entity";
import { User } from "./user.entity";

@Table({tableName: 'diagnosis'})
export class Diagnosis extends Model<Diagnosis>{ 
    @ApiProperty({ example: 1, description: 'Unical ID' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({ example: "Shamollash", description: "Name of diagnosis" })
    @Column({
        type: DataType.STRING
    })
    name: string

    @ApiProperty({ example: "about diagnosis", description: "about diagnosis" })
    @Column({
        type: DataType.STRING
    })
    description: string

    @ApiProperty({ example: "10.26.2022", description: "Date of diagnosis" })
    @Column({
        type: DataType.DATE
    })
    date: Date

    @ApiProperty({ example: false, description: "Diagnosis chronic or not" })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_chronic: boolean

    @ApiProperty({ example: 2, description: 'User id of Diagnosis, connection with users table' })
    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    user_id: number

    @ApiProperty({ example: 'Xirurg', description: 'Spec name of specialist' })
        @ForeignKey(() => Specialist)
    @Column({
        type: DataType.BIGINT
    })
    spec_id: number
}
