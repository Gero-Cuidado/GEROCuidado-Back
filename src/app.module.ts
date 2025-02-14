import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ElderlyModule } from './elderly/elderly.module';
import { MetricsModule } from './metrics/metrics.module';
import { EventsModule } from './events/events.module';
import { RoutinesModule } from './routines/routines.module';
import { Connection } from 'typeorm';
// import { NotificationsModule } from './notifications/notifications.module';
// import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';

@Module({ 
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}', // Carrega todas as entidades automaticamente
      ],
      synchronize: true, // Cria automaticamente as tabelas (apenas para desenvolvimento)
    }),
    UsersModule,
    ElderlyModule,
    AuthModule,
    MetricsModule,
    EventsModule,
    RoutinesModule,
    // NotificationsModule,
    // UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly connection: Connection) {}

  onApplicationBootstrap() {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    console.log('Banco de dados:', this.connection.options.database);
  }
}