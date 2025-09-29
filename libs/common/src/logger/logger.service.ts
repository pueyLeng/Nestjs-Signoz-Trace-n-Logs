import Pino from 'pino';
import { LoggerOptions } from 'pino';
import { trace, context } from '@opentelemetry/api';
import { ConsoleLogger } from '@nestjs/common';

export const loggerOptions: LoggerOptions = {
  name: 'signoz-nestjs',
  level: 'debug',
  transport: {
    target: 'pino-opentelemetry-transport',
  },
  formatters: {
    log(object) {
      const span = trace.getSpan(context.active());
      if (!span) return { ...object };
      const { spanId, traceId } = span.spanContext();
      return {
        ...object,
        spanId: spanId,
        traceId: traceId,
      };
    },
  },
};

export class SigNozLogger extends ConsoleLogger {
  private readonly logger = Pino(loggerOptions);

  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
    this.logger.info({ span_id: 'Hello' }, message, ...optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    super.error(message, ...optionalParams);
    this.logger.error(message, ...optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
    this.logger.warn(message, ...optionalParams);
  }
}
