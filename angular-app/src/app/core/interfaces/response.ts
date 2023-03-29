export interface Audit {
    createdAt: string;
    updatedAt: string;
}

export interface WalletResponse extends Audit {
    id: number;
    address: string;
    balance: number;
}

export interface RegistryOfficeResponse extends Audit {
    id: number;
    name: string;
    county: string;
    city: string;
    region: string;
    wallet: WalletResponse;
}

export interface OfficialStampResponse extends Audit {
    id: number;
    name: string;
    value: number;
}

export interface IOfficialStampToken {
    id: number;
    name: string;
    price: number;
    owner: string;
}
