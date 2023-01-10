import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: "hospital-wards"})
export class HospitalWard extends Model<HospitalWard>{
    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({example: 'urologiya', description: 'Name of hospital ward'})
    @Column({
        type: DataType.STRING(150)
    })
    name: string

    @ApiProperty({example: '903256894', description: 'Phone number of hopital wards'})
    @Column({
        type: DataType.STRING
    })
    phone_number: string

    @ApiProperty({example: 'urologiya@gmail.com', description: 'Email of hospital ward'})
    @Column({
        type: DataType.STRING(50),
        unique: true
    })
    email: string

    @ApiProperty({example: 1, description: 'Hospital id, connection with hospital table'})
    @Column({
        type: DataType.BIGINT 
    })
    hospital_id: number

    @ApiProperty({example: 1, description: 'Spec id, conection with spec table'})
    @Column({
        type: DataType.BIGINT
    })
    spec_id: number

    @ApiProperty({example: true, description: 'Hostipal ward active or not'})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean
}