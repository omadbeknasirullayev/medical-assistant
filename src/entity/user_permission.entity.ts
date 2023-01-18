import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Permission } from "./permission.entity";

@Table({tableName: 'user_permission', freezeTableName: true})
export class UserPermission extends Model<UserPermission> {
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
    user_id: number

    @ForeignKey(() => Permission)
    @Column({
        type: DataType.SMALLINT
    })
    permission_id: number

    @BelongsTo(() => Permission)
    permission: Permission

}
