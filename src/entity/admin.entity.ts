import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Hospital } from "./hospital.entity";

@Table({tableName: "admins"})
export class Admin extends Model<Admin> {
    @ApiProperty({example: 1, description: 'Unical ID'})
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({example: 'Aliyev', description: 'First name of Admin'})
    @Column({
        type: DataType.STRING(100),
    })
    fname: string

    @ApiProperty({example: 'Dilshod', description: 'Last name of Admin'})
    @Column({
        type: DataType.STRING(100)
    })
    lname: string

    @ApiProperty({ example: 'dilshod@gmail.com', description: 'Email of Admin' })
    @Column({
        type: DataType.STRING(100),
        unique: true
    })
    email: string
    
    @ApiProperty({example: '999002559', description: 'Phone Number of Admin'})
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
        unique: true
    })
    phone_number: string

    @ApiProperty({ example: 'password', description: 'Password of Admin' })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password: string 

    @ApiProperty({example: "5", description: 'hospital of admin, connection with hospital table'})
    
    @Column({
        type: DataType.BIGINT
    })
    hospital_id: number

    // @BelongsTo(() => Hospital)
    // hospital: Hospital

    // bu yerda foreign key
    @Column({
        type: DataType.SMALLINT
    })
    permission_id: number

    @ApiProperty({example: "file", description: 'Photo of user'})
    @Column({
        type: DataType.STRING
    })
    photo: string

    @ApiProperty({example: false, description: 'User active or not'})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean

    @ApiProperty({example: "token", description: 'Token of Admin'})
    @Column({
        type: DataType.STRING
    })
    token: string
 }
