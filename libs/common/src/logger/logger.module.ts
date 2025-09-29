
import { Module } from '@nestjs/common';
import { SigNozLogger } from './logger.service';

@Module({
  providers: [SigNozLogger],
  exports: [SigNozLogger],
})
export class SignozModule {}
