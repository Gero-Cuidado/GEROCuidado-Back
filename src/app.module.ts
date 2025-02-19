import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Cuidado: use apenas em desenvolvimento
        ssl: true, // Habilitar ao usar o render SSL
        extra: {
          ssl: {
            rejectUnauthorized: true, // Ignora a verificação do certificado (necessário para Render)
          },
        },
      }),
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
export class AppModule {}