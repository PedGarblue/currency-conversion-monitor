import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import * as cheerio from 'cheerio';
import { ConversionsService } from 'src/conversions/conversions.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class BcvService {
  constructor(
    private readonly httpService: HttpService,
    private readonly conversionsService: ConversionsService,
  ) {}

  getPage(): Observable<AxiosResponse<any, any>> {
    const url = 'https://www.bcv.org.ve';
    return this.httpService.get(url);
  }

  @Cron('0 11 * * 1-5', {
    name: 'scrapePageBCV',
    timeZone: 'America/Caracas',
  })
  scrapePage(): Observable<object> {
    return this.getPage().pipe(
      map((response: AxiosResponse<any, any>) => {
        const html = response.data;
        const $ = cheerio.load(html);

        const currenciesSearchOptions = [
          {
            tag: '#dolar',
            currency: 'usd',
          },
          {
            tag: '#euro',
            currency: 'eur',
          },
        ];

        const values = {};

        currenciesSearchOptions.forEach((searchOptions) => {
          const currencyExchangePrice = $(searchOptions.tag)
            .text()
            .replace(/[^0-9\,]/g, ''); // Adjust the selector as needed
          const exchangePrice = parseFloat(
            currencyExchangePrice.replace(',', '.'),
          );

          this.conversionsService.create({
            name: 'bcv to ' + searchOptions.currency,
            from: 'bcv',
            to: searchOptions.currency,
            value: exchangePrice,
            timestamp: new Date(),
          });

          values[searchOptions.currency] = exchangePrice;
        });

        return values;
      }),
    );
  }
}
