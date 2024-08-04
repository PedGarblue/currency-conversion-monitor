import { Module } from '@nestjs/common';
import { ConversionsService } from './conversions.service';
import { ConversionsController } from './conversions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversion } from './entities/conversion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversion])],
  controllers: [ConversionsController],
  providers: [ConversionsService],
})
export class ConversionsModule {}
