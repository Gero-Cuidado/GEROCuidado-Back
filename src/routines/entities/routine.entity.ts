import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Elderly } from '../../elderly/entities/elderly.entity';

@Entity()
export class Routine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  date: Date;

  @Column({ nullable: true })
  time: string;

  @Column({ default: false })
  isRepeating: boolean;

  @Column('simple-array', { nullable: true })
  repeatDays: string[];

  @Column()
  category: string;

  @ManyToOne(() => Elderly, (elderly) => elderly.routines)
  elderly: Elderly; // Relação com o idoso
}