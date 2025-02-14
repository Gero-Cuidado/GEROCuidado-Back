import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { Elderly } from '../elderly/entities/elderly.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(Elderly)
    private elderlyRepository: Repository<Elderly>,
  ) {}

  async create(userId: number, elderlyId: number, event: Partial<Event>): Promise<Event> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    event.elderly = elderly;
    return this.eventsRepository.save(event);
  }

  async findAllByElderly(userId: number, elderlyId: number): Promise<Event[]> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    return this.eventsRepository.find({ where: { elderly: { id: elderlyId } } });
  }

  async findOne(userId: number, elderlyId: number, id: number): Promise<Event | null> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    return this.eventsRepository.findOne({ where: { id, elderly: { id: elderlyId } } });
  }

  async update(userId: number, elderlyId: number, id: number, event: Partial<Event>): Promise<Event | null> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    await this.eventsRepository.update(id, event);
    return this.eventsRepository.findOne({ where: { id, elderly: { id: elderlyId } } });
  }

  async delete(userId: number, elderlyId: number, id: number): Promise<void> {
    const elderly = await this.elderlyRepository.findOne({
      where: { id: elderlyId, user: { id: userId } },
      relations: ['user'],
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    await this.eventsRepository.delete(id);
  }
}