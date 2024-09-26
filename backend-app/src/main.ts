import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './util/http-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip out properties that are not in the DTO
    forbidNonWhitelisted: false, // Throw error if unknown properties are passed
    transform: true, // Automatically transform payloads to DTO instances
  }));

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  // Enable CORS
  app.enableCors({
    origin: '*', // Allow all origins (for development purposes)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allowed HTTP methods
    credentials: true, // Allow sending cookies from front-end
  });

  await app.listen(3000);
}
bootstrap();
