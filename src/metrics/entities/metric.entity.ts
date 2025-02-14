import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Elderly } from '../../elderly/entities/elderly.entity';

@Entity()
export class Metric {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  value: string;

  @Column()
  date: Date;

  @Column()
  time: string;

  @ManyToOne(() => Elderly, (elderly) => elderly.metrics)
  elderly: Elderly;
}