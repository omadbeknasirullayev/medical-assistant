import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Region } from "./region.entity";

interface CreateDistrictAttr {
    name: string
}

@Table({tableName: 'districts', timestamps: false})
export class District extends Model<District, CreateDistrictAttr>{
    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.SMALLINT,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number
    
    @ApiProperty({example: "Chilonzor", description: "District's name"})
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    name: string
 
    @ApiProperty({example: "1", description: "region id, connection with regin table"})
    @ForeignKey(() => Region)
    @Column({
        type: DataType.SMALLINT
    })
    region_id: number

}