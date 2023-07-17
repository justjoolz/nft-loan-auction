import * as fcl from "@onflow/fcl";
import "./config";
import { user, transactionStatus, usersNFTs, usersFTs, ftTokens, usersBasketIds, selectedBasketMeta, loanAuctions } from './stores';
import { GET_ALL_NFTS_IN_ACCOUNT_SCRIPT } from "./scripts";
import type { CurrentUser } from "@onflow/fcl/types/current-user";
import { CREATE_BASKET } from "./txs/createBasket";
import { TokenListProvider, type TokenInfo, ENV, Strategy } from "flow-native-token-registry";
import { get } from "svelte/store";
import { GET_ACCOUNT_STORAGE_DETAILS } from "./scripts/get_account_storage_details";
import { GET_BASKETS } from "./scripts/get_baskets";
import { GET_BASKET_METADATA } from "./scripts/get_nft_metadata";
import { PUBLIC_FLOW_NETWORK } from "$env/static/public";
import { setupFCL } from "./config";
import { browser } from "$app/environment";
import { CREATE_LOAN_AUCTION } from "./txs/createLoanAuction";
import { GET_OFFERS_FOR_ACOUNT } from "./scripts/getOffersForAccount";

export const ssr = false;


// Lifecycle FCL Auth functions
export const unauthenticate = () => fcl.unauthenticate()
export const logIn = () => fcl.logIn()
export const signUp = () => fcl.signUp()

export const getUsersNFTs = async (addr: String) => {
    if (!addr) { return }
    transactionStatus.set(`Fetching your NFTs... ${addr}`);

    try {
        const nfts = await fcl.query({
            cadence: GET_ALL_NFTS_IN_ACCOUNT_SCRIPT,
            args: (arg, t) => [arg(addr, t.Address)]
        })

        usersNFTs.set(nfts ?? 'No NFTs found');
        transactionStatus.set('NFTs fetched successfully!')

    } catch (e) {
        transactionStatus.set(e)
        console.log(e);
    }
}

// NFT LOAN AUCTION

export const getAllLoanAuctionMeta = async () => {
    const cadence = `
                import "NFTLoanAuction"
            pub fun main(): {UInt64: NFTLoanAuction.LoanAuctionMeta} {
                return NFTLoanAuction.getAllLoanAuctionsMeta() 
            }
            `

    try {
        let result = await fcl.query({ cadence })
        loanAuctions.set(Object.values(result))
        console.log({ result })
    } catch (e) {
        console.log(e);
    }
}

export const getLoanAuctionMeta = async (nftID: string) => {
    const cadence = `
    import "NFTLoanAuction"
    pub fun main(id: UInt64) : NFTLoanAuction.LoanAuctionMeta {
        return NFTLoanAuction.getLoanAuctionMeta(id: id) 
    }
    `
    try {
        let result = await fcl.query({ cadence, args: (arg, t) => [arg(nftID, t.UInt64)] })
        console.log({ result })
    } catch (e) {
        console.log(e);
    }
}

export const getRemainingUnsettledLoanValue = async (nftID: number) => {
    const cadence = `
    import "NFTLoanAuction"

    pub fun main(auctionID: UInt64): UFix64 {
        return NFTLoanAuction.getRemainingUnsettled(auctionID: auctionID)
    }`
    try {
        let result = await fcl.query({ cadence, args: (arg, t) => [arg(nftID, t.UInt64)] })
        console.log({ result })
    } catch (e) {
        console.log(e);
    }
}

export const getFeesCollected = async () => {
    const cadence = `
    import "NFTLoanAuction"
    
    pub fun main(): AnyStruct {
        return NFTLoanAuction.readFees()
    }
    `
    try {
        let result = await fcl.query({ cadence })
        console.log({ result })
    } catch (e) {
        console.log(e);
    }
}

export const readLedger = async () => {
    const cadence = `
    import "NFTLoanAuction" 
        
    pub fun main(auctionID: UInt64): [NFTLoanAuction.LedgerItem] {
        return NFTLoanAuction.borrowLoanAuction(id: auctionID).readLedger()
    }    
    `
    try {
        let result = await fcl.query({ cadence })
        console.log({ result })
    } catch (e) {
        console.log(e);
    }
}

