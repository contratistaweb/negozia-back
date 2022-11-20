import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configuration from './modules/configuration/configuration';

async function bootstrap() {
  const host = configuration().apiHost;
  const port = configuration().apiPort;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(json({ limit: '60mb' }));
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Negozia Test Fullstack MEAN')
    .setDescription('Documentation API Negozia Test Fullstack MEAN')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app
    .listen(process.env.API_PORT)
    .then(() => console.log(`API Run at ${host}:${port}`));
}
bootstrap().then();
