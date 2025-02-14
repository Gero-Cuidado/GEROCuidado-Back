import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElderlyService } from './elderly.service';
import { ElderlyController } from './elderly.controller';
import { Elderly } from './entities/elderly.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Elderly, User])],
  providers: [ElderlyService],
  controllers: [ElderlyController],
})
export class ElderlyModule {}