export const getLoansForAccount = async (addr: String) => {
    if (!addr) { return }
    transactionStatus.set(`Fetching your loans... ${addr}`);
    try {
        let result = await fcl.query({
            cadence: GET_LOANS_FOR_ACOUNT,
            args: (arg, t) => [arg(addr, t.Address)]
        })
        console.log({ result })
    } catch (e) {
        console.log(e);
    }
}

export const getOffersForAccount = async (addr: String) => {
    if (!addr) { return }
    transactionStatus.set(`Fetching your offers... ${addr}`);

    try {
        let result = await fcl.query({
            cadence: GET_OFFERS_FOR_ACOUNT,
            args: (arg, t) => [arg(addr, t.Address)]
        })
        console.log({ result })
    } catch (e) {
        console.log(e);
    }
}

/////// transactions 

export const createLoanAuction = async (nftID: number, duration: number, yield_: number, minimumLoanValueRequested: number, rollingContract: boolean) => {
    const cadence = CREATE_LOAN_AUCTION('Basket', '0xBasket', "Basket.CollectionStoragePath", "Basket.CollectionPublicPath", "/public/flowTokenReceiver") // we can add a nft picker, for now force baskets loaned for flow tokens only
    console.log({ cadence })
    transactionStatus.set(`depositing ${nftID} for ${duration} yeild: ${yield_} minimumLoanValueRequested: ${minimumLoanValueRequested} rollingContract: ${rollingContract}`);


    try {
        const txId = await fcl.mutate({
            cadence: cadence,
            args: (arg, t) => [arg(nftID, t.UInt64), arg(toUFix64(duration), t.UFix64), arg(toUFix64(yield_), t.UFix64), arg(toUFix64(minimumLoanValueRequested), t.UFix64), arg(rollingContract, t.Bool)],
            limit: 9999

        })

        fcl.tx(txId).subscribe(res => {
            transactionStatus.set(res.status)
            console.log({ res })
        })
        transactionStatus.set('auction created succesfully!')

    } catch (e) {
        transactionStatus.set(e)
        console.log(e);
    }
}


export const lendFunds = async (auctionID: number | string, amount: number | string, ftContractName: string, ftContractAddress: string, ftVaultStoragePath: string, collectionPublicPath: string, ftReceiverPublicPath: string) => {
    // const contractName = "FUSD"
    // const storagePath = "/storage/FUSDVault"
    // const collectionPublicPath = "/public/basketCollection"
    // const ftReceiverPublicPath = '/public/FUSDReceiver'

    const cadence = `
    import FungibleToken from 0xFungibleToken
    import NonFungibleToken from 0xNonFungibleToken
    import NFTLoanAuction from 0xNFTLoanAuction
    import ${ftContractName} from ${ftContractAddress}
    
    transaction(auctionID: UInt64, amount: UFix64) {
      prepare(signer: AuthAccount) {
    
        // check if signer has LoanManager resource
        if signer.borrow<&NFTLoanAuction.LoanManager>(from: NFTLoanAuction.LoanManagerStoragePath) == nil {
          signer.save( <- NFTLoanAuction.createLoanManager(), to: NFTLoanAuction.LoanManagerStoragePath )
          signer.link<&NFTLoanAuction.LoanManager>(NFTLoanAuction.LoanManagerPublicPath, target:NFTLoanAuction.LoanManagerStoragePath)
        }
    
        let vaultRef = signer
          .borrow<&${ftContractName}.Vault>(from: ${ftVaultStoragePath})
          ?? panic("Could not borrow reference to the owner's Vault!")

          
          let nftReceiverCap = signer.getCapability<&{NonFungibleToken.CollectionPublic}>(${collectionPublicPath})
        let ftReceiverCap = signer.getCapability<&{FungibleToken.Receiver}>(${ftReceiverPublicPath})

        let auctionRef = NFTLoanAuction.borrowLoanAuction(id: auctionID)
        auctionRef.lendFunds(   funds: <- vaultRef.withdraw(amount: amount), 
                                ftReceiverCap: ftReceiverCap,
                                nftReceiverCap: nftReceiverCap ) 
      }
    }`
    try {
        const tx = await fcl.mutate({ cadence, args: (arg, t) => [arg(auctionID, t.UInt64), arg(toUFix64(amount), t.UFix64)], limit: 9999 })
        fcl.tx(tx).subscribe(res => {
            transactionStatus.set(res.status)
            console.log({ res })
            if (res.status === 4) {
                getAllLoanAuctionMeta()
                getLoanAuctionMeta(auctionID.toString())
            }
        })


    } catch (e) {
        console.log(e);
    }
}

