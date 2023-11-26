import { Global, Module } from '@nestjs/common';
import { StripeController } from 'src/payment/stripe/stripe.controller';

@Global()
@Module({
  controllers: [StripeController],
})
export class PaymentModule {}

