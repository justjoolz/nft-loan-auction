export const GET_OFFERS_FOR_ACOUNT = `
import "NonFungibleToken"
import "NFTLoanAuction"

pub fun main(address: Address) : [UInt64] {

    let account = getAccount(address)
    let cap = account.getCapability(NFTLoanAuction.LoanManagerPublicPath)
    let ref = cap.borrow<&NFTLoanAuction.LoanManager>()!
    
    return ref.offers.keys
}

`