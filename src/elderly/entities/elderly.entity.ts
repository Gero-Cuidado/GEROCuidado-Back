// src/elderly/entities/elderly.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Metric } from '../../metrics/entities/metric.entity';
import { Routine } from '../../routines/entities/routine.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Elderly {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  profile_picture_url: string;

  @Column()
  birth_date: Date;

  @Column()
  responsible_phone: string;

  @Column()
  blood_type: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.elderly)
  user: User;

  @OneToMany(() => Event, (event) => event.elderly)
  events: Event[];

  @OneToMany(() => Metric, (metric) => metric.elderly)
  metrics: Metric[];

  @OneToMany(() => Routine, (routine) => routine.elderly)
  routines: Routine[];
}