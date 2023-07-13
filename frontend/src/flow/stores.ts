import { writable } from 'svelte/store';
import type { CurrentUser } from '@onflow/fcl/types/current-user';
import type { TokenInfo } from 'flow-native-token-registry';

export const ssr = false;

export const user = writable({} as CurrentUser);
export const usersNFTs = writable({} as NFTCatalogEntries);
export const ftTokens = writable({} as TokenInfo[]);
export const usersFTs = writable({} as { token: string; balance: number }[]);
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
