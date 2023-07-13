export const CREATE_LOAN_AUCTION = (contractName: string, importAddress: string) => `import FungibleToken from "../../contracts/lib/FungibleToken.cdc"
import NonFungibleToken from "../../contracts/lib/NonFungibleToken.cdc"
import ${contractName} from ${importAddress} // "../../contracts/Basket.cdc"
import NFTLoanAuction from "../../contracts/NFTLoanAuction.cdc"

//transaction( nftID: UInt64, collectionStoragePath: StoragePath, collectionPublicPath: PublicPath, duration: UFix64, yield: UFix64, minimumLoanValueRequested: UFix64, rollingContract: Bool) {

transaction( nftID: UInt64, duration: UFix64, yield: UFix64, minimumLoanValueRequested: UFix64, rollingContract: Bool) {
  prepare(signer: AuthAccount) {

    // Demo using Basket
    let collectionStoragePath = Basket.CollectionStoragePath
    let collectionPublicPath = Basket.CollectionPublicPath

    // Get NFT to use as collateral
    let collectionRef = signer.borrow<&{NonFungibleToken.Provider}>(from: collectionStoragePath)
      ?? panic("Could not borrow a reference to the owner's collection")

    let nft <- collectionRef.withdraw(withdrawID: nftID)

    // get ft and nft capabilities
    let ftReceiverCap = signer.getCapability<&{FungibleToken.Receiver}>(/public/flowTokenReceiver)
    let nftReceiverCap = signer.getCapability<&{NonFungibleToken.CollectionPublic}>(collectionPublicPath)

    // check if signer has LoanManager resource
    if signer.borrow<&NFTLoanAuction.LoanManager>(from: NFTLoanAuction.LoanManagerStoragePath) == nil {
      signer.save( <- NFTLoanAuction.createLoanManager(), to: NFTLoanAuction.LoanManagerStoragePath )
      signer.link<&NFTLoanAuction.LoanManager>(NFTLoanAuction.LoanManagerPublicPath, target:NFTLoanAuction.LoanManagerStoragePath)
    }
  
    NFTLoanAuction.createLoanAuction( nft: <- nft, 
                                      duration: duration, 
                                      yield: yield, // 10% 
                                      nftReceiverCap: nftReceiverCap,
                                      ftReceiverCap: ftReceiverCap,
                                      minimumLoanValueRequested: minimumLoanValueRequested,
                                      rollingContract: rollingContract) 
  }
}
`