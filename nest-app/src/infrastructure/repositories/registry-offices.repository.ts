import { RegistryOfficesRepository } from '@domain/registry-offices/registry-offices.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistryOfficeEntity } from './../entities/registry-offices.entity';

@Injectable()
export class RegistryOfficesRepositoryImpl implements RegistryOfficesRepository {
    constructor(
        @InjectRepository(RegistryOfficeEntity)
        private readonly repository: Repository<RegistryOfficeEntity>
    ) {}

    async findAll(): Promise<RegistryOfficeEntity[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<RegistryOfficeEntity> {
        return await this.repository.findOneByOrFail({ id: id });
    }
}
