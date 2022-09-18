import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class UserLoginDto {
  @ApiProperty({ example: 'username', description: 'Username' })
  @Length(3, 50, {
    message: 'Username must contain [$constraint1, $constraint2] characters',
  })
  username: string;

  @ApiProperty({ example: 'password', description: 'Password' })
  @Length(8, 50, {
    message: 'Name must contain [$constraint1, $constraint2] characters',
  })
  password: string;
}
