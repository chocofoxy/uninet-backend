import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePostDto {
    
    @ApiProperty()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    media: any;

}