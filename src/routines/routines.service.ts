import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Routine } from './entities/routine.entity';
import { Elderly } from '../elderly/entities/elderly.entity';

@Injectable()
export class RoutinesService {
  constructor(
    @InjectRepository(Routine)
    private routinesRepository: Repository<Routine>,
    @InjectRepository(Elderly)
    private elderlyRepository: Repository<Elderly>,
  ) {}

  async create(userId: number, elderlyId: number, routine: Partial<Routine>): Promise<Routine> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    routine.elderly = elderly;
    return this.routinesRepository.save(routine);
  }

  async findAllByElderly(userId: number, elderlyId: number): Promise<Routine[]> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    return this.routinesRepository.find({ where: { elderly: { id: elderlyId } } });
  }

  async findOne(userId: number, elderlyId: number, id: number): Promise<Routine | null> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    return this.routinesRepository.findOne({ where: { id, elderly: { id: elderlyId } } });
  }

  async update(userId: number, elderlyId: number, id: number, routine: Partial<Routine>): Promise<Routine | null> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    await this.routinesRepository.update(id, routine);
    return this.routinesRepository.findOne({ where: { id, elderly: { id: elderlyId } } });
  }

  async delete(userId: number, elderlyId: number, id: number): Promise<void> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    await this.routinesRepository.delete(id);
  }
}