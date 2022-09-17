import { ApiProperty } from '@nestjs/swagger';

export class CountryCreateDto {
  @ApiProperty({ example: 'Name', description: 'Country name' })
  name: string;

  @ApiProperty({ example: 'AA', description: 'Country code' })
  code: string;
}
