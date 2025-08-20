import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res: any = exception.getResponse();
      return response.status(status).json({
        ...res,
        timestamp: new Date().toISOString(),
      });
    }

    // Nếu là lỗi hệ thống (không phải HttpException)
    console.error(exception);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      message: 'Internal server error',
      timestamp: new Date().toISOString(),
    });
  }
}
