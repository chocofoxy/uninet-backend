import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Min } from 'class-validator';

export class CreateGroupDto {

    @ApiProperty()
    @IsNotEmpty()
    classId: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(2,32)
    name: string
    

}
