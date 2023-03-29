import { OfficialStampsModel } from '@domain/official-stamps/official-stamps.model';
import { LoggerServiceImpl } from '@infra/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { Web3Service } from 'nest-web3';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { ExceptionsService } from './../../exceptions/exceptions.service';
import * as artificat from './build/OfficialStampContract.json';
import { ContractService } from './contract.service.interface';
import { IOfficialStampToken } from './official-stamp-token.interface';

@Injectable()
export class ContractServiceImpl implements ContractService {
    instance: Contract | null = null;
    client: Web3;

    constructor(private readonly web3Service: Web3Service, private loggerService: LoggerServiceImpl, private exceptionService: ExceptionsService) {
        this.client = this.web3Service.getClient(process.env.WEB3_NAME);
        this.instance = this.instance === null ? new this.client.eth.Contract(artificat.abi as any[], process.env.WEB3_CONTRACT_ADDRESS) : this.instance;
    }

    async buyOfficialStamp(toAccount: string, officialStamp: OfficialStampsModel, quantity: number): Promise<any> {
        try {
            const response: any[] = [];
            for (let index = 0; index < quantity; index++) {
                const data = await this.instance.methods.buyToken(officialStamp.name, officialStamp.value, toAccount).send({ from: toAccount });
                response.push(data);
            }
        } catch (error: any) {
            await this.unlockAccount(error.message, toAccount);

            this.loggerService.error('Fail to buy official stamp', error.message);
            this.exceptionService.badRequestException({
                message: 'Fail to buy official stamp',
                code: 400
            });
        }
    }

    async getOfficialStampsBought(toAccount: string): Promise<any> {
        try {
            const data: [] = await this.instance.methods.getAllTokensFromWallet(toAccount).call();
            return data.map((item) => {
                return {
                    id: item[0],
                    name: item[1],
                    price: item[2],
                    owner: item[3]
                } as IOfficialStampToken;
            });
        } catch (error: any) {
            await this.unlockAccount(error.message, toAccount);

            this.loggerService.error('Fail to get official stamp bought', error.message);
            this.exceptionService.badRequestException({
                message: 'Fail to get official stamp bought',
                code: 400
            });
        }
    }

    async unlockAccount(message: string, account: string): Promise<void> {
        if (message.includes('authentication needed: password or unlock')) {
            this.loggerService.log('Account Locked', '');

            const client = this.web3Service.getClient(process.env.WEB3_NAME);
            await client.eth.personal.unlockAccount(account, 'geth', 0);

            this.loggerService.log('Account unlocked', 'Try to execute action again');
        }
    }
}
