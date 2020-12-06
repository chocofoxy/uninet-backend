import { forwardRef, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]),forwardRef(() => UserModule)],
  exports: [ProfileService],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class ProfileModule {}