export const reduceOffer = async (offerID: number | string, amount: number | string) => {
    const cadence = `
    import "NFTLoanAuction"

    transaction(offerID: UInt64, amount: UFix64) {
      prepare(signer: AuthAccount) {
        let auctionManager = signer.borrow<&NFTLoanAuction.LoanManager>(from: NFTLoanAuction.LoanManagerStoragePath) ?? panic("can't borrow")
        let auctionRef = auctionManager.borrowOfferProxy(id: offerID) ?? panic("can't borrow")
        auctionRef.withdrawFunds(amount: amount) 
      }
    }`
    try {
        const tx = await fcl.mutate({ cadence, args: (arg, t) => [arg(offerID, t.UInt64), arg(amount, t.UFix64)] })
        console.log(tx)
    } catch (e) {
        console.log(e);
    }
}


export const borrowFunds = async (auctionID: string, amount: string) => {
    const cadence = `
    import "NFTLoanAuction" 
    transaction(auctionID: UInt64, amount: UFix64) {
        prepare(signer: AuthAccount) {
            let auctionManager = signer.borrow<&NFTLoanAuction.LoanManager>(from: NFTLoanAuction.LoanManagerStoragePath) ?? panic("can't borrow")
            let auctionRef = auctionManager.borrowLoanProxy(id: auctionID)!
            auctionRef.borrowFunds( borrowAmount: amount ) 
        }
    }`
    try {
        const tx = await fcl.mutate({ cadence, args: (arg, t) => [arg(auctionID, t.UInt64), arg(amount, t.UFix64)] })
        console.log(tx)
    } catch (e) {
        console.log(e);
    }
}

export const settleAuction = (auctionID: string) => {
    const cadence = `
    import "NFTLoanAuction"
    transaction( auctionID: UInt64 ) {
    prepare(signer: AuthAccount) {
        let auctionRef = NFTLoanAuction.borrowLoanAuction(id: auctionID)
        auctionRef.settleAuction() 
    }
    }`
    try {
        const tx = fcl.mutate({ cadence, args: (arg, t) => [arg(auctionID, t.UInt64)] })
        console.log(tx)
    } catch (e) {
        console.log(e);
    }
}

export const increaseOffer = async (auctionID: string, amount: string, contractName: string, contractAddress: string, storagePath: string) => {
    const cadence = `
    import 0xNFTLoanAuction 
    import ${contractName} from ${contractAddress}
    
    transaction(offerID: UInt64, amount: UFix64) {
      prepare(signer: AuthAccount) {
        let vaultRef = signer
          .borrow<&${contractName}.Vault>(from: ${storagePath})
          ?? panic("Could not borrow reference to the owner's Vault!")
    
    
        let auctionManager = signer.borrow<&NFTLoanAuction.LoanManager>(from: NFTLoanAuction.LoanManagerStoragePath) ?? panic("can't borrow")
        let auctionRef = auctionManager.borrowOfferProxy(id: offerID) ?? panic("can't borrow")
        
        let funds <- vaultRef.withdraw(amount: amount)
        
        auctionRef.depositFunds(funds: <- funds) 
      }
    }`
    try {
        const tx = await fcl.mutate({ cadence, args: (arg, t) => [arg(auctionID, t.UInt64), arg(amount, t.UFix64)] })
        console.log(tx)
    } catch (e) {
        console.log(e);
    }
}

