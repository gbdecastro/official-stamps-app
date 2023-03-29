import { OfficialStampsModel } from '@domain/official-stamps/official-stamps.model';
import { OfficialStampEntity } from '@infra/entities/official-stamp.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfficialStampService } from './official-stamp.interface';

@Injectable()
export class OfficialStampServiceImpl implements OfficialStampService {
    constructor(
        @InjectRepository(OfficialStampEntity)
        private readonly repository: Repository<OfficialStampEntity>
    ) {}

    // IMPLEMENTS
    async getAll(): Promise<OfficialStampsModel[]> {
        return (await this.repository.find()).map((item) => this.toModel(item));
    }

    async getOne(id: number): Promise<OfficialStampsModel> {
        return await this.repository.findOneOrFail({
            where: {
                id: id
            }
        });
    }

    async save(model: OfficialStampsModel): Promise<OfficialStampsModel> {
        const entity = this.toEntity(model);
        return this.toModel(await this.repository.save(entity));
    }

    async update(id: number, model: OfficialStampsModel): Promise<OfficialStampsModel> {
        await this.getOne(id);
        await this.repository.update(id, this.toEntity(model));
        return this.toModel(await this.getOne(id));
    }

    async delete(id: number): Promise<void> {
        await this.getOne(id);
        await this.repository.delete({ id: id });
    }

    // MAPPERS
    private toModel(entity: OfficialStampEntity): OfficialStampsModel {
        const model: OfficialStampsModel = new OfficialStampsModel();
        
        model.id = entity.id;
        model.name = entity.name;
        model.value = entity.value;
        model.createdAt = entity.createdAt;
        model.updatedAt = entity.updatedAt;

        return model;
    }

    private toEntity(model: OfficialStampsModel): OfficialStampEntity {
        const entity: OfficialStampEntity = new OfficialStampEntity();

        entity.id = model.id;
        entity.name = model.name;
        entity.value = model.value;

        return entity;
    }
}
