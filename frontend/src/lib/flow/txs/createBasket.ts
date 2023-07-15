export const CREATE_BASKET = `
import "NonFungibleToken"
import "Basket"

transaction() {

    prepare(signer: AuthAccount) {

        if signer.borrow<&Basket.Collection>(from: Basket.CollectionStoragePath) == nil {
            // Create a new empty collection
            let collection <- Basket.createEmptyCollection()

            // save it to the account
            signer.save(<-collection, to: Basket.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&{NonFungibleToken.CollectionPublic, Basket.BasketCollectionPublic}>(
                Basket.CollectionPublicPath,
                target: Basket.CollectionStoragePath
            )
        }

        // Borrow the recipient's public NFT collection reference
        let receiver = signer
            .getCapability(Basket.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        let emptyVaultNFT <- Basket.createEmptyBasket()
        
        receiver.deposit(token: <- emptyVaultNFT)
    }
}
`