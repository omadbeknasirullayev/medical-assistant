import { IsEmail, IsString } from "class-validator";
import { Model } from "sequelize-typescript";

export class Registration{
    @IsEmail()
    phone_number: string

    @IsString()
    password: string
}