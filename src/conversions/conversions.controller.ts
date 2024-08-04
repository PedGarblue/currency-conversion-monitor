import { Controller, Get, Param } from '@nestjs/common';
import { ConversionsService } from './conversions.service';

@Controller('conversions')
export class ConversionsController {
  constructor(private readonly conversionsService: ConversionsService) {}

  @Get()
  findAll() {
    return this.conversionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversionsService.findOne(id);
  }
}
