import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '../../user/roles/role.enum';
@Exclude()
export class UserRegisterResponseDto {
  @ApiProperty({ example: 'mail@mail.com', description: 'Username' })
  @Expose()
  email: string;

  @ApiProperty({ example: 'admin|user', description: 'User role' })
  role: UserRole;
}
