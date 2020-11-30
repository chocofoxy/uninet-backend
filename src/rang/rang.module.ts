import { Module } from '@nestjs/common';
import { RangService } from './rang.service';
import { RangController } from './rang.controller';
import { Rang } from './rang.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Rang])],
  providers: [RangService],
  exports: [RangService],
  controllers: [RangController]
})
export class RangModule {}
