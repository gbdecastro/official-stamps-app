import { RegistryOfficesModel } from '@domain/registry-offices/registry-offices.model';
import { RegistryOfficeEntity } from '@infra/entities/registry-offices.entity';
import { LoggerServiceImpl } from '@infra/logger/logger.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractServiceImpl } from '../contract/contract.service';
import { OfficialStampServiceImpl } from '../official-stamps/official-stamp.service';
import { WalletServiceImpl } from '../wallet/wallet.service';
import { RegistryOfficeService } from './registry-office.interface';

@Injectable()
export class RegistryOfficeServiceImpl implements RegistryOfficeService {
    constructor(
        @InjectRepository(RegistryOfficeEntity)
        private readonly repository: Repository<RegistryOfficeEntity>,
        private readonly wallet: WalletServiceImpl,
        private readonly officialStamp: OfficialStampServiceImpl,
        private readonly contract: ContractServiceImpl,
        private readonly logger: LoggerServiceImpl
    ) {}

    // IMPLEMENTS
    async getAll(): Promise<RegistryOfficesModel[]> {
        return (
            await this.repository.find({
                relations: ['wallet'],
                loadRelationIds: false
            })
        ).map((item) => this.toModel(item));
    }

    async getOne(id: number): Promise<RegistryOfficesModel> {
        return await this.repository.findOneOrFail({
            where: {
                id: id
            },
            relations: ['wallet'],
            loadRelationIds: false
        });
    }

    async save(model: RegistryOfficesModel): Promise<RegistryOfficesModel> {
        const wallet = await this.wallet.create();
        const entity = this.toEntity(model);
        entity.wallet = wallet;
        return this.toModel(await this.repository.save(entity));
    }

    async update(id: number, model: RegistryOfficesModel): Promise<RegistryOfficesModel> {
        await this.getOne(id);
        return this.toModel((await this.repository.update({ id: id }, this.toEntity(model))).generatedMaps[0] as RegistryOfficeEntity);
    }

    async delete(id: number): Promise<void> {
        await this.getOne(id);
        await this.repository.delete({ id: id });
    }

    async buyOfficialStamp(id: number, officialStampId: number, quantity: number): Promise<void> {
        this.logger.log('BuyOfficialStampsUseCase', 'Getting Registry Office');
        const registryOffice = await this.getOne(id);

        this.logger.log('BuyOfficialStampsUseCase', 'Getting Official Stamp');
        const officialStamp = await this.officialStamp.getOne(officialStampId);

        this.logger.log('BuyOfficialStampsUseCase', 'Check Balance of Wallet');
        this.wallet.validateBalance(registryOffice.wallet, officialStamp.value * quantity);

        this.logger.log('BuyOfficialStampsUseCase', 'Creating tokens');
        await this.contract.buyOfficialStamp(registryOffice.wallet.address, officialStamp, quantity);

        this.logger.log('BuyOfficialStampsUseCase', 'Update wallet balance');
        await this.wallet.withdraw(registryOffice.wallet.id, officialStamp.value * quantity);
    }

    // MAPPERS
    private toModel(entity: RegistryOfficeEntity): RegistryOfficesModel {
        const model: RegistryOfficesModel = new RegistryOfficesModel();

        model.id = entity.id;
        model.name = entity.name;
        model.county = entity.county;
        model.city = entity.city;
        model.region = entity.region;
        model.wallet = entity.wallet;
        model.createdAt = entity.createdAt;
        model.updatedAt = entity.updatedAt;

        return model;
    }

    private toEntity(model: RegistryOfficesModel): RegistryOfficeEntity {
        const entity: RegistryOfficeEntity = new RegistryOfficeEntity();

        entity.id = model.id;
        entity.name = model.name;
        entity.county = model.county;
        entity.region = model.region;
        entity.city = model.city;

        return entity;
    }
}
