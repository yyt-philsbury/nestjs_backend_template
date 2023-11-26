import { Controller, Get, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomWinstonLogger } from 'src/logger/custom_winston_logger.service';
import Stripe from 'stripe';

@Controller('v1/stripe/webhooks')
export class StripeV1Controller {
  stripe: Stripe;

  constructor(
    private readonly logger: CustomWinstonLogger,
    private readonly configService: ConfigService,
  ) {
    logger.setContext(StripeV1Controller.name);
    this.stripe = new Stripe(configService.getOrThrow('STRIPE_API_SK'));
  }

  /**
   * Get products and price, go on stripe account and create products.
   */
  @Get('products')
  async getProducts() {
    const productPriceData = await this.stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });

    return productPriceData.data.map(e => {
      const defaultPrice = e.default_price as Stripe.Price;

      return {
        price_id: defaultPrice.id,
        name: e.name,
        description: e.description || '',
        unitPriceCents: defaultPrice.unit_amount,
        currency: defaultPrice.currency,
      };
    });
  }

  /**
   * Customers choose what to pay. Gets a payment link where they can choose.
   * Payment link attaches app internal customer id
   *
   * @returns
   */
  @Post('donation/payment_link')
  async createDonationPaymentLink(@Query('user_id') user_id: string) {
    /**
     * PM2 ecosystem.config.js pm2 app name.
     * We use this to determine which instance is the primary -
     * we use the primary instance to run scheduled cron jobs
     *
     * We need to build the app before we use pm2 (deploy* scripts)
     */
    return `current instanceName ${process.env.name}`;
  }

  @Post('webhook/donation/payment_link')
  async donationPaymentLinkWebhook(@Query)
}

