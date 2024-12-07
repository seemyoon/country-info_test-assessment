import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
  private readonly logger = new Logger();

  public error(error: any): void {
    this.logger.error(error);
  }
}
