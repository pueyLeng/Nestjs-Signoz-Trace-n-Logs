import { Span } from '@metinseylan/nestjs-opentelemetry';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor() {}

  getHello(): string {
    this.logger.log('getHello called');
    return 'Hello World!';
  }
}
