import { ConsoleLogger } from '@nestjs/common';

export class LoggerService extends ConsoleLogger {
  constructor(context: string) {
    super();
    this.setContext(context);
  }
}
