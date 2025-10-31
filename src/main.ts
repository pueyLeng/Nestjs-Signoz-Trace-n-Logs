import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import tracer from './tracer';
import { SigNozLogger } from '@app/common/logger/logger.service';
import { TraceIdExceptionFilter } from '@app/common/exception-filter/tracing.filter';

async function bootstrap() {
  tracer.start();

  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(SigNozLogger));
  app.useGlobalFilters(new TraceIdExceptionFilter())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
