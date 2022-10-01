import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CompanyCreateDto {
  @ApiProperty({ example: 'Name', description: 'Company name' })
  @Length(3, 50, {
    message: 'Name must contain [$constraint1, $constraint2] characters',
  })
  name: string;

  @ApiProperty({ example: 'Main street', description: 'Company street' })
  @Length(5, 255, {
    message: 'Address must contain $constraint1 characters',
  })
  address: string;
}
