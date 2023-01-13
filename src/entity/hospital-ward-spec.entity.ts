import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { HospitalWard } from "./hospital-ward.entity";
import { Specialist } from "./specialist.entity";

@Table({tableName: "Hospital_ward_spec"})
export class HospitalWardSpec extends Model<HospitalWardSpec> {
    @ApiProperty({ example: 1, description: 'Unical ID' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({ example: 2, description: 'ward id, connection with hospital_ward table' })
    @ForeignKey(() => HospitalWard)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    ward_id: number

    @ApiProperty({ example: 2, description: 'User id of Specialist, connection with users table' })
    @ForeignKey(() => Specialist)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    spec_id: number

    @ApiProperty({ example: false, description: 'Specialist active or not this hospital' })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean

    @BelongsTo(() => HospitalWard)
    wards: HospitalWard

    @BelongsTo(() => Specialist)
    specialist: Specialist
}
