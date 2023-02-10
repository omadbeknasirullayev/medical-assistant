import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Hospital } from "./hospital.entity";
import { User } from "./user.entity";

@Table({tableName: "lobaratory_diagnosis"})
export class LobaratoryDiagnosis extends Model<LobaratoryDiagnosis> {
    @ApiProperty({ example: 1, description: 'Unical ID' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({ example: "Covid19", description: "Name of lobaratory diagnosis" })
    @Column({
        type: DataType.STRING
    })
    name: string

    @ApiProperty({ example: "PSR", description: "type lobaratory diagnosis" })
    @Column({
        type: DataType.STRING
    })
    diagnosis_type: string

    @ApiProperty({ example: "10.26.2022", description: "Date of lobaratory diagnosis" })
    @Column({
        type: DataType.DATE
    })
    date: Date

    @ApiProperty({ example: "file name", description: "File path lobaratory diagnosis" })
    @Column({
        type: DataType.STRING
    })
    diagnosis_file: string

    @ApiProperty({ example: "about diagnosis", description: "about diagnosis" })
    @Column({
        type: DataType.STRING
    })
    description: string
    
    @ApiProperty({ example: 'Xirurg', description: 'Spec name of specialist' })
        @ForeignKey(() => Hospital)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    hospital_id: number

    @ApiProperty({ example: 2, description: 'User id of Diagnosis, connection with users table' })
    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    user_id: number
}
