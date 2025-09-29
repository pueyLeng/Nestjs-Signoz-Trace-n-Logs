import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignozModule } from '@app/common/logger/logger.module';

@Module({
  imports: [SignozModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
