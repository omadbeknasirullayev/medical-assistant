import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Diagnosis } from "./diagnosis.entity";
import { District } from "./district.entity";

interface CreateUserAttr {
    phone_number: string
    password: string
}

@Table({tableName: 'users', freezeTableName: true})
export class User extends Model<User, CreateUserAttr> {
    @ApiProperty({example: 1, description: 'Unical ID'})
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 'Aliyev', description: 'First name of User'})
    @Column({
        type: DataType.STRING(100),
    })
    fname: string

    @ApiProperty({example: 'Dilshod', description: 'Last name of user'})
    @Column({
        type: DataType.STRING(100)
    })
    lname: string

    @ApiProperty({ example: 'dilshod@gmail.com', description: 'Email of user' })
    @Column({
        type: DataType.STRING(100),
        unique: true
    })
    email: string
    
    @ApiProperty({example: '999002559', description: 'Phone Number of user'})
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true
    })
    phone_number: string

    @ApiProperty({ example: 'password', description: 'Password of user' })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string

    @ApiProperty({example: "20.03.1995", description: 'Birthday of user'})
    @Column({
        type: DataType.DATE
    })
    date_bitrh: Date

    @ApiProperty({example: "5", description: 'District of user, connection with district table'})
    @ForeignKey(() => District) 
    @Column({
        type: DataType.SMALLINT
    })
    district_id: number
    
    @BelongsTo(() => District)
    district: District
    @ApiProperty({example: "file", description: 'Photo of user'})
    @Column({
        type: DataType.STRING
    })
    photo: string

    @ApiProperty({example: '1', description: 'Blood type of user'})
    @Column({
        type: DataType.STRING
    })
    blood_type: string

    @ApiProperty({example: 1, description: 'Type of user 1 user 2 specialist'})
    @Column({
        type: DataType.SMALLINT,
        defaultValue: 1
    })
    user_type: number

    @ApiProperty({example: "token", description: 'Token of user'})
    @Column({
        type: DataType.STRING,
    })
    token: string

    @ApiProperty({example: false, description: 'User active or not'})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean

    @HasMany(() => Diagnosis)
    diagnosis: Diagnosis

}