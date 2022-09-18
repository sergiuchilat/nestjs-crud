import { ApiProperty } from '@nestjs/swagger';

export class LocationItemDto {
  @ApiProperty({ example: 1, description: 'Location id' })
  id: number;

  @ApiProperty({ example: 'Name', description: 'Location name' })
  name: string;

  @ApiProperty({ example: 'AA', description: 'Location code' })
  code: string;
}
