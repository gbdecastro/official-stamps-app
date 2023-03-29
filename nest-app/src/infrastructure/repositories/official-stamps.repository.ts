import { OfficialStampsModel } from '@domain/official-stamps/official-stamps.model';
import { OfficialStampsRepository } from '@domain/official-stamps/official-stamps.repository';
import { OfficialStampEntity } from '@infra/entities/official-stamp.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OfficialStampRepositoryImpl implements OfficialStampsRepository {
    constructor(
        @InjectRepository(OfficialStampEntity)
        private readonly repository: Repository<OfficialStampEntity>
    ) {}

    async findAll(): Promise<OfficialStampsModel[]> {
        const entityList = await this.repository.find();
        return entityList.map((entity) => this.toModel(entity));
    }

    async findById(id: number): Promise<OfficialStampsModel> {
        const entity = await this.repository.findOneByOrFail({ id: id });
        return this.toModel(entity);
    }

    async insert(officialStamp: OfficialStampsModel): Promise<OfficialStampsModel> {
        const entity = this.toEntity(officialStamp);
        const result = await this.repository.insert(entity);
        return this.toModel(result.generatedMaps[0] as OfficialStampEntity);
    }

    async update(id: number, officalStamp: OfficialStampsModel): Promise<OfficialStampsModel> {
        const entity = await this.repository.update(
            {
                id: id
            },
            officalStamp
        );
        return this.toModel(entity.generatedMaps[0] as OfficialStampEntity);
    }

    async deleteById(id: number): Promise<void> {
        await this.repository.delete({ id: id });
    }

    private toModel(entity: OfficialStampEntity): OfficialStampsModel {
        const officialStamp: OfficialStampsModel = new OfficialStampsModel();

        officialStamp.id = entity.id;
        officialStamp.name = entity.name;
        officialStamp.value = entity.value;
        officialStamp.createdAt = entity.createdAt;
        officialStamp.updatedAt = entity.updatedAt;

        return officialStamp;
    }

    private toEntity(officialStamp: OfficialStampsModel): OfficialStampEntity {
        const entity: OfficialStampEntity = new OfficialStampEntity();

        entity.id = officialStamp.id;
        entity.name = officialStamp.name;
        entity.value = officialStamp.value;

        return entity;
    }
}
