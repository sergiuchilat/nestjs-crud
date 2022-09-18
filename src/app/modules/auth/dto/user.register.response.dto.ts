import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class UserRegisterResponseDto {
  @ApiProperty({
    example: 'mail@mail.com',
    description: 'Email',
  })
  @Expose()
  @IsString()
  email: string;
}
