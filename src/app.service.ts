import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor() {}

  getHello(): string {
    try {
      this.logger.log('getHello called');
      throw new BadRequestException('Simulated error');
    } catch (error) {
      this.logger.error('Error in getHello', { error });
      throw new InternalServerErrorException(`Something went wrong`);
    }
  }
}
