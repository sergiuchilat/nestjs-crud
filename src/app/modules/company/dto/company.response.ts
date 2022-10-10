import { ApiProperty } from '@nestjs/swagger';

export class CompanyResponseDto {
  @ApiProperty({ example: '1', description: 'Company Id' })
  id: number;

  @ApiProperty({ example: 'Name', description: 'Company name' })
  name: string;

  @ApiProperty({ example: 'Main street', description: 'Company street' })
  address: string;
}
