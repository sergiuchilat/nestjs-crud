import { ApiProperty } from '@nestjs/swagger';

export class CountryItemDto {
  @ApiProperty({ example: 1, description: 'Country id' })
  id: number;

  @ApiProperty({ example: 'Name', description: 'Country name' })
  name: string;

  @ApiProperty({ example: 'AA', description: 'Country code' })
  code: string;
}
