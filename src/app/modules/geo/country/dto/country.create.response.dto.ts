import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CountryCreateResponseDto {
  @ApiProperty({ example: 'Name', description: 'Country name' })
  @Length(3, 50, {
    message: 'Name must contain [$constraint1, $constraint2] characters',
  })
  name: string;

  @ApiProperty({ example: 'AA', description: 'Country code' })
  @Length(2, 2, {
    message: 'Code must contain $constraint1 characters',
  })
  code: string;
}
