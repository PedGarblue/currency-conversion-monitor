import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversion } from './entities/conversion.entity';
import { CreateConversionDto } from './dto/create-conversion.dto';
import { UpdateConversionDto } from './dto/update-conversion.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ConversionsService {
  constructor(
    @InjectRepository(Conversion)
    private readonly conversionRepository: Repository<Conversion>,
  ) {}

  async create(createConversionDto: CreateConversionDto) {
    return this.conversionRepository.save(createConversionDto);
  }

  async findAll() {
    return this.conversionRepository.find();
  }

  async findOne(id: string) {
    return this.conversionRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateConversionDto: UpdateConversionDto) {
    const conversion = this.conversionRepository.findOneByOrFail({ id });
    return this.conversionRepository.save({
      ...conversion,
      ...updateConversionDto,
    });
  }

  async remove(id: string) {
    const conversion = await this.conversionRepository.findOneByOrFail({ id });
    return this.conversionRepository.remove(conversion);
  }
}
