import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Elderly } from './entities/elderly.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ElderlyService {
  constructor(
    @InjectRepository(Elderly)
    private elderlyRepository: Repository<Elderly>,
    @InjectRepository(User)
    private userRepository: Repository<User>, // Injetando o repositório do User
  ) {}

  async create(userId: number, elderly: Partial<Elderly>): Promise<Elderly> {
    // Verifica se o usuário existe
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Associa o idoso ao usuário
    elderly.user = user;
    return this.elderlyRepository.save(elderly);
  }

  async findAllByUser(userId: number): Promise<Elderly[]> {
    return this.elderlyRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(userId: number, id: number): Promise<Elderly | null> {
    return this.elderlyRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  async update(userId: number, id: number, elderly: Partial<Elderly>): Promise<Elderly | null> {
    // Verifica se o idoso pertence ao usuário
    const existingElderly = await this.elderlyRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!existingElderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    // Atualiza o idoso
    await this.elderlyRepository.update(id, elderly);
    return this.elderlyRepository.findOne({ where: { id } });
  }

  async delete(userId: number, id: number): Promise<void> {
    // Verifica se o idoso pertence ao usuário
    const elderly = await this.elderlyRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!elderly) {
      throw new NotFoundException('Elderly not found or does not belong to the user');
    }

    // Exclui o idoso
    await this.elderlyRepository.delete(id);
  }
}