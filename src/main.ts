import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { useRequestLogging } from './requestLogger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.useGlobalPipes(new ValidationPipe());
  useRequestLogging(app);
  const options = new DocumentBuilder()
    .setTitle('Uninet')
    .setDescription('Uninet API endpoints & docs')
    .setVersion('1.0')
    .addTag('uninet-backend')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
