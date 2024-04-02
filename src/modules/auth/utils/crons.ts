import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CronService } from 'src/shared/utils/crons';

@Injectable()
export class AuthCrons {
    constructor(private readonly cronsService: CronService) {}

    initShiftReminderCron(id: Types.ObjectId) {
        this.cronsService.setUser(id);
    }
}
