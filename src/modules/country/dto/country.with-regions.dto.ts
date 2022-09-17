import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Region } from '../../region/region.entity';

@Exclude()
export class CountryWithRegionsDto {
  @ApiProperty({ example: 1, description: 'Country id' })
  @Expose()
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'Name', description: 'Country name' })
  @Expose()
  @IsString()
  name: string;

  @ApiProperty({ example: 'AA', description: 'Country code' })
  @Expose()
  @IsString()
  code: string;

  @ApiProperty({ example: '[]', description: 'Country regions' })
  @Expose()
  @IsString()
  regions: Region[];
}
