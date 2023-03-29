import { Resource } from './hateoas';
import { OfficialStampResponse, RegistryOfficeResponse } from './response';

export interface OfficialStampResource
    extends OfficialStampResponse,
        Resource {}

export interface OfficialStampResourceList extends Resource {
    _embedded: {
        officialStampResponseList: OfficialStampResponse[];
    };
}

export interface RegistryOfficeResource
    extends RegistryOfficeResponse,
        Resource {}
export interface RegistryOfficeResourceList extends Resource {
    _embedded: {
        registryOfficeResponseList: RegistryOfficeResponse[];
    };
}
