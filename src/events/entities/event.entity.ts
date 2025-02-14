// src/events/entities/event.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Elderly } from '../../elderly/entities/elderly.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // Título do evento

  @Column()
  description: string; // Descrição do evento

  @Column({ nullable: true })
  date: Date; // Data e hora do evento (se não for repetitivo)

  @Column({ nullable: true })
  time: string; // Horário do evento (ex.: "08:00")

  @Column({ default: false })
  isRepeating: boolean; // Indica se o evento se repete

  @Column('simple-array', { nullable: true })
  repeatDays: string[]; // Dias da semana que o evento se repete (ex.: ['Monday', 'Wednesday'])

  @Column()
  category: string; // Categoria do evento (ex.: "Consulta", "Aniversário")

  @ManyToOne(() => Elderly, (elderly) => elderly.events)
  elderly: Elderly; // Relação com o idoso
}