import { RegistryOfficeUsecasesProxyModule } from '@infra/usecases-proxy/registry-offices/registry-offices-usecases-proxy.module';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { Controller } from '@nestjs/common';
import { Body, Delete, Get, HttpCode, Inject, Param, Post, Put } from '@nestjs/common/decorators';
import { ApiBadRequestResponse, ApiExtraModels, ApiNotFoundResponse, ApiOAuth2, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { BuyOfficialStampsUseCase } from '@usecases/registry-offices/buy-official-stamps.usecase';
import { CreateRegistryOfficeUseCase } from '@usecases/registry-offices/create.usecase';
import { DeleteRegistryOfficeUseCase } from '@usecases/registry-offices/delete.usecase';
import { GetOfficialStampsBoughtUseCase } from '@usecases/registry-offices/get-official-stamp-bought.usecase';
import { GetAllRegistryOfficesUseCase } from '@usecases/registry-offices/getAll.usecase';
import { GetOneRegistryOfficeUseCase } from '@usecases/registry-offices/getOne.usecase';
import { UpdateRegistryOfficeUseCase } from '@usecases/registry-offices/update.usecase';
import { Roles } from 'nest-keycloak-connect';
import { RoleMatchingMode } from 'nest-keycloak-connect/constants';
import { RegistryOfficesRequest } from './registry-offices.request';
import { RegistryOfficesResponse } from './registry-offices.response';

@Controller('registry-offices')
@ApiTags('registry-offices')
@ApiExtraModels(RegistryOfficesRequest)
@ApiOAuth2(['registry-offices'])
export class RegistryOfficesController {
    constructor(
        @Inject(RegistryOfficeUsecasesProxyModule.GET_ALL)
        private readonly getAllUC: UseCaseProxy<GetAllRegistryOfficesUseCase>,
        @Inject(RegistryOfficeUsecasesProxyModule.GET_ONE)
        private readonly getOneUC: UseCaseProxy<GetOneRegistryOfficeUseCase>,
        @Inject(RegistryOfficeUsecasesProxyModule.CREATE)
        private readonly createUC: UseCaseProxy<CreateRegistryOfficeUseCase>,
        @Inject(RegistryOfficeUsecasesProxyModule.UPDATE)
        private readonly updateUC: UseCaseProxy<UpdateRegistryOfficeUseCase>,
        @Inject(RegistryOfficeUsecasesProxyModule.DELETE)
        private readonly deleteUC: UseCaseProxy<DeleteRegistryOfficeUseCase>,
        @Inject(RegistryOfficeUsecasesProxyModule.BUY_OFFICIAL_STAMP)
        private readonly buyOfficialStampUC: UseCaseProxy<BuyOfficialStampsUseCase>,
        @Inject(RegistryOfficeUsecasesProxyModule.GET_OFFICIAL_STAMPS_BOUGHT)
        private readonly getOFBought: UseCaseProxy<GetOfficialStampsBoughtUseCase>
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get all Registry Offices' })
    @ApiOkResponse({ description: 'Found Registry Offices' })
    async getAll() {
        return (await this.getAllUC.getInstance().execute()).map((data) => new RegistryOfficesResponse(data));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Registry Office by id' })
    @ApiParam({ name: 'id', description: 'An id of a registry offices', example: 1 })
    @ApiOkResponse({ description: 'Found Registry Offices' })
    @ApiNotFoundResponse({ description: 'Registry Office not found' })
    async getOne(@Param() params) {
        return new RegistryOfficesResponse(await this.getOneUC.getInstance().execute(params.id));
    }

    @Post()
    @HttpCode(201)
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ALL })
    @ApiOperation({ summary: 'Create a Registry Office' })
    @ApiOkResponse({ description: 'Registry Offices created' })
    @ApiBadRequestResponse({ description: 'Something was wrong!' })
    async create(@Body() toCreate: RegistryOfficesRequest) {
        return new RegistryOfficesResponse(await this.createUC.getInstance().execute(toCreate));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a Registry Office' })
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ALL })
    @ApiParam({ name: 'id', description: 'An id of a registry offices', example: 1 })
    @ApiOkResponse({ description: 'Registry Offices updated' })
    @ApiNotFoundResponse({ description: 'Registry Office not found' })
    @ApiBadRequestResponse({ description: 'Something was wrong!' })
    async update(@Param() params, @Body() toCreate: RegistryOfficesRequest) {
        return new RegistryOfficesResponse(await this.updateUC.getInstance().execute(params.id, toCreate));
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Delete a Registry Office' })
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ALL })
    @ApiParam({ name: 'id', description: 'An id of a registry offices', example: 1 })
    @ApiOkResponse({ description: 'Registry Offices deleted' })
    @ApiNotFoundResponse({ description: 'Registry Office not found' })
    async delete(@Param() params) {
        await this.deleteUC.getInstance().execute(params.id);
    }

    @Get(':id/tokens')
    @ApiOperation({ summary: 'Get Official Stamps bought for a Registry Office' })
    @ApiParam({ name: 'id', description: 'An id of a registry offices', example: 1 })
    @ApiNotFoundResponse({ description: 'Registry Office or Official Stamp not found' })
    async getOfficialStampsBought(@Param() params) {
        return await this.getOFBought.getInstance().execute(params.id);
    }

    @Post(':id/official-stamps/:officialStampId')
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ALL })
    @ApiOperation({ summary: 'Buy a Official Stamp for a Registry Office' })
    @ApiParam({ name: 'id', description: 'An id of a registry offices', example: 1 })
    @ApiParam({ name: 'officialStampId', description: 'An id of a Official Stamp', example: 1 })
    @ApiNotFoundResponse({ description: 'Registry Office or Official Stamp not found' })
    async buyOfficialStamp(@Param() params, @Body() request: { quantity: number }) {
        return await this.buyOfficialStampUC.getInstance().execute(params, request.quantity);
    }
}
