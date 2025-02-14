import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Elderly } from '../../elderly/entities/elderly.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profile_picture_url: string; // URL da foto de perfil (usando Imgur)

  @Column()
  phone: string; // Telefone do usuário

  @Column()
  birth_date: Date; // Data de nascimento do usuário

  @OneToMany(() => Elderly, (elderly) => elderly.user)
  elderly: Elderly[]; // Relação com os idosos que o usuário cuida
}