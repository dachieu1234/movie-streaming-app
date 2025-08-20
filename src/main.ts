import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { UnprocessableEntityException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AllExceptionsFilter } from "common/filters/all-exceptions.filter";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException(
          errors.map((err) => ({
            field: err.property,
            errors: Object.values(err.constraints || {}),
          })),
        );
      },
    }),
  );

  // app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle("Streaming PRO API")
    .setVersion("3.0")
    .addBearerAuth()
    .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, doc);

  const port = +process.env.PORT || 3000;
  await app.listen(port);
  console.log(
    `▶ http://localhost:${port} | Docs http://localhost:${port}/docs`,
  );
}
bootstrap();
