import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Admin } from "./admin.entity";
import { Permission } from "./permission.entity";

@Table({ tableName: 'admin_permission', freezeTableName: true })
export class AdminPermission extends Model<AdminPermission> {
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    })
    id: number

    @ForeignKey(() => Admin)
    @Column({
        type: DataType.BIGINT
    })
    admin_id: number

    @ForeignKey(() => Permission)
    @Column({
        type: DataType.SMALLINT
    })
    permission_id: number

    @BelongsTo(() => Permission)
    permission: Permission

    // @BelongsTo(() => Admin) 
    // admin: Admin
}
