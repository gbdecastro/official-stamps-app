import { OfficialStampsUsecasesProxyModule } from '@infra/usecases-proxy/official-stamps/official-stamps-usecases-proxy.module';
import { UseCaseProxy } from '@infra/usecases-proxy/usecases-proxy';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Body, Delete, HttpCode, Post, Put } from '@nestjs/common/decorators';
import { ApiBadRequestResponse, ApiExtraModels, ApiNotFoundResponse, ApiOAuth2, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOfficialStampUseCase } from '@usecases/official-stamps/create.usecase';
import { DeleteOfficialStampUseCase } from '@usecases/official-stamps/delete.usecase';
import { GetAllOfficialStampUseCase } from '@usecases/official-stamps/getAll.usecase';
import { GetOneOfficialStampUseCase } from '@usecases/official-stamps/getOne.usecase';
import { UpdateOfficialStampUseCase } from '@usecases/official-stamps/update.usecase';
import { RoleMatchingMode, Roles } from 'nest-keycloak-connect';
import { OfficialStampsRequest } from './official-stamps.request';
import { OfficialStampsResponse } from './official-stamps.response';

@Controller('official-stamps')
@ApiTags('official-stamps')
@ApiResponse({ status: 500, description: 'Internal Error' })
@ApiExtraModels(OfficialStampsRequest)
@ApiOAuth2(['official-stamps'])
export class OfficialStampsController {
    constructor(
        @Inject(OfficialStampsUsecasesProxyModule.GET_ALL)
        private readonly getAllUC: UseCaseProxy<GetAllOfficialStampUseCase>,
        @Inject(OfficialStampsUsecasesProxyModule.GET_ONE)
        private readonly getOneUC: UseCaseProxy<GetOneOfficialStampUseCase>,
        @Inject(OfficialStampsUsecasesProxyModule.CREATE)
        private readonly createUC: UseCaseProxy<CreateOfficialStampUseCase>,
        @Inject(OfficialStampsUsecasesProxyModule.UPDATE)
        private readonly updateUC: UseCaseProxy<UpdateOfficialStampUseCase>,
        @Inject(OfficialStampsUsecasesProxyModule.DELETE)
        private readonly deleteUC: UseCaseProxy<DeleteOfficialStampUseCase>
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get all Official Stamps' })
    @ApiOkResponse({ description: 'Found Official Stamps' })
    async getAll() {
        return (await this.getAllUC.getInstance().execute()).map((data) => new OfficialStampsResponse(data));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Official Stamp by id' })
    @ApiParam({ name: 'id', description: 'An id of a Official Stamps', example: 1 })
    @ApiOkResponse({ description: 'Found Official Stamps' })
    @ApiNotFoundResponse({ description: 'Official Stamp not found' })
    async getOne(@Param() params) {
        return new OfficialStampsResponse(await this.getOneUC.getInstance().execute(params.id));
    }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a Official Stamp' })
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ALL })
    @ApiOkResponse({ description: 'Official Stamps created' })
    @ApiBadRequestResponse({ description: 'Something was wrong!' })
    async create(@Body() toCreate: OfficialStampsRequest) {
        return new OfficialStampsResponse(await this.createUC.getInstance().execute(toCreate));
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a Official Stamp' })
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ALL })
    @ApiParam({ name: 'id', description: 'An id of a Official Stamps', example: 1 })
    @ApiOkResponse({ description: 'Official Stamps updated' })
    @ApiNotFoundResponse({ description: 'Official Stamp not found' })
    @ApiBadRequestResponse({ description: 'Something was wrong!' })
    async update(@Param() params, @Body() toCreate: OfficialStampsRequest) {
        return new OfficialStampsResponse(await this.updateUC.getInstance().execute(params.id, toCreate));
    }

    @Delete(':id')
    @HttpCode(204)
    @Roles({ roles: ['realm:admin'], mode: RoleMatchingMode.ALL })
    @ApiOperation({ summary: 'Delete a Official Stamp' })
    @ApiParam({ name: 'id', description: 'An id of a Official Stamps', example: 1 })
    @ApiOkResponse({ description: 'Official Stamps deleted' })
    @ApiNotFoundResponse({ description: 'Official Stamp not found' })
    async delete(@Param() params) {
        await this.deleteUC.getInstance().execute(params.id);
    }
}
