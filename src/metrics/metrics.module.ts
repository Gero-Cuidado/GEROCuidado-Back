import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { Metric } from './entities/metric.entity';
import { Elderly } from '../elderly/entities/elderly.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Metric, Elderly])],
  providers: [MetricsService],
  controllers: [MetricsController],
})
export class MetricsModule {}