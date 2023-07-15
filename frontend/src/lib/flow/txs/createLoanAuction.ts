export const CREATE_LOAN_AUCTION = (contractName: string, importAddress: string, collectionStoragePath: string, collectionPublicPath: string, ftReceiverPublicPath: string) => `
import FungibleToken from 0xFungibleToken
import NonFungibleToken from 0xNonFungibleToken
import ${contractName} from ${importAddress}
import NFTLoanAuction from 0xNFTLoanAuction

transaction( nftID: UInt64, duration: UFix64, yield: UFix64, minimumLoanValueRequested: UFix64, rollingContract: Bool) {
  prepare(signer: AuthAccount) {

    // Demo using Basket
    let collectionStoragePath = ${collectionStoragePath} // Basket.CollectionStoragePath  //
    let collectionPublicPath = ${collectionPublicPath} // Basket.CollectionPublicPath    // 
    let ftReceiverPublicPath = ${ftReceiverPublicPath} // /public/flowTokenReceiver      //

    // Get NFT to use as collateral
    let collectionRef = signer.borrow<&{NonFungibleToken.Provider}>(from: collectionStoragePath)
      ?? panic("Could not borrow a reference to the owner's collection")

    let nft <- collectionRef.withdraw(withdrawID: nftID)

    // get ft and nft capabilities
    let ftReceiverCap = signer.getCapability<&{FungibleToken.Receiver}>(ftReceiverPublicPath)
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