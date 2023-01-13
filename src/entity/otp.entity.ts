import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'otp', timestamps: false })
export class OTP extends Model<OTP> {
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    id: string

    @Column({
        type: DataType.STRING
    })
    phone_number: string

    @Column({
        type: DataType.STRING(100)
    })
    otp: string

    @Column({
        type: DataType.DATE
    })
    expiration_time: Date

    @Column({
        type: DataType.BOOLEAN
    })
    verified: boolean
}