import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CountryCreateDto {
  @ApiProperty({ example: 'Name', description: 'Country name' })
  @Length(3, 50, {
    message: 'Name must contain [3, 50] characters',
  })
  name: string;

  @ApiProperty({ example: 'AA', description: 'Country code' })
  @Length(2, 2, {
    message: 'Code must contain 2 characters',
  })
  code: string;
}
