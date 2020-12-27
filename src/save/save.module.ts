import { forwardRef, Module } from '@nestjs/common';
import { SaveService } from './save.service';
import { SaveController } from './save.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Save, SaveSchema } from './entities/save.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Save.name, schema: SaveSchema }]),forwardRef(() => UserModule)],
  exports: [SaveService],
  controllers: [SaveController],
  providers: [SaveService]
})
export class SaveModule {}