export const repayFunds = async (auctionID: number | string, amount: number | string, ftName: string, ftAddress: string, ftStoragePath: string) => {
    // /storage/FUSDVault
    const cadence = `
        import ${ftName} from ${ftAddress}
        import NFTLoanAuction from 0xNFTLoanAuction

        transaction(auctionID: UInt64, amount: UFix64) {
            prepare(signer: AuthAccount) {

                let auctionManager = signer.borrow<&NFTLoanAuction.LoanManager>(from: NFTLoanAuction.LoanManagerStoragePath) ?? panic("can't borrow")
                let auctionRef = auctionManager.borrowLoanProxy(id: auctionID)!
                
                let vaultRef = signer
                .borrow<&${ftName}.Vault>(from: ${ftStoragePath})
                ?? panic("Could not borrow reference to the owner's Vault!")

                auctionRef.makeRepayment(funds: <- vaultRef.withdraw(amount: amount) ) 
            }
        }`
    try {
        const tx = await fcl.mutate({ cadence, args: (arg, t) => [arg(auctionID, t.UInt64), arg(amount, t.UFix64)] })
        console.log(tx)
    } catch (e) {
        console.log(e);
    }
}

export const repayLoan = async (auctionID: number | string, ftName: string, ftAddress: string, ftStoragePath: string) => {
    const cadence = `
        import ${ftName} from ${ftAddress}
        import NFTLoanAuction from "../../contracts/NFTLoanAuction.cdc"

        transaction(auctionID: UInt64) {
            prepare(signer: AuthAccount) {

                let auctionManager = signer.borrow<&NFTLoanAuction.LoanManager>(from: NFTLoanAuction.LoanManagerStoragePath) ?? panic("can't borrow")
                let auctionRef = auctionManager.borrowLoanProxy(id: auctionID)!
                
                let vaultRef = signer
                .borrow<&${ftName}.Vault>(from: ${ftStoragePath})
                ?? panic("Could not borrow reference to the owner's Vault!")
                
                auctionRef.makeRepayment(funds: <- vaultRef.withdraw(amount: auctionRef.getRemainingUnsettled()))
            }
        }
        `
    try {
        const tx = await fcl.mutate({ cadence, args: (arg, t) => [arg(auctionID, t.UInt64)] })
        console.log(tx)
    } catch (e) {
        console.log(e);
    }
}

// BASKET
export const getAccountStorageDetails = async (addr: String) => {
    if (!addr) { return }
    transactionStatus.set('Reading your account storage...');

    try {
        const storageDetails = await fcl.query({
            cadence: GET_ACCOUNT_STORAGE_DETAILS,
            args: (arg, t) => [arg(addr, t.Address)]
        })

        console.log({ storageDetails })

        // usersNFTs.set(nfts ?? 'No NFTs found');
        transactionStatus.set('Account storage details loaded.')

    } catch (e) {
        transactionStatus.set(e)
        console.log(e);
    }
}

export const getBaskets = async (addr: String) => {
    if (!addr) { return }
    transactionStatus.set('Reading your baskets...');

    try {
        const basketIds = await fcl.query({
            cadence: GET_BASKETS,
            args: (arg, t) => [arg(addr, t.Address)]
        })

        console.log({ basketIds })

        transactionStatus.set('Baskets loaded.')
        usersBasketIds.set(basketIds)

    } catch (e) {
        transactionStatus.set(e)
        console.log(e);
    }
}


export const getBasketMetadata = async (addr: String, nftId: String) => {
    if (!addr) { return }
    transactionStatus.set(`Reading your Basket metadata... ${addr} - ${nftId}`);

    try {
        const basketMeta = await fcl.query({
            cadence: GET_BASKET_METADATA,
            args: (arg, t) => [arg(addr, t.Address), arg(nftId, t.UInt64)]
        })

        basketMeta.id = nftId
        selectedBasketMeta.set(basketMeta)

        // usersNFTs.set(nfts ?? 'No NFTs found');
        transactionStatus.set(`Basket ${nftId} metadata loaded.`)

    } catch (e) {
        transactionStatus.set(e)
        console.log(e);
    }
}


export async function fetchTokenBalances(tokens: TokenInfo[]) {
    if (!tokens.length) return

    const balances: { token: string, balance: number }[] = []
    const _user: CurrentUser = get(user)
    if (!_user) return

    const promises = tokens.map(async element => {
        const balance = await getFTBalance(_user.addr ?? '', element);
        // delay 1s to avoid rate limit
        await new Promise(r => setTimeout(r, 1000));
        if (balance) {
            balances.push({
                token: element.symbol,
                balance
            });
        }
    });

    await Promise.all(promises);

    console.log({ balances })
    return usersFTs.set(balances)
}


