import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metric } from './entities/metric.entity';
import { Elderly } from '../elderly/entities/elderly.entity';

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(Metric)
    private metricsRepository: Repository<Metric>,
    @InjectRepository(Elderly)
    private elderlyRepository: Repository<Elderly>,
  ) {}

  async create(userId: number, elderlyId: number, metric: Partial<Metric>): Promise<Metric> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    metric.elderly = elderly;
    return this.metricsRepository.save(metric);
  }

  async findAllByElderly(userId: number, elderlyId: number): Promise<Metric[]> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    return this.metricsRepository.find({ where: { elderly: { id: elderlyId } } });
  }

  async findOne(userId: number, elderlyId: number, id: number): Promise<Metric | null> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    return this.metricsRepository.findOne({ where: { id, elderly: { id: elderlyId } } });
  }

  async update(userId: number, elderlyId: number, id: number, metric: Partial<Metric>): Promise<Metric | null> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    await this.metricsRepository.update(id, metric);
    return this.metricsRepository.findOne({ where: { id, elderly: { id: elderlyId } } });
  }

  async delete(userId: number, elderlyId: number, id: number): Promise<void> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    await this.metricsRepository.delete(id);
  }
}