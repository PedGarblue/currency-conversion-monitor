import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { BcvService } from './bcv.service';
import { from, map } from 'rxjs';
// import { CreateBcvDto } from './dto/create-bcv.dto';
// import { UpdateBcvDto } from './dto/update-bcv.dto';

@Controller('bcv')
export class BcvController {
  constructor(private readonly bcvService: BcvService) {}

  // @Post()
  // create(@Body() createBcvDto: CreateBcvDto) {
  //   return this.bcvService.create(createBcvDto);
  // }

  @Get()
  findAll() {
    const bcvPageResponse = this.bcvService.scrapePage();
    return from(bcvPageResponse).pipe(
      map((values) => {
        return { values };
      }),
    );
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.bcvService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBcvDto: UpdateBcvDto) {
  //   return this.bcvService.update(+id, updateBcvDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bcvService.remove(+id);
  // }
}
