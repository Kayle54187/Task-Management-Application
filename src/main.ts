import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as config from 'config';
import { Logger } from '@nestjs/common';

/**
 * Boots up the application.
 *
 * @returns {Promise<void>} A promise that resolves when the application is successfully bootstrapped.
 */
async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Task Management Application')
    .setDescription('The Task Management API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Please enter token`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api-docs', app, document);

  await app.listen(process.env.PORT ?? serverConfig?.port);

  logger.log(
    `Application listening on port ${process.env.PORT ?? serverConfig?.port}`,
  );
}
bootstrap();
