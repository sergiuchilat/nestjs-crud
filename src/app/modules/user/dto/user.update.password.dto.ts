import { ApiProperty } from '@nestjs/swagger';
import { Length, Matches } from 'class-validator';

export class UserUpdatePasswordDto {
  @ApiProperty({ example: '34tnj3365!*bF', description: 'Password' })
  @Length(8, 50, {
    message: 'Password must contain [$constraint1, $constraint2] characters',
  })
  old_password: string;

  @ApiProperty({ example: '34tnj3365!*bF', description: 'Password' })
  @Length(8, 50, {
    message: 'Password must contain [$constraint1, $constraint2] characters',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  new_password: string;

  @ApiProperty({ example: '34tnj3365!*bF', description: 'Password' })
  @Length(8, 50, {
    message: 'Password must contain [$constraint1, $constraint2] characters',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  new_password_confirmation: string;
}
