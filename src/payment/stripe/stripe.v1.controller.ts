import { Controller, Get, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomWinstonLogger } from 'src/logger/custom_winston_logger.service';
import { PrismaClientService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';

@Controller('v1/stripe')
export class StripeV1Controller {
  stripe: Stripe;

  constructor(
    private readonly logger: CustomWinstonLogger,
    private readonly configService: ConfigService,
    private readonly prismaClient: PrismaClientService,
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
   * Customers choose a product to pay for, accepts an array of pricing ids from
   * products
   *
   * @returns
   */
  @Post('payment_link')
  async createPaymentLink(@Query('user_id') user_id: string) {
    const user = await this.prismaClient.users.findUniqueOrThrow({
      where: {
        id: user_id,
      },
    });

    const paymentLink = await this.stripe.paymentLinks.create({
      line_items,
    });

    return;
  }
}

