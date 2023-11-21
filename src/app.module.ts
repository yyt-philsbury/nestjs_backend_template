import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExampleModule } from 'src/example/example.module';
import { LoggerModule } from 'src/logger/logger.module';

@Global()
@Module({
  imports: [
    // loads .env into process.env
    // access with either process.env['asfa']
    // or access via ConfigService which is exported by ConfigModule
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ExampleModule,
    LoggerModule,
  ],
})
export class AppModule {}
