import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class TerminusLogger extends ConsoleLogger {
  constructor() {
    super();
    this.setContext('Health Check');
  }
  error(message: string): void {
    this.warn(message);
  }
}
