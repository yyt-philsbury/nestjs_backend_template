import { Global, Module } from '@nestjs/common';
import { ExampleModule } from 'src/example/example.module';
import { LoggerModule } from 'src/logger/logger.module';

@Global()
@Module({
  imports: [ExampleModule, LoggerModule],
})
export class AppModule {}
