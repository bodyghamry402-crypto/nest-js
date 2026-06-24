import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpCustomFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters((new HttpCustomFilter));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
