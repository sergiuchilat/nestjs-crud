import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class CountryItemDropdownDto {
  @ApiProperty({ example: 1, description: 'Country id' })
  @Expose({
    name: 'id',
  })
  @IsNumber()
  value: number;

  @ApiProperty({ example: 'Name', description: 'Country name' })
  @Expose({
    name: 'name',
  })
  @IsString()
  text: string;
}
