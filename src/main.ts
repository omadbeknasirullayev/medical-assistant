import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3030
  console.log(process.env.PORT)
  app.useGlobalPipes(new ValidationPipe())
  
  const configSwagger = new DocumentBuilder()
  .setTitle('Medical Assistant')
  .setDescription('REST API')
  .setVersion('1.0.0')
  .addTag('NodeJS, NestJS, Postgres, sequelize')
  .setDescription("This is a REST API written for Medical Record automation. The guard parts of the API are disabled. For ease of inspection.")
  .build()

  const document = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`) 
  });
}
start();