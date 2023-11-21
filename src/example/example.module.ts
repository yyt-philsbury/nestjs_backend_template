import { Module } from '@nestjs/common';
import { ExampleClusterController } from 'src/example/controllers/cluster_instance.controller';
import { ExampleConfigController } from 'src/example/controllers/config.controller';
import { ExampleFilterController } from 'src/example/controllers/filter.controller';
import { ExampleLoggingController } from 'src/example/controllers/logger.controller';

/**
 * Folder structure:
 * controllers: all HTTPs endpoints
 * services: Internal modules to perform work
 * exports: Exposed code to other internal modules
 */

@Module({
  controllers: [
    ExampleFilterController,
    ExampleLoggingController,
    ExampleClusterController,
    ExampleConfigController,
  ],
})
export class ExampleModule {}

