import { Module } from '@nestjs/common';
import { StripeV1Controller } from 'src/payment/stripe/stripe.v1.controller';
/**
 * Folder structure:
 * controllers: all HTTPs endpoints
 * services: Internal modules to perform work
 * exports: Exposed code to other internal modules
 */

@Module({
  controllers: [StripeV1Controller],
})
export class PaymentModule {}
