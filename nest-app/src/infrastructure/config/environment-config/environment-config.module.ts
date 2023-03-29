import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigService } from './environment-config.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env.dev', '.env.prod'],
            isGlobal: true
        })
    ],
    providers: [EnvironmentConfigService],
    exports: [EnvironmentConfigService]
})
export class EnvironmentConfigModule {}
