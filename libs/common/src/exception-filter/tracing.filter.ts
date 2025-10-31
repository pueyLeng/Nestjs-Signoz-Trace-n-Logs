import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { trace, context } from '@opentelemetry/api';
import { Response } from 'express';

@Catch()
export class TraceIdExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const span = trace.getSpan(context.active());
    const { traceId } = span!.spanContext();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorResponse: any = {
      statusCode: status,
      // Default message for unhandled errors
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      errorResponse = exception.getResponse();
    }

    // Inject the trace ID into the error response
    // If response is a string, wrap it in an object. Otherwise, add the property.
    const customResponse =
      typeof errorResponse === 'string'
        ? { message: errorResponse }
        : errorResponse;

    customResponse.traceId = traceId; // highlight-line

    response.status(status).json(customResponse);
  }
}
