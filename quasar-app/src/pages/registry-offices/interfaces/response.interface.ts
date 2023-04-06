import { Audit } from "src/core/interfaces/audit.interface"

export interface IWalletResponse extends Audit {
    id: number
    address: string
    balance: number
}

export interface IRegistryOfficeResponse extends Audit {
    id: number
    name: string
    county: string
    city: string
    region: string
    wallet: IWalletResponse
}