export const createEmptyBasket = async () => {
    console.log('createEmptyBasket')
    transactionStatus.set('Creating basket...');

    try {
        const txId = await fcl.mutate({
            cadence: CREATE_BASKET,
        })

        fcl.tx(txId).onceSealed().then(res => {
            transactionStatus.set('Basket created!')
            getBaskets(get(user).addr ?? '')
        })
    } catch (e) {
        transactionStatus.set(e)
        console.log(e);
    }
}

export const getFTBalance = async (addr: String, ft: TokenInfo) => {
    if (!addr) { return }
    transactionStatus.set(`Fetching your FTs... ${ft.name}`);

    const code = `
import FungibleToken from 0xFungibleToken
import ${ft.contractName} from ${ft.address}

pub fun main(address: Address): UFix64? {
    let account = getAccount(address)

    let vaultRef = account.getCapability(${ft.path.balance})
      .borrow<&{FungibleToken.Balance}>()
      // ?? panic("Could not borrow Balance reference to the ${ft.contractName} Vault")

    if vaultRef == nil { return nil }

    return vaultRef?.balance!
  }
`
    try {
        const balance = await fcl.query({
            cadence: code,
            args: (arg, t) => [arg(addr, t.Address)]
        })
        if (!balance) return null
        transactionStatus.set(`FT ${ft.name} balance fetched successfully! ${ft.symbol} ${balance}`)
        return balance
        // usersNFTs.set(nfts ?? 'No NFTs found');
    } catch (e) {
        return null
        transactionStatus.set(e)
        console.log(e);
    }

}

