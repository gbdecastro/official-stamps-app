import { WalletRepository } from '@domain/wallet/wallet.repository';
import { WalletEntity } from '@infra/entities/wallet.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class WalletRepositoryImpl implements WalletRepository {
    constructor(
        @InjectRepository(WalletEntity)
        private readonly repository: Repository<WalletEntity>
    ) {}
}
