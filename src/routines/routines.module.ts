// src/routines/routines.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { Routine } from './entities/routine.entity';
import { Elderly } from '../elderly/entities/elderly.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Routine, Elderly])],
  providers: [RoutinesService],
  controllers: [RoutinesController],
})
export class RoutinesModule {}