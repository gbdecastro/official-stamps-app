export interface IWalletRequest {
    amount: number
    address: string
}

export interface IRegistryOfficeRequest {
    name: string
    county: string
    city: string
    region: string
    wallet?: IWalletRequest
}
