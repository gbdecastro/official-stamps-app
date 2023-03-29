import { Module } from '@nestjs/common';
import { Web3Module } from 'nest-web3';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { EnvironmentConfigModule } from './../environment-config/environment-config.module';

@Module({
    imports: [
        Web3Module.forRootAsync({
            imports: [EnvironmentConfigModule],
            inject: [EnvironmentConfigService],
            useFactory: (config: EnvironmentConfigService) => config.getWeb3()
        })
    ]
})
export class Web3AppModule {}