export const basketTxs = {
    depositFT: async (baskedId: string, storagePath: string, amount: string) => {
        const cadence = `
        import "FungibleToken"
        import "Basket"
        
        transaction(basketID: UInt64, storagePath: String, amount: UFix64) {
            
            prepare(acct: AuthAccount) {
                let baskets = acct.borrow<&Basket.Collection>(from: Basket.CollectionStoragePath) ?? panic("Could not borrow a reference to the owner's basket collection")
                let basket = baskets.borrowBasket(id: basketID) ?? panic("Could not borrow a reference to the owner's basket")
                
                let vaultRef = acct.borrow<&FungibleToken.Vault>(from: ${storagePath})
                ?? panic("Could not borrow reference to the owner's Vault @ /storage/".concat(storagePath))
                
                basket.depositFungibleTokens(from: <- vaultRef.withdraw(amount: amount))
            }
        }
        `

        console.log({ cadence })
        transactionStatus.set(`depositing ${amount} of tokens from ${storagePath} to basket #${baskedId}`);

        try {
            const txId = await fcl.mutate({
                cadence: cadence,
                args: (arg, t) => [arg(baskedId, t.UInt64), arg(storagePath, t.String), arg(amount, t.UFix64)]
            })

            fcl.tx(txId).subscribe(res => {
                transactionStatus.set(res.status)
                console.log({ res })
            })
            transactionStatus.set('deposit succesful!')

        } catch (e) {
            transactionStatus.set(e)
            console.log(e);
        }
    },

    depositFTs: async (baskedId: string, storagePaths: string[], amounts: string[]) => {
        let cadence = `
        import "FungibleToken"
        import "Basket"
        
        transaction(basketID: UInt64) {
            
            prepare(acct: AuthAccount) {
                let baskets = acct.borrow<&Basket.Collection>(from: Basket.CollectionStoragePath) ?? panic("Could not borrow a reference to the owner's basket collection")
                let basket = baskets.borrowBasket(id: basketID) ?? panic("Could not borrow a reference to the owner's basket")
        `

        for (let i = 0; i < storagePaths.length; i++) {
            const storagePath = storagePaths[i];
            const amount = amounts[i];

            cadence += `
                let vaultRef = acct.borrow<&FungibleToken.Vault>(from: ${storagePath})
                ?? panic("Could not borrow reference to the owner's Vault @ /storage/".concat(storagePath))

                basket.depositFungibleTokens(from: <- vaultRef.withdraw(amount: ${amount}))
                `
        }

        cadence += `
            }
        }
        `

        console.log({ cadence })
        transactionStatus.set(`depositing ${JSON.stringify(amounts)} of tokens from ${JSON.stringify(storagePaths)} to basket #${baskedId}`);

        try {
            const txId = await fcl.mutate({
                cadence: cadence,
                args: (arg, t) => [arg(baskedId, t.UInt64)]
            })

            fcl.tx(txId).subscribe(res => {
                transactionStatus.set(res.status)
                console.log({ res })
            })
            transactionStatus.set('deposit succesful!')

        } catch (e) {
            transactionStatus.set(e)
            console.log(e);
        }
    },

    // deposit multiple nfts from a single collection
    depositNFTs: async (baskedId: string, storagePath: string, ids: string[], collectionName: string, address: string) => {
        const cadence = `
        import NonFungibleToken from 0xNonFungibleToken
        import Basket from 0xBasket
        import ${collectionName} from ${address}
        
        transaction(basketID: UInt64, storagePath: String, ids: [UInt64], address: Address) {
            
            prepare(acct: AuthAccount) {
                let baskets = acct.borrow<&Basket.Collection>(from: Basket.CollectionStoragePath) ?? panic("Could not borrow a reference to the owner's basket collection")
                let basket = baskets.borrowBasket(id: basketID) ?? panic("Could not borrow a reference to the owner's basket")
                
                let collectionRef = acct.borrow<&NonFungibleToken.Collection>(from: StoragePath(identifier: storagePath)!)
                ?? panic("Could not borrow reference to the owner's collection @ /storage/".concat(storagePath))
                
                // let contract = getAccount(address).contracts.borrow<&${collectionName}.Collection>(name: "${collectionName}")

                let emptyCollection <- ${collectionName}.createEmptyCollection()

                for id in ids {
                    let nft <- collectionRef.withdraw(withdrawID: id)
                    emptyCollection.deposit(token: <- nft)
                }
                basket.depositNonFungibleTokens(from: <- emptyCollection)
            }
        }
        `
        console.log({ cadence })
        transactionStatus.set(`depositing ${JSON.stringify(ids)} tokens from ${storagePath} to basket #${baskedId}`);

        try {
            const txId = await fcl.mutate({
                cadence: cadence,
                args: (arg, t) => [arg(baskedId, t.UInt64), arg(storagePath, t.String), arg(ids, t.Array(t.UInt64)), arg(address, t.Address)]
            })

            fcl.tx(txId).subscribe(res => {
                transactionStatus.set(res.status)
                console.log({ res })
            })
            transactionStatus.set('deposit succesful!')

        } catch (e) {
            transactionStatus.set(e)
            console.log(e);
        }
    },

    // deposit multiple nfts from multiple collections
    // todo: add support for multiple collections
    bulkDepositNFTs: async (baskedId: number, collectionNames: string[], importAddresses: string[], storagePaths: string, ids: string[][]) => {

        let cadence = `
        import NonFungibleToken from 0xNonFungibleToken
        import Basket from 0xBasket
        `

        // add collection imports
        for (let i = 0; i < collectionNames.length; i++) {
            cadence += `
            import ${collectionNames[0]} from ${importAddresses[0]}
            `
        }

        cadence += `
        transaction(basketID: UInt64, storagePath: String, ids: [UInt64], address: Address) {
            
            prepare(acct: AuthAccount) {
                let baskets = acct.borrow<&Basket.Collection>(from: Basket.CollectionStoragePath) ?? panic("Could not borrow a reference to the owner's basket collection")
                let basket = baskets.borrowBasket(id: basketID) ?? panic("Could not borrow a reference to the owner's basket")
                
                `

        // for each collection
        for (let i = 0; i < collectionNames.length; i++) {
            cadence += `
                let collectionRef = acct.borrow<&NonFungibleToken.Collection>(from: StoragePath(identifier: ${storagePaths[i]})!)
                ?? panic("Could not borrow reference to the owner's collection @ /storage/".concat(${storagePaths[i]}))

                // let contract = getAccount(address).contracts.borrow<&${collectionNames[i]}.Collection>(name: "${collectionNames[i]}")
                
                let emptyCollection <- ${collectionNames[i]}.createEmptyCollection()
            `

            for (let j = 0; j < ids[i].length; j++) {
                cadence += `
                for id in ids {
                    let nft <- collectionRef.withdraw(withdrawID: id)
                    emptyCollection.deposit(token: <- nft)
                }
                basket.depositNonFungibleTokens(from: <- emptyCollection)
                `
            }
        }

        cadence += `
            }
        }
        `

        console.log({ cadence })

        transactionStatus.set(`depositing ${JSON.stringify(ids)} tokens from ${JSON.stringify(storagePaths)} to basket #${baskedId}`);

        try {
            const txId = await fcl.mutate({
                cadence: cadence,
            })

            fcl.tx(txId).subscribe(res => {
                transactionStatus.set(res.status)
                console.log({ res })
            })
            transactionStatus.set('deposit succesful!')

        } catch (e) {
            transactionStatus.set(e)
            console.log(e);
        }
    }
}


