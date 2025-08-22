import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { UnprocessableEntityException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AllExceptionsFilter } from "common/filters/all-exceptions.filter";
import { ResponseInterceptor } from "common/interceptors/response.interceptor";
import { LoggingInterceptor } from "common/interceptors/logging.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // CORS
    app.enableCors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    });

    // Global validation pipe (422 Unprocessable Entity)
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

    // Global response interceptor (format success response)
    app.useGlobalInterceptors(
        new ResponseInterceptor(),  // format output (wrap response)
        new LoggingInterceptor(),   // log request + response time
    );

    // Global exception filter (format error response)
    app.useGlobalFilters(new AllExceptionsFilter());

    // Swagger
    const config = new DocumentBuilder()
        .setTitle("Streaming PRO API")
        .setVersion("3.0")
        .addBearerAuth()
        .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, doc);

    // Run app
    const port = +process.env.PORT || 3000;
    await app.listen(port);
    console.log(`▶ http://localhost:${port} | Docs http://localhost:${port}/docs`);
}
bootstrap();
