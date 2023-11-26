import { Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomWinstonLogger } from 'src/logger/custom_winston_logger.service';
import Stripe from 'stripe';

@Controller('v1/stripe')
export class StripeController {
  stripe: Stripe;

  constructor(
    private readonly logger: CustomWinstonLogger,
    private readonly configService: ConfigService,
  ) {
    logger.setContext(StripeController.name);
  }

  @Post('webhook/accept_payment')
  config() {
    this.logger.debug(process.env.SAMPLE);
    this.configService.get('SAMPLE');

    return this.configService.get('SAMPLE');
  }
}

