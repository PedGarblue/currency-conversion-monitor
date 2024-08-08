import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BcvModule } from './bcv/bcv.module';
import { ConversionsModule } from './conversions/conversions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5450,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConversionsModule,
    BcvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
