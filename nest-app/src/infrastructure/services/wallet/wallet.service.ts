import { WalletEntity } from '@infra/entities/wallet.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Web3Service } from 'nest-web3';
import { Repository } from 'typeorm';
import { ExceptionsService } from './../../exceptions/exceptions.service';
import { WalletService } from './wallet.interface';

@Injectable()
export class WalletServiceImpl implements WalletService {
    constructor(
        @InjectRepository(WalletEntity)
        private readonly repository: Repository<WalletEntity>,
        private readonly web3Service: Web3Service,
        private readonly exceptionService: ExceptionsService
    ) {}

    async create(): Promise<WalletEntity> {
        const client = this.web3Service.getClient(process.env.WEB3_NAME);

        const wallet = new WalletEntity();

        const address = await client.eth.personal.newAccount('geth');

        await client.eth.personal.unlockAccount(address, 'geth', 0);

        client.eth.personal.sendTransaction(
            {
                from: process.env.WEB3_DEFAULT_ACCOUNT,
                to: address,
                value: client.utils.toWei('1', 'ether')
            },
            'geth'
        );

        wallet.address = address;

        wallet.balance = 100;

        return await this.repository.save(wallet);
    }

    async deposit(id: number, value: number): Promise<WalletEntity> {
        const entity = await this.repository.findOneByOrFail({ id: id });
        entity.balance = entity.balance + value;
        return await this.repository.save(entity);
    }

    async withdraw(id: number, value: number): Promise<WalletEntity> {
        const entity = await this.repository.findOneByOrFail({ id: id });
        this.validateBalance(entity, value);
        entity.balance = entity.balance - value;
        return await this.repository.save(entity);
    }

    validateBalance(entity: WalletEntity, quantity: number): void {
        if (entity.balance < quantity) {
            this.exceptionService.badRequestException({
                message: 'No suficient funds',
                code: 400
            });
        }
    }
}
