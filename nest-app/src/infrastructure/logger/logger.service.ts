import { LoggerService } from '@domain/logger/logger.interface';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerServiceImpl extends Logger implements LoggerService {
    debug(context: string, message: string) {
        if (process.env.NODE_ENV !== 'production') {
            super.debug(`[DEBUG] ${message}`, context);
        }
    }
    log(context: string, message: string) {
        super.log(`[INFO] ${message}`, context);
    }
    error(context: string, message: string, trace?: string) {
        super.error(`[ERROR] ${message}`, trace, context);
    }
    warn(context: string, message: string) {
        super.warn(`[WARN] ${message}`, context);
    }
    verbose(context: string, message: string) {
        if (process.env.NODE_ENV !== 'production') {
            super.verbose(`[VERBOSE] ${message}`, context);
        }
    }
}
