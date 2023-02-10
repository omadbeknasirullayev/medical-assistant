import { IsString } from "class-validator";

export class Login {
    @IsString()
    phone_number: string;

    @IsString()
    password: string;
}