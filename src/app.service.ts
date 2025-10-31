import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { trace, context } from '@opentelemetry/api';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor() {}

  getHello(): string {
    try {
      this.logger.log('getHello called');
      throw new BadRequestException('Simulated error');
    } catch (error) {
      const span = trace.getSpan(context.active());
      const { spanId, traceId } = span!.spanContext();
      this.logger.error('Error in getHello', { spanId, traceId, error });
      throw new InternalServerErrorException(`Internal Server Error \w traceid : ${traceId}`);
    }
  }

    getHelloError(): string {
    try {
      this.logger.log('getHello called');
      throw new BadRequestException('Simulated error');
    } catch (error) {
      const span = trace.getSpan(context.active());
      const { spanId, traceId } = span!.spanContext();
      this.logger.error('Error in getHello', { spanId, traceId, error });
      throw new Error(`Internal Server Error \w traceid : ${traceId}`);
    }
  }
}
