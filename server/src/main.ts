import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './shared/infra/http/modules/app.module';
import { MulterModule } from '@nestjs/platform-express';
import { contentParser } from 'fastify-multer';
import 'reflect-metadata';
import { ExceptionHandler } from './shared/infra/http/handlers/expection.handler';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalFilters(new ExceptionHandler());
  await app.register(contentParser);

  await app.listen(3000);
}
bootstrap();
