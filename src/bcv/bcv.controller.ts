import {
  Controller,
  Get,
} from '@nestjs/common';
import { BcvService } from './bcv.service';
import { from, map } from 'rxjs';

@Controller('bcv')
export class BcvController {
  constructor(private readonly bcvService: BcvService) {}

  @Get('/scrape')
  scrapeAll() {
    const bcvPageResponse = this.bcvService.scrapePage();
    return from(bcvPageResponse).pipe(
      map((values) => {
        return { values };
      }),
    );
  }
}
