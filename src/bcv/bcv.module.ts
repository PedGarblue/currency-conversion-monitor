import { Module } from '@nestjs/common';
import { BcvService } from './bcv.service';
import { BcvController } from './bcv.controller';
import { HttpModule } from '@nestjs/axios';
import { ConversionsService } from 'src/conversions/conversions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversion } from 'src/conversions/entities/conversion.entity';

// @Injectable()
// export class PuppeteerConfigService implements PuppeteerOptionsFactory {
//   private readonly dbName = 'BestAppEver';
//   private readonly instanceName = 'BrowserInstanceContext';

//   async createPuppeteerOptions(): Promise<PuppeteerModuleOptions> {
//     return {
//       instanceName: this.instanceName,
//       launchOptions: {
//         executablePath: await chrome.executablePath(),
//       },
//     };
//   }
// }

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversion]),
    HttpModule,
    // PuppeteerModule.forRootAsync({
    //   useClass: PuppeteerConfigService,
    // }),
  ],
  controllers: [BcvController],
  providers: [BcvService, ConversionsService],
})
export class BcvModule {}
