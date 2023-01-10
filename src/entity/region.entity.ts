import { ApiOperation, ApiProperty, ApiResponse } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { District } from "./district.entity";

@Table({tableName: 'regions', timestamps: false})

export class Region extends Model<Region> {
    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.SMALLINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number
    
    @ApiProperty({example: "Toshkent", description: "Region name"})
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    name: string

    @HasMany(() => District)
    districts: District[]
}