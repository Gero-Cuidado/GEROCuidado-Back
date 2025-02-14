import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('events')
@UseGuards(AuthGuard('jwt'))
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post(':userId/:elderlyId')
  create(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
    @Body() event: Partial<Event>,
  ): Promise<Event> {
    return this.eventsService.create(userId, elderlyId, event);
  }

  @Get(':userId/:elderlyId')
  async findAllByElderly(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
  ): Promise<Event[]> {
    const events = await this.eventsService.findAllByElderly(userId, elderlyId);
    if (!events) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }
    return events;
  }

  @Get(':userId/:elderlyId/:id')
  async findOne(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
    @Param('id') id: number,
  ): Promise<Event | null> {
    const event = await this.eventsService.findOne(userId, elderlyId, id);
    if (!event) {
      throw new NotFoundException('Event not found or does not belong to the user');
    }
    return event;
  }

  @Put(':userId/:elderlyId/:id')
  async update(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
    @Param('id') id: number,
    @Body() event: Partial<Event>,
  ): Promise<Event | null> {
    const updatedEvent = await this.eventsService.update(userId, elderlyId, id, event);
    if (!updatedEvent) {
      throw new NotFoundException('Event not found or does not belong to the user');
    }
    return updatedEvent;
  }

  @Delete(':userId/:elderlyId/:id')
  async delete(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
    @Param('id') id: number,
  ): Promise<void> {
    await this.eventsService.delete(userId, elderlyId, id);
  }
}