export const sendTokens = async (recipient: string, amount: string) => {
    const cadence = `
    import FungibleToken from 0xFungibleToken
    import FlowToken from 0xFLOW

    transaction(recepient: Address, amount: UFix64){
      prepare(signer: AuthAccount){
        let sender = signer.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
          ?? panic("Could not borrow Provider reference to the Vault")

        let receiverAccount = getAccount(recepient)

        let receiver = receiverAccount.getCapability(/public/flowTokenReceiver)
          .borrow<&FlowToken.Vault{FungibleToken.Receiver}>()
          ?? panic("Could not borrow Receiver reference to the Vault")

                let tempVault <- sender.withdraw(amount: amount)
        receiver.deposit(from: <- tempVault)
      }
    }
  `;
    const args = (arg: (arg0: string, arg1: string) => any, t: { Address: any; UFix64: any; }) => [arg(recipient, t.Address), arg(amount, t.UFix64)];
    const limit = 500;

    const txId = await fcl.mutate({ cadence, args, limit });

    console.log("Waiting for transaction to be sealed...");

    const txDetails = await fcl.tx(txId).onceSealed();
    console.log({ txDetails });
};


const getFTs = async () => {
    console.log("getting token list")
    let env = PUBLIC_FLOW_NETWORK === 'mainnet' ? ENV.Mainnet : ENV.Testnet;
    console.log(PUBLIC_FLOW_NETWORK, env)
    return new TokenListProvider().resolve("CDN" as Strategy, env).then((tokens) => {
        const tokenList = tokens.getList();
        ftTokens.set(tokenList);
        console.log("set token list")
        return tokenList
    });
}

async function fetchUsersData() {
    await getUsersNFTs(get(user).addr ?? '');

    await getFTs().then(async (ftTokens) => {
        console.log('fetching token balances....')
        await fetchTokenBalances(ftTokens)
    });

    await getBaskets(get(user).addr ?? '');
}

export async function handleUserChange(user: CurrentUser) {
    console.log('currentUser changed', { user }, '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    await setupFCL()
    getAllLoanAuctionMeta()
    if (user?.loggedIn) {
        transactionStatus.set('logged in fetching users data ');
        fetchUsersData();
    } else {
        usersNFTs.set({});
        usersFTs.set([]);
        usersBasketIds.set([]);
        selectedBasketMeta.set({
            name: "",
            description: "",
            thumbnail: "",
            owner: "",
            type: "",
            royalties: [],
            externalURL: "",
            serialNumber: "",
            collectionPublicPath: {
                domain: "",
                identifier: ""
            },
            collectionStoragePath: {
                domain: "",
                identifier: ""
            },
            collectionProviderPath: {
                domain: "",
                identifier: ""
            },
            collectionPublic: "",
            collectionPublicLinkedType: "",
            collectionProviderLinkedType: "",
            collectionName: "",
            collectionDescription: "",
            collectionExternalURL: "",
            collectionSquareImage: "",
            collectionBannerImage: "",
            collectionSocials: {
                twitter: ""
            },
            edition: {
                name: "",
                number: "",
                max: null
            },
            traits: {
                traits: [
                    {
                        name: "",
                        value: "",
                        displayType: "",
                        rarity: null
                    }
                ]
            },
            medias: undefined,
            license: null,
            id: ""
        });
        transactionStatus.set('logged out')
    }
}

// helper
function toUFix64(num: string | number): string {
    const parsedNum = typeof num === "string" ? parseFloat(num) : num;
    if (isNaN(parsedNum)) {
        throw new Error(`Invalid input: ${num}`);
    }
    return parsedNum.toFixed(8);
}
