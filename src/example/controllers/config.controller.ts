import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomWinstonLogger } from 'src/logger/custom_winston_logger.service';

@Controller('v1/example')
export class ExampleConfigController {
  constructor(
    private readonly logger: CustomWinstonLogger,
    private readonly configService: ConfigService,
  ) {
    logger.setContext(ExampleConfigController.name);
  }

  @Get('config')
  config() {
    this.logger.debug(process.env.SAMPLE);
    this.configService.get('SAMPLE');

    return this.configService.get('SAMPLE');
  }

  @Get('config/getorthrow')
  config2() {
    return this.configService.getOrThrow('SAMPLE_NOT_EXIST');
  }
}

