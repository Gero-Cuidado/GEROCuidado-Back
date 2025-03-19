import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { ElderlyModule } from './elderly/elderly.module';
import { MetricsModule } from './metrics/metrics.module';
import { EventsModule } from './events/events.module';
import { RoutinesModule } from './routines/routines.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Apenas para desenvolvimento
        ssl: {
          rejectUnauthorized: false, // Ignora a verificação do certificado SSL
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ElderlyModule,
    AuthModule,
    MetricsModule,
    EventsModule,
    RoutinesModule,
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
