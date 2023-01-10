import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'specialist', freezeTableName: true})
export class Specialist extends Model<Specialist> {
    @ApiProperty({example: 1, description: 'Unical ID'})
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 'Aliyev', description: 'First name of Specialist'})
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    fname: string

    @ApiProperty({example: 'Dilshod', description: 'Last name of specialist'})
    @Column({
        type: DataType.STRING(100)
    })
    lname: string

    @ApiProperty({ example: 'dilshod@gmail.com', description: 'Email of specialist' })
    @Column({
        type: DataType.STRING(100),
        unique: true
    })
    email: string

    @ApiProperty({ example: 'password', description: 'Password of specialist' })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string
    
    @ApiProperty({example: 'Xirurg', description: 'Spec name of specialist'})
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    spec_name: string

    @ApiProperty({example: "file", description: 'License of specialist'})
    @Column({
        type: DataType.STRING
    })
    license: string

    @ApiProperty({example: "file", description: 'Avatar of specialist'})
    @Column({
        type: DataType.STRING
    })
    photo: string

    @ApiProperty({example: '10 yil', description: 'Experience of specialist'})
    @Column({
        type: DataType.STRING
    })
    experience: string

    @ApiProperty({example: false, description: 'Specialist active or not'})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean
}
