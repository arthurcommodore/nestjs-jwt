import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { RegexHelper } from "./helpers/regex.helper";

export class CreateUserDto {

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(RegexHelper.password)
    password: string;
}