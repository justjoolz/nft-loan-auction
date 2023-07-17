import { writable } from 'svelte/store';
import type { CurrentUser } from '@onflow/fcl/types/current-user';
import type { TokenInfo } from 'flow-native-token-registry';

export const ssr = false;

export const user = writable({} as CurrentUser);
export const usersNFTs = writable({} as NFTCatalogEntry[][]);
export const ftTokens = writable({} as TokenInfo[]);
export const usersFTs = writable({} as { token: string; balance: number }[]);

export const loanAuctions = writable([] as LoanAuction[]);
export const selectedCollateralNFT = writable({} as NFTCatalogEntry);

export const usersBasketIds = writable([] as number[]);
export const selectedBasketMeta = writable({} as BasketNFTMeta);

export const transactionStatus = writable();
export const walletContents = writable();
export const basket = writable();
export const walletNFTWithdrawIds = writable([] as number[]);
export const walletFTWithdrawIds = writable([] as FTCatalogEntry[]);
export const basketNFTWithdrawIds = writable([] as number[]);
export const basketFTWithdrawIds = writable([] as FTCatalogEntry[]);

export function dictionaryToArray(dictionary: any) {
    return Object.keys(dictionary).map((key) => dictionary[key]) as NFTCatalogEntry[][];
}
export function ftDictionaryToArray(dictionary: any) {
    const objectArray = Object.keys(dictionary).map((key) => dictionary[key]) as FTCatalogEntry[];
    console.log('objectArray', objectArray);

    const filteredArray = objectArray.filter((item) => item.balance > 0);
    console.log('fitleredArray', filteredArray);
    return filteredArray;
}



export interface LoanAuction {
    id: string,
    debt: string,
    repaid: string,
    intrestIncurred: string,
    feesIncurred: string,
    nftType: NftType,
    ownersAddress: string,
    nftID: string,
    duration: string,
    yield: string,
    nftReceiverCap: NftReceiverCap,
    ftReceiverCap: FtReceiverCap,
    minimumLoanValueRequested: string,
    offer: null,
    startTime: null,
    rollingContract: boolean,
    ledger: any[],
    totalIntrestSettled: string,
    totalFeesSettled: string,
    settled: boolean
}

export interface FtReceiverCap {
    path: Path,
    address: string,
    borrowType: BorrowType
}

export interface Path {
    value: Value,
    type: string
}

export interface Value {
    domain: string,
    identifier: string
}

export interface BorrowType {
    type: Type2,
    kind: string,
    authorized: boolean
}

export interface Type2 {
    kind: string,
    type: Type3,
    restrictions: Restriction[]
}

export interface Restriction {
    type: string,
    kind: string,
    typeID: string,
    fields: Field[],
    initializers: any[]
}

export interface Field {
    type: Type4,
    id: string
}

export interface Type4 {
    kind: string
}

export interface Type3 {
    kind: string
}

export interface NftReceiverCap {
    path: Path,
    address: string,
    borrowType: BorrowType
}

export interface NftType {
    type: string,
    kind: string,
    typeID: string,
    fields: Field2[],
    initializers: any[]
}

export interface Field2 {
    type: Type5,
    id: string
}

export interface Type5 {
    kind: string,
    key?: Key,
    value?: Value2,
    type?: string,
    typeID?: string,
    fields?: Field3[],
    initializers?: any[],
    authorized?: boolean
}

export interface Field3 {
    type: Type6,
    id: string
}

export interface Type6 {
    kind: string,
    authorized?: boolean
}

export interface Value2 {
    type: string,
    kind: string,
    typeID: string,
    fields: Field4[],
    initializers: any[]
}

export interface Field4 {
    type: Type7,
    id: string
}

export interface Type7 {
    kind: string
}

export interface Key {
    kind: string
}