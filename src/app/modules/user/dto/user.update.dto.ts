import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({ example: 'John Doe', description: 'Name' })
  @Length(4, 50, {
    message: 'Name must contain [$constraint1, $constraint2] characters',
  })
  name: string;
}
