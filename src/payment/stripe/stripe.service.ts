import { Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomWinstonLogger } from 'src/logger/custom_winston_logger.service';
import Stripe from 'stripe';

export class StripeService {
  stripe: Stripe;

  constructor(
    private readonly logger: CustomWinstonLogger,
    private readonly configService: ConfigService,
  ) {
    logger.setContext(StripeService.name);
    this.stripe = new Stripe(configService.getOrThrow('STRIPE_API_KEY'));
  }

  @Post('webhook/accept_payment')
  config() {
    this.logger.debug(process.env.SAMPLE);
    this.configService.get('SAMPLE');

    return this.configService.get('SAMPLE');
  }
}

