export interface WalletRequest {
    amount: number;
    address: string;
}

export interface RegistryOfficeRequest {
    name: string;
    county: string;
    city: string;
    region: string;
    wallet?: WalletRequest;
}

export interface OfficialStampRequest {
    name: string;
    value: number;
}
