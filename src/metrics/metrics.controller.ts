import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { Metric } from './entities/metric.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('metrics')
@UseGuards(AuthGuard('jwt'))
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post(':userId/:elderlyId')
  create(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
    @Body() metric: Partial<Metric>,
  ): Promise<Metric> {
    return this.metricsService.create(userId, elderlyId, metric);
  }

  @Get(':userId/:elderlyId')
  async findAllByElderly(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
  ): Promise<Metric[]> {
    const metrics = await this.metricsService.findAllByElderly(userId, elderlyId);
    if (!metrics) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }
    return metrics;
  }

  @Get(':userId/:elderlyId/:id')
  async findOne(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
    @Param('id') id: number,
  ): Promise<Metric | null> {
    const metric = await this.metricsService.findOne(userId, elderlyId, id);
    if (!metric) {
      throw new NotFoundException('Metric not found or does not belong to the user');
    }
    return metric;
  }

  @Put(':userId/:elderlyId/:id')
  async update(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
    @Param('id') id: number,
    @Body() metric: Partial<Metric>,
  ): Promise<Metric | null> {
    const updatedMetric = await this.metricsService.update(userId, elderlyId, id, metric);
    if (!updatedMetric) {
      throw new NotFoundException('Metric not found or does not belong to the user');
    }
    return updatedMetric;
  }

  @Delete(':userId/:elderlyId/:id')
  async delete(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
    @Param('id') id: number,
  ): Promise<void> {
    await this.metricsService.delete(userId, elderlyId, id);
  }
}