import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { setupRedoc } from './shared/middlewares/redoc.middleware';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  const config = new DocumentBuilder()
    .setTitle('study-tech')
    .setDescription('Study-tech API for FIAP tech challenger')
    .setVersion('1.0')
    .addTag('posts')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // pode ser acessado a documentação em http://localhost:3010/api#/
  SwaggerModule.setup('api', app, document);
  // abaixo acessar a rota http://localhost:3010/docs
  setupRedoc(app);

  await app.listen(3010);
}
bootstrap();
