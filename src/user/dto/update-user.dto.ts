import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, Length, Min } from 'class-validator';

export class UpdateProfile {

    @ApiProperty()
    @IsNotEmpty()
    lastname: string

    @ApiProperty()
    @IsNotEmpty()
    firstname: string

    @ApiProperty()
    @IsNotEmpty()
    dn: Date

    @ApiProperty()
    @Length(20,500)
    bio: string

}
