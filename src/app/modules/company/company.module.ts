import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  exports: [TypeOrmModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
