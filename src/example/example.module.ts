import { Module } from '@nestjs/common';
import { ExampleFilterController } from 'src/example/controllers/filter.controller';
import { ExampleLoggingController } from 'src/example/controllers/logger.controller';

/**
 * Folder structure:
 * controllers: all HTTPs endpoints
 * services: Internal modules to perform work
 * exports: Exposed code to other internal modules
 */

@Module({
  controllers: [ExampleFilterController, ExampleLoggingController],
})
export class ExampleModule {}

