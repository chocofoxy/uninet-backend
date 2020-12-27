import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateUserDto {

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(8,32)
    cin: string
    
    @ApiProperty()
    @IsNotEmpty()
    lastname: string

    @ApiProperty()
    @IsNotEmpty()
    firstname: string

    @ApiProperty()
    @IsNotEmpty()
    @Length(8,32)
    password: string

}
