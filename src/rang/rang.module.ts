import { Module } from '@nestjs/common';
import { RangService } from './rang.service';
import { RangController } from './rang.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rang, RangSchema } from './entities/rang.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Rang.name, schema: RangSchema }])],
  exports: [RangService],
  controllers: [RangController],
  providers: [RangService]
})
export class RangModule {}
