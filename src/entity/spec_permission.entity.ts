import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Permission } from "./permission.entity";

@Table({tableName: 'spec_permission', freezeTableName: true})
export class SpecPermission extends Model<SpecPermission> {
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    })
    id: number

    @Column({
        type: DataType.BIGINT
    })
    spec_id: number

    @ForeignKey(() => Permission)
    @Column({
        type: DataType.SMALLINT
    })
    permission_id: number

    @BelongsTo(() => Permission)
    permission: Permission
}
