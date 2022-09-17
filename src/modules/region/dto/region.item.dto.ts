import { ApiProperty } from '@nestjs/swagger';

export class RegionItemDto {
  @ApiProperty({ example: 1, description: 'Region id' })
  id: number;

  @ApiProperty({ example: 'Name', description: 'Region name' })
  name: string;

  @ApiProperty({ example: 'AA', description: 'Region code' })
  code: string;
}
