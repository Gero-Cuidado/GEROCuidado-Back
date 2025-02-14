import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { ElderlyService } from './elderly.service';
import { Elderly } from './entities/elderly.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('elderly')
@UseGuards(AuthGuard('jwt')) // Protege todos os endpoints de idosos
export class ElderlyController {
  constructor(private readonly elderlyService: ElderlyService) {}

  @Post(':userId') // Passa o userId como parâmetro na rota
  create(
    @Param('userId') userId: number,
    @Body() elderly: Partial<Elderly>,
  ): Promise<Elderly> {
    return this.elderlyService.create(userId, elderly);
  }

  @Get(':userId')
  findAllByUser(@Param('userId') userId: number): Promise<Elderly[]> {
    return this.elderlyService.findAllByUser(userId);
  }

  @Get(':userId/:id')
  async findOne(
    @Param('userId') userId: number,
    @Param('id') id: number,
  ): Promise<Elderly | null> {
    const elderly = await this.elderlyService.findOne(userId, id);
    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }
    return elderly;
  }

  @Put(':userId/:id')
  async update(
    @Param('userId') userId: number,
    @Param('id') id: number,
    @Body() elderly: Partial<Elderly>,
  ): Promise<Elderly | null> {
    const updatedElderly = await this.elderlyService.update(userId, id, elderly);
    if (!updatedElderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }
    return updatedElderly;
  }

  @Delete(':userId/:id')
  async delete(
    @Param('userId') userId: number,
    @Param('id') id: number,
  ): Promise<void> {
    await this.elderlyService.delete(userId, id);
  }
}