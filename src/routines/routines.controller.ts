import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { RoutinesService } from './routines.service';
import { Routine } from './entities/routine.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('routines')
@UseGuards(AuthGuard('jwt'))
export class RoutinesController {
  constructor(private readonly routinesService: RoutinesService) {}

  @Post(':userId/:elderlyId')
  create(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
    @Body() routine: Partial<Routine>,
  ): Promise<Routine> {
    return this.routinesService.create(userId, elderlyId, routine);
  }

  @Get(':userId/:elderlyId')
  async findAllByElderly(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
  ): Promise<Routine[]> {
    const routines = await this.routinesService.findAllByElderly(userId, elderlyId);
    if (!routines) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }
    return routines;
  }

  @Get(':userId/:elderlyId/:id')
  async findOne(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
    @Param('id') id: number,
  ): Promise<Routine | null> {
    const routine = await this.routinesService.findOne(userId, elderlyId, id);
    if (!routine) {
      throw new NotFoundException('Routine not found or does not belong to the user');
    }
    return routine;
  }

  @Put(':userId/:elderlyId/:id')
  async update(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
    @Param('id') id: number,
    @Body() routine: Partial<Routine>,
  ): Promise<Routine | null> {
    const updatedRoutine = await this.routinesService.update(userId, elderlyId, id, routine);
    if (!updatedRoutine) {
      throw new NotFoundException('Routine not found or does not belong to the user');
    }
    return updatedRoutine;
  }

  @Delete(':userId/:elderlyId/:id')
  async delete(
    @Param('userId') userId: number,
    @Param('elderlyId') elderlyId: number,
    @Param('id') id: number,
  ): Promise<void> {
    await this.routinesService.delete(userId, elderlyId, id);
  }
}