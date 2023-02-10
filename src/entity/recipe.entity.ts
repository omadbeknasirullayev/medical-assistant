import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({tableName: 'recipe', freezeTableName: true})
export class Recipe extends Model<Recipe> {
    @ApiProperty({ example: 1, description: 'Unical ID' })
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @ApiProperty({ example: "Covid19", description: "about recipe" })
    @Column({
        type: DataType.STRING
    })
    name: string

    @ApiProperty({ example: "ampitsilin 3", description: "List of recipes" })
    @Column({
        type: DataType.STRING
    })
    description: string
 }
