/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosInstance, AxiosResponse } from "axios"
import { httpApi } from "src/boot/keycloak"
import { IRegistryOfficeRequest } from "../interfaces/request.interface"
import { IRegistryOfficeResponse } from "../interfaces/response.interface"

class RegistryOfficeService {
    private static instance: RegistryOfficeService
    private http: AxiosInstance

    constructor() {
        this.http = httpApi
    }

    public static getInstance(): RegistryOfficeService {
        if (!RegistryOfficeService.instance) {
            RegistryOfficeService.instance = new RegistryOfficeService()
        }
        return RegistryOfficeService.instance
    }

    get(): Promise<AxiosResponse<IRegistryOfficeResponse[]>> {
        return this.http.get<IRegistryOfficeResponse[]>("registry-offices")
    }

    post(item: IRegistryOfficeRequest): Promise<AxiosResponse<IRegistryOfficeResponse>> {
        return this.http.post<IRegistryOfficeResponse>("registry-offices", item)
    }

    update(
        id: number,
        item: IRegistryOfficeRequest
    ): Promise<AxiosResponse<IRegistryOfficeResponse>> {
        return this.http.put<IRegistryOfficeResponse>(`registry-offices/${id}`, item)
    }

    remove(id: number): Promise<AxiosResponse<IRegistryOfficeResponse>> {
        return this.http.delete<IRegistryOfficeResponse>(`registry-offices/${id}`)
    }
}

export default RegistryOfficeService
