import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { District } from "./district.entity";
import { Region } from "./region.entity";

@Table({tableName: "hospital", freezeTableName: true})
export class Hospital extends Model<Hospital>{

    @ApiProperty({example: 1, description: "Unical ID"})
    @Column({
        type: DataType.BIGINT,
        unique: true,
        autoIncrement: true,
        primaryKey:true
    })
    id: number

    @ApiProperty({example: "Holis", description: "Hospital name"})
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string

    @ApiProperty({example: "holis@gmail.com", description: "Email of hospital"})
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string

    @ApiProperty({example: '999002559', description: 'Phone number of hospital'})
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    phone_number: string

    @ApiProperty({example: 'hospital license', description: 'License of hospital'})
    @Column({
        type: DataType.STRING
    })
    license: string

    @ApiProperty({example: 'Street 46', description: 'Address of hospital'})
    @Column({
        type: DataType.STRING
    })
    address: string

    @ApiProperty({example: 'https://1jdbkl879108', description: 'Location of hospital'})
    @Column({
        type: DataType.STRING
    })
    location: string

    @ApiProperty({example: 1, description: 'Region id, connection with region table'})
    @ForeignKey(() => Region)
    @Column({
        type: DataType.SMALLINT
    })
    region_id: number

    @ForeignKey(() => District)
    @ApiProperty({example: 1, description: 'District id, connection with region table'})
    @Column({
        type: DataType.SMALLINT
    })
    district_id: number

    @ApiProperty({example: true, description: 'Hospital active or not'})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean

    @ApiProperty({example: "Very well hospital", description: 'Describe hospital'})
    @Column({
        type: DataType.STRING
    })
    description: string

    @BelongsTo(() => Region)
    region: Region

    @BelongsTo(() => District)
    district: District

}
