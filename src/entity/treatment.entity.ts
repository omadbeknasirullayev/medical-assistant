import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { HospitalWard } from "./hospital-ward.entity";
import { Hospital } from "./hospital.entity";
import { Recipe } from "./recipe.entity";
import { Specialist } from "./specialist.entity";
import { User } from "./user.entity";

@Table({ tableName: 'treatment', freezeTableName: true })
export class Treatment extends Model<Treatment> {
    @ApiProperty({ example: 1, description: 'Unical ID' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({ example: "Covid19", description: "Name of treatment" })
    @Column({
        type: DataType.STRING
    })
    name: string

    @ApiProperty({ example: "PSR", description: "about treatment" })
    @Column({
        type: DataType.STRING
    })
    diagnosis_id: number

    @ApiProperty({ example: "10.26.2022", description: "Start date of treatment" })
    @Column({
        type: DataType.DATE
    })
    start_date: Date

    @ApiProperty({ example: "10.26.2022", description: "End date of treatment" })
    @Column({
        type: DataType.DATE
    })
    end_date: Date

    @ApiProperty({ example: 3, description: 'recipe_id, connection with recipa table' })
    @ForeignKey(() => Recipe)
    @Column({
        type: DataType.BIGINT,
    })
    recipe_id: number

    @ApiProperty({ example: 'Xirurg', description: 'Spec name of specialist' })
    @ForeignKey(() => Hospital)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    hospital_id: number

    @ApiProperty({ example: 3, description: 'ward, connection with hospital_ward table' })
    @ForeignKey(() => HospitalWard)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    ward_id: number

    @ApiProperty({ example: 2, description: 'spec_id, connection with specialist table' })
    @ForeignKey(() => Specialist)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    spec_id: number

    @ApiProperty({ example: 2, description: 'user_id, connection with users table' })
    @ForeignKey(() => User)
    @Column({
        type: DataType.BIGINT,
        allowNull: false
    })
    user_id: number

    // @BelongsTo(() => )

    @BelongsTo(() => Recipe)
    recipe: Recipe

    @BelongsTo(() => Hospital)
    hospital: Hospital

    @BelongsTo(() => HospitalWard)
    ward: HospitalWard

    @BelongsTo(() => Specialist)
    specialist: Specialist

    @BelongsTo(() => User)
    user: User
